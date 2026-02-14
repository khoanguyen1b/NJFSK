"use client";

import { Card, CardContent } from "@/components/ui/card";

const customers = [
  { id: 1, company: "Tech Corp", contact: "John Doe", type: "Enterprise", spend: "$12,000" },
  { id: 2, company: "Startup Inc", contact: "Jane Smith", type: "Pro", spend: "$2,400" },
  { id: 3, company: "Global Solutions", contact: "Bob Johnson", type: "Enterprise", spend: "$45,000" },
  { id: 4, company: "Design Studio", contact: "Alice Brown", type: "Free", spend: "$0" },
  { id: 5, company: "Marketing Pro", contact: "Charlie Davis", type: "Pro", spend: "$1,200" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Customers List</h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-gray-50/50">
                <tr className="transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Company</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Primary Contact</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Plan Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Total Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="transition-colors hover:bg-gray-50/50">
                    <td className="p-4 align-middle font-medium">{customer.company}</td>
                    <td className="p-4 align-middle text-gray-600">{customer.contact}</td>
                    <td className="p-4 align-middle">
                       <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        customer.type === 'Enterprise' ? 'bg-purple-100 text-purple-800' : 
                        customer.type === 'Pro' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.type}
                      </span>
                    </td>
                    <td className="p-4 align-middle font-semibold text-gray-900">{customer.spend}</td>
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
