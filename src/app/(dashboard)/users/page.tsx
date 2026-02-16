"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { userService } from "@/services/api";
import { User } from "@/types/api";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await userService.list();
        setUsers(res.data);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Không tải được danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Users List</h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            {loading ? (
              <div className="p-4">Đang tải...</div>
            ) : error ? (
              <div className="p-4 text-red-600">{error}</div>
            ) : (
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b bg-gray-50/50">
                  <tr className="transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Full name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="p-4 align-middle font-medium">{user.full_name}</td>
                      <td className="p-4 align-middle text-gray-600">{user.email}</td>
                      <td className="p-4 align-middle">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
