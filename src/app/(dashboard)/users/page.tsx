"use client";

import { Card, CardContent } from "@/components/ui/card";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Editor", status: "Pending" },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Users List</h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-gray-50/50">
                <tr className="transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Role</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-gray-50/50">
                    <td className="p-4 align-middle font-medium">{user.name}</td>
                    <td className="p-4 align-middle text-gray-600">{user.email}</td>
                    <td className="p-4 align-middle">{user.role}</td>
                    <td className="p-4 align-middle">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
