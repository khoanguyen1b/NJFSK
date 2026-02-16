"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { customerService } from "@/services/api";
import { Customer } from "@/types/api";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await customerService.list();
        setCustomers(res.data);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Không tải được danh sách khách hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Customers List</h2>
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
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Phone</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((c) => (
                    <tr key={c.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="p-4 align-middle font-medium">{c.name}</td>
                      <td className="p-4 align-middle text-gray-600">{c.email}</td>
                      <td className="p-4 align-middle">{c.phone}</td>
                      <td className="p-4 align-middle font-semibold text-gray-900">{c.address}</td>
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
