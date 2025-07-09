// src/lib/api/users.ts
export async function fetchUsers(query = '') {
    const res = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  }
  