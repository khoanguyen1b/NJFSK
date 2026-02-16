"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { noteService, customerService } from "@/services/api";
import { Note, Customer } from "@/types/api";
import { Trash2, Plus, Loader2, Search } from "lucide-react";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [customers, setCustomers] = useState<Record<string, Customer>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [content, setContent] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [notesRes, customersRes] = await Promise.all([
        noteService.list(),
        customerService.list(),
      ]);
      console.log("Notes Response:", notesRes);
      console.log("Customers Response:", customersRes);
      
      const notesData = Array.isArray(notesRes.data) ? notesRes.data : [];
      setNotes(notesData);
      
      const customersData = Array.isArray(customersRes.data) ? customersRes.data : [];
      const customerMap = customersData.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {} as Record<string, Customer>);
      setCustomers(customerMap);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !customerId) return;

    setIsSubmitting(true);
    try {
      const res = await noteService.create({ content, customer_id: customerId });
      setNotes([res.data, ...notes]);
      setContent("");
      setCustomerId("");
    } catch (e: any) {
      alert(e?.response?.data?.message || "Không thể tạo note");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa note này?")) return;

    try {
      await noteService.delete(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (e: any) {
      alert(e?.response?.data?.message || "Không thể xóa note");
    }
  };

  const filteredNotes = notes.filter((note) => {
    const customerName = customers[note.customer_id]?.name || "";
    return (
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Notes Management</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Create Note Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Create New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer</label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                >
                  <option value="">Select a customer</option>
                  {Object.values(customers).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter note content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Note
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notes List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Notes List</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search notes or customers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : error ? (
              <div className="p-4 text-red-600">{error}</div>
            ) : filteredNotes.length === 0 ? (
              <div className="py-10 text-center text-gray-500">No notes found.</div>
            ) : (
              <div className="space-y-4">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-start justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                          {customers[note.customer_id]?.name || "Unknown Customer"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {note.created_at ? new Date(note.created_at).toLocaleString() : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-600"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
