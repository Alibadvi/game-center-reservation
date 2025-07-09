"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Plus, Minus, RefreshCcw, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authStore";

interface User {
  id: string;
  name: string;
  phone: string;
  balance: number;
  role: "CUSTOMER" | "ADMIN";
}

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function AccountsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // 🚫 Prevent access for non-admins
  useEffect(() => {
    if (!user) return; // wait until user is loaded
    if (user.role !== "ADMIN") router.push("/");
  }, [user]);

  // Block rendering if not admin
  if (!user || user.role !== "ADMIN") return null;

  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [manualAmount, setManualAmount] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");

  const [modals, setModals] = useState({
    addProduct: false,
    editProduct: false,
    addDebt: false,
    subtractDebt: false,
    resetBalance: false,
  });

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => fetchUsers(search), 300);
    return () => clearTimeout(delay);
  }, [search]);

  async function fetchUsers(q = "") {
    setLoadingUsers(true);
    try {
      const { data } = await axios.get<User[]>(
        `/api/users?q=${encodeURIComponent(q)}`
      );
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
    setLoadingUsers(false);
  }

  async function fetchProducts() {
    setLoadingProducts(true);
    try {
      const { data } = await axios.get<Product[]>("/api/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
    setLoadingProducts(false);
  }

  async function createProduct() {
    if (!newProductName.trim() || isNaN(+newProductPrice)) return;
    const { data } = await axios.post<Product>("/api/products", {
      name: newProductName,
      price: +newProductPrice,
    });
    setProducts((p) => [data, ...p]);
    closeAllModals();
  }

  async function updateProduct() {
    if (!editProduct) return;
    const { data } = await axios.patch<Product>(
      `/api/products/${editProduct.id}`,
      {
        name: newProductName,
        price: +newProductPrice,
      }
    );
    setProducts((p) => p.map((i) => (i.id === data.id ? data : i)));
    closeAllModals();
  }

  async function deleteProduct(id: string) {
    await axios.delete(`/api/products/${id}`);
    setProducts((p) => p.filter((i) => i.id !== id));
  }

  async function addTransaction(amount: number, reason: string) {
    if (!selectedUser) return;
    await axios.post("/api/transactions", {
      userId: selectedUser.id,
      amount,
      reason,
    });
    await fetchUsers(search);
    closeAllModals();
  }

  async function resetBalance() {
    if (!selectedUser) return;
    await axios.delete(`/api/transactions/${selectedUser.id}`);
    await fetchUsers(search);
    closeAllModals();
  }

  const closeAllModals = () => {
    setSelectedUser(null);
    setEditProduct(null);
    setNewProductName("");
    setNewProductPrice("");
    setManualAmount("");
    setSelectedProductId("");
    setModals({
      addProduct: false,
      editProduct: false,
      addDebt: false,
      subtractDebt: false,
      resetBalance: false,
    });
  };

  const selProd = products.find((p) => p.id === selectedProductId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10 font-vazir rtl text-right">
      <h1 className="text-4xl font-extrabold text-neon-blue">💳 حساب کاربران</h1>

      <div className="flex justify-between items-center">
        <Button onClick={() => setModals((m) => ({ ...m, addProduct: true }))}>
          اضافه کردن محصول
        </Button>
        <Input
          placeholder="جستجو نام یا شماره..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {loadingProducts ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 bg-[#1B263B] p-6 rounded-xl border border-gray-700">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center bg-[#23344D] p-4 rounded-md"
            >
              <div>
                <span className="font-bold text-white">{p.name}</span>
                <span className="text-neon-pink ml-4">
                  {p.price.toLocaleString()} تومان
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditProduct(p);
                    setNewProductName(p.name);
                    setNewProductPrice(p.price.toString());
                    setModals((m) => ({ ...m, editProduct: true }));
                  }}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-400"
                  onClick={() => deleteProduct(p.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="overflow-x-auto border border-gray-700 rounded-lg shadow">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-[#1B263B]">
            <tr>
              <th className="px-4 py-2">نام</th>
              <th className="px-4 py-2">شماره</th>
              <th className="px-4 py-2">موجودی</th>
              <th className="px-4 py-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loadingUsers
              ? [...Array(4)].map((_, i) => (
                  <tr key={i} className="bg-[#1B263B] border-b border-gray-700">
                    {[...Array(4)].map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <Skeleton className="h-6 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : users
                  .filter((u) => u.role === "CUSTOMER")
                  .map((u) => (
                    <tr key={u.id} className="hover:bg-[#23344D]">
                      <td className="px-4 py-3">{u.name}</td>
                      <td className="px-4 py-3">{u.phone}</td>
                      <td className="px-4 py-3">
                        {u.balance.toLocaleString()} تومان
                      </td>
                      <td className="px-4 py-3 flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-400 flex items-center gap-1"
                          onClick={() => {
                            setSelectedUser(u);
                            setManualAmount("");
                            setSelectedProductId("");
                            setModals((m) => ({ ...m, addDebt: true }));
                          }}
                        >
                          <Plus size={16} /> افزودن بدهی
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-400 flex items-center gap-1"
                          onClick={() => {
                            setSelectedUser(u);
                            setManualAmount("");
                            setModals((m) => ({ ...m, subtractDebt: true }));
                          }}
                        >
                          <Minus size={16} /> کاهش بدهی
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-yellow-400 flex items-center gap-1"
                          onClick={() => {
                            setSelectedUser(u);
                            setModals((m) => ({ ...m, resetBalance: true }));
                          }}
                        >
                          <RefreshCcw size={16} /> تسویه حساب
                        </Button>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
      {/* ===== Modals ===== */}
      <Modal
        open={modals.addProduct}
        onClose={closeAllModals}
        title="افزودن محصول"
        description="نام و قیمت را وارد کنید"
        onConfirm={createProduct}
      >
        <Input
          placeholder="نام محصول"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <Input
          placeholder="قیمت (تومان)"
          type="number"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
      </Modal>

      <Modal
        open={modals.editProduct}
        onClose={closeAllModals}
        title="ویرایش محصول"
        description="نام و قیمت جدید را وارد کنید"
        onConfirm={updateProduct}
      >
        <Input
          placeholder="نام محصول"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <Input
          placeholder="قیمت جدید (تومان)"
          type="number"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
      </Modal>

      <Modal
        open={modals.addDebt}
        onClose={closeAllModals}
        title="افزودن بدهی"
        description="یک محصول انتخاب یا مبلغ دستی وارد نمایید"
        onConfirm={() =>
          addTransaction(-(selProd?.price ?? +manualAmount), "افزودن بدهی")
        }
      >
        {products.length > 0 && (
          <select
            className="w-full p-2 bg-[#1B263B] text-white border border-gray-600 rounded"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="">-- انتخاب محصول --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.price.toLocaleString()} تومان
              </option>
            ))}
          </select>
        )}
        <Input
          placeholder="مبلغ (تومان)"
          type="number"
          value={manualAmount}
          onChange={(e) => setManualAmount(e.target.value)}
        />
      </Modal>

      <Modal
        open={modals.subtractDebt}
        onClose={closeAllModals}
        title="کاهش بدهی"
        description="مبلغی که از بدهی کم شود را وارد کنید"
        onConfirm={() => addTransaction(+manualAmount, "کاهش بدهی")}
      >
        <Input
          placeholder="مبلغ (تومان)"
          type="number"
          value={manualAmount}
          onChange={(e) => setManualAmount(e.target.value)}
        />
      </Modal>

      <Modal
        open={modals.resetBalance}
        onClose={closeAllModals}
        title="تسویه حساب"
        description="آیا می‌خواهید موجودی صفر و تاریخچه حذف شود؟"
        onConfirm={resetBalance}
      />
    </div>
  );
}
