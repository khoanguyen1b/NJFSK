"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { customerService } from "@/services/api";
import { Customer } from "@/types/api";
import { FileDown, FileSpreadsheet, Loader2, Mail } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);

  // Email state
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

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

  const handleExportPdf = async () => {
    setExportingPdf(true);
    try {
      const data = await customerService.exportPdf();
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'customers.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e: any) {
      alert("Lỗi khi xuất PDF");
    } finally {
      setExportingPdf(false);
    }
  };

  const handleExportExcel = async () => {
    setExportingExcel(true);
    try {
      const data = await customerService.exportExcel();
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'customers.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e: any) {
      alert("Lỗi khi xuất Excel");
    } finally {
      setExportingExcel(false);
    }
  };

  const handleSendEmail = async (customerId: string) => {
    setSendingEmailId(customerId);
    try {
      await customerService.handleSendEmail(customerId);
      alert("Đã gửi email thành công!");
    } catch (e: any) {
      alert(e?.response?.data?.message || "Lỗi khi gửi email");
    } finally {
      setSendingEmailId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Customers List</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportPdf} 
            disabled={exportingPdf}
            className="disabled:opacity-100"
          >
            {exportingPdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
            Export PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportExcel} 
            disabled={exportingExcel}
            className="disabled:opacity-100"
          >
            {exportingExcel ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSpreadsheet className="mr-2 h-4 w-4" />}
            Export Excel
          </Button>
        </div>
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
                    <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((c) => (
                    <tr key={c.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="p-4 align-middle font-medium">{c.name}</td>
                      <td className="p-4 align-middle text-gray-600">{c.email}</td>
                      <td className="p-4 align-middle">{c.phone}</td>
                      <td className="p-4 align-middle font-semibold text-gray-900">{c.address}</td>
                      <td className="p-4 align-middle text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSendEmail(c.id)}
                          disabled={sendingEmailId === c.id}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-100"
                        >
                          {sendingEmailId === c.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Mail className="mr-2 h-4 w-4" />
                          )}
                          Send Email
                        </Button>
                      </td>
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
