import { useEffect, useState } from "react";
import { useParams } from "wouter";

interface Contact {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  inquiry: string;
  message: string;
  createdAt: string;
}

export default function AdminContacts() {
  const params = useParams<{ token: string }>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    fetch(`/api/admin/${params.token}/contacts`)
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then((data) => {
        setContacts(data.contacts);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, [params.token]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Page not found.</p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded bg-[#C9A84C] flex items-center justify-center text-[#0B1221] font-bold text-sm">NZ</div>
              <span className="font-bold text-[#0B1221] text-lg">NexZenta</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0B1221]">Enquiries</h1>
            <p className="text-gray-500 text-sm mt-1">{contacts.length} total submission{contacts.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-sm px-4 py-2 bg-[#0B1221] text-white rounded-lg hover:bg-[#0B1221]/90 transition"
          >
            Refresh
          </button>
        </div>

        {contacts.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <p className="text-gray-400 text-lg">No enquiries yet.</p>
            <p className="text-gray-300 text-sm mt-1">Submissions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-bold text-[#0B1221] text-lg">{c.name}</h2>
                    {c.company && <p className="text-gray-500 text-sm">{c.company}</p>}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs px-3 py-1 rounded-full bg-[#C9A84C]/15 text-[#8B6914] font-medium">{c.inquiry}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                  <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                    <span>📧</span> {c.email}
                  </a>
                  {c.phone && (
                    <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-gray-600">
                      <span>📞</span> {c.phone}
                    </a>
                  )}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {c.message}
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.inquiry)} — NexZenta`}
                    className="text-xs px-4 py-2 bg-[#0B1221] text-white rounded-lg hover:bg-[#0B1221]/90 transition"
                  >
                    Reply via Email
                  </a>
                  {c.phone && (
                    <a
                      href={`https://wa.me/${c.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${c.name}, thank you for reaching out to NexZenta!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
