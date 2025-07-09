// src/lib/api/products.ts

export async function fetchProducts() {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  }
  
  export async function createProduct(data: { name: string; price: number }) {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  }
  
  export async function updateProduct(id: string, data: { name: string; price: number }) {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PATCH', // ✅ fix here
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  }
  
  
  export async function deleteProduct(id: string) {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');
  }
  