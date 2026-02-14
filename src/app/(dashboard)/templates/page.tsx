"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UITemplatesPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">UI Templates</h2>
        <p className="text-gray-500 text-sm mt-1">Showcase of reusable components for your application.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buttons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </CardContent>
        </Card>

        {/* Inputs Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Text Input</label>
              <Input placeholder="Type something..." />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Email Input</label>
              <Input type="email" placeholder="email@example.com" />
            </div>
          </CardContent>
        </Card>

        {/* Selection Components */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dropdown & Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Dropdown (Native)</label>
              <select className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Multiple Select (Native)</label>
              <select multiple className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Selection A</option>
                <option>Selection B</option>
                <option>Selection C</option>
                <option>Selection D</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Date & Time Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Date Picker</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Time Picker</label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Datatables Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Datatables (Basic)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Component</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 text-gray-900 font-medium">#101</td>
                  <td className="px-4 py-3 text-gray-600">Button</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Ready</span></td>
                  <td className="px-4 py-3 text-gray-500 italic">High</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-900 font-medium">#102</td>
                  <td className="px-4 py-3 text-gray-600">Input</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Ready</span></td>
                  <td className="px-4 py-3 text-gray-500 italic">High</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-900 font-medium">#103</td>
                  <td className="px-4 py-3 text-gray-600">Calendar</td>
                  <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Work-In-Progress</span></td>
                  <td className="px-4 py-3 text-gray-500 italic">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
