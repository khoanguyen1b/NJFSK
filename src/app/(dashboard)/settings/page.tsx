"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { settingService } from "@/services/api";
import { Loader2 } from "lucide-react";

const GPT_API_KEY_SETTING = "gpt_api_key";

const extractErrorMessage = (error: unknown, fallback: string): string => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    (error as { response?: { data?: { error?: { message?: string }; message?: string } } }).response
      ?.data
  ) {
    const payload = (error as { response?: { data?: { error?: { message?: string }; message?: string } } })
      .response?.data;
    if (payload?.error?.message) return payload.error.message;
    if (payload?.message) return payload.message;
  }
  return fallback;
};

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);

  const fetchSetting = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await settingService.getByKey(GPT_API_KEY_SETTING);
      setApiKey(res.data?.value || "");
      setLastUpdatedAt(res.data?.updated_at || null);
    } catch (error: unknown) {
      const statusCode = (error as { response?: { status?: number } })?.response?.status;
      if (statusCode === 404) {
        setApiKey("");
        setLastUpdatedAt(null);
      } else {
        setError(extractErrorMessage(error, "Không tải được setting gpt_api_key"));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await settingService.upsertMany([{ key: GPT_API_KEY_SETTING, value: apiKey }]);
      const saved = Array.isArray(res.data)
        ? res.data.find((setting) => setting.key === GPT_API_KEY_SETTING)
        : undefined;
      if (saved) {
        setApiKey(saved.value || "");
        setLastUpdatedAt(saved.updated_at || null);
      }
      setSuccess("Đã lưu GPT API key thành công.");
    } catch (error: unknown) {
      setError(extractErrorMessage(error, "Không lưu được GPT API key"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-600">Quản lý API setting cho hệ thống.</p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="text-xl">GPT API Key</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang tải setting...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">gpt_api_key</label>
                <textarea
                  className="flex min-h-[180px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập GPT API key ở đây..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Giá trị này sẽ được lưu qua API và tự load lại khi bạn vào lại trang.
                </p>
                {lastUpdatedAt && (
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date(lastUpdatedAt).toLocaleString()}
                  </p>
                )}
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}

              <div className="flex items-center gap-2">
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu setting"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={fetchSetting} disabled={loading || saving}>
                  Tải lại
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
