import { useState, useEffect, type ChangeEvent, type FormEvent, } from "react";
import { FiHeadphones, FiArrowLeft, FiSend, FiCheckCircle, FiAlertCircle, FiClock, FiMessageSquare, } from "react-icons/fi";
import api from "../../services/api";
import axios from "axios";
interface SupportTicket {
  _id: string;
  subject: string;
  category: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
}

interface SupportMessage {
  _id: string;
  ticket: string;
  sender: {
    _id: string;
    username: string;
    email: string;
  };
  senderRole: "user" | "support";
  message: string;
  createdAt: string;
}
const categories = [
  { value: "account", label: "Account & Profile" },
  { value: "property_listing", label: "Property Listing" },
  { value: "property_verification", label: "Property Verification" },
  { value: "payment", label: "Payments" },
  { value: "technical_issue", label: "Technical Issue" },
  { value: "other", label: "Other" },
];

const SupportPage = () => {
  const [form, setForm] = useState({
    subject: "",
    category: "",
    description: "",
  });

    const [loading, setLoading] = useState(false);    
    const [ticket, setTicket] = useState<SupportTicket | null>(null);
    const [error, setError] = useState("");
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
const [selectedTicket, setSelectedTicket] =
  useState<SupportTicket | null>(null);

const [messages, setMessages] = useState<SupportMessage[]>([]);
const [reply, setReply] = useState("");

const [historyLoading, setHistoryLoading] = useState(true);
const [messagesLoading, setMessagesLoading] = useState(false);
const [sending, setSending] = useState(false);

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const fetchTicketHistory = async () => {
  try {
    setHistoryLoading(true);

    const { data } = await api.get("/api/support/ticket-history");

    setTickets(data.tickets);
    console.log(data.tickets);
    
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      setError(
        err.response?.data?.message ||
          "Unable to retrieve your support tickets."
      );
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
    setHistoryLoading(false);
  }
};

useEffect(() => {
  let ignore = false;

  const loadTicketHistory = async () => {
    try {
      const { data } = await api.get("/api/support/ticket-history");

      if (!ignore) {
        setTickets(data.tickets);
      }
    } catch (err: unknown) {
      if (!ignore) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Unable to retrieve your support tickets."
          );
        } else {
          setError("An unexpected error occurred.");
        }
      }
    } finally {
      if (!ignore) {
        setHistoryLoading(false);
      }
    }
  };

  void loadTicketHistory();

  return () => {
    ignore = true;
  };
}, []);
const handleViewTicket = async (selected: SupportTicket) => {
  setSelectedTicket(selected);
  setMessages([]);
  setError("");

  try {
    setMessagesLoading(true);

    const { data } = await api.get(
      `/api/support/${selected._id}/messages`
    );

    setMessages(data.messages);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      setError(
        err.response?.data?.message ||
          "Unable to load this conversation."
      );
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
    setMessagesLoading(false);
  }
};
const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!selectedTicket || !reply.trim() || sending) return;

  try {
    setSending(true);
    setError("");

    const { data } = await api.post(
      `/api/support/${selectedTicket._id}/messages`,
      { message: reply.trim() }
    );

    setMessages((prev) => [...prev, data.data]);

    setReply("");
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      setError(
        err.response?.data?.message ||
          "Unable to send your message."
      );
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
    setSending(false);
  }
};
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/api/support", form);

      setTicket(data.ticket);
      setForm({
        subject: "",
        category: "",
        description: "",
      });
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setError(
      err.response?.data?.message ||
        "Unable to submit your support request. Please try again."
    );
  } else {
    setError("An unexpected error occurred. Please try again.");
  }
} finally {
  setLoading(false);
}
  };

  if (ticket) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-xl">
          <button
            onClick={() => setTicket(null)}
            className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-700"
          >
            <FiArrowLeft />
            Back to support
          </button>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <FiCheckCircle size={34} />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Request submitted!
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-gray-500">
              Your support request has been received. Our team will
              review your issue and respond as soon as possible.
            </p>

            <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-5 text-left">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Ticket reference
              </p>

              <p className="mt-2 break-all font-semibold text-gray-900">
                {ticket._id}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-amber-600">
                <FiClock />
                <span>Awaiting support response</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => setTicket(null)}
                className="w-full rounded-xl bg-green-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Submit another request
              </button>

              <p className="text-xs text-gray-400">
                You can check your ticket history to follow up on
                this request.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <FiHeadphones size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Help & Support
              </h1>
              <p className="text-sm text-gray-500">
                We're here to help you.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* Ticket Form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-bold text-gray-900">
                Submit a support request
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Describe the problem you're experiencing. Our support
                team will get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What do you need help with?"
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Issue category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                >
                  <option value="">Select a category</option>

                  {categories.map((category) => (
                    <option
                      key={category.value}
                      value={category.value}
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">
                    Describe your issue
                  </label>

                  <span className="text-xs text-gray-400">
                    {form.description.length}/3000
                  </span>
                </div>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Please provide as much detail as possible so we can assist you..."
                  rows={7}
                  maxLength={3000}
                  required
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3.5 text-sm leading-7 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                  <FiAlertCircle size={19} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting request...
                  </>
                ) : (
                  <>
                    <FiSend size={17} />
                    Submit support request
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FiMessageSquare size={22} />
              </div>

              <h3 className="mt-5 font-bold text-gray-900">
                How it works
              </h3>

              <div className="mt-5 space-y-5">
                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                    1
                  </span>
                  <p className="text-sm leading-6 text-gray-500">
                    Submit your issue with the necessary details.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                    2
                  </span>
                  <p className="text-sm leading-6 text-gray-500">
                    Our support team reviews your request.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                    3
                  </span>
                  <p className="text-sm leading-6 text-gray-500">
                    Receive a response through your support ticket.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-green-700 p-6 text-white">
              <FiHeadphones size={27} />

              <h3 className="mt-4 font-bold">
                Need assistance?
              </h3>

              <p className="mt-2 text-sm leading-6 text-green-100">
                Our team is ready to help with your GreenSpringHomes
                experience.
              </p>

              <p className="mt-5 text-xs text-green-200">
                GreenSpringHomes Customer Care
              </p>
            </div>

          </aside>
          {/* Customer Ticket History */}
            <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                <h2 className="text-xl font-bold text-gray-900">
                    My Support Tickets
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    View your support requests and responses.
                </p>
                </div>

                <button
                onClick={fetchTicketHistory}
                disabled={historyLoading}
                className="text-sm font-semibold text-green-700"
                >
                Refresh
                </button>
            </div>

            {historyLoading ? (
                <p className="py-6 text-center text-sm text-gray-500">
                Loading tickets...
                </p>
            ) : tickets.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-500">
                You haven't submitted any support tickets yet.
                </p>
            ) : (
                <div className="space-y-3">
                {tickets.map((item) => (
                    <div
                    key={item._id}
                    className="flex flex-col justify-between gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                    >
                    <div>
                        <h3 className="font-semibold text-gray-900">
                        {item.subject}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium capitalize text-green-700">
                        {item.status.replace("_", " ")}
                        </span>
                    </div>

                    <button
                        onClick={() => handleViewTicket(item)}
                        className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                    >
                        View conversation
                    </button>
                    </div>
                ))}
                </div>
            )}
            </div>
{selectedTicket && (
  <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
    {/* Conversation Header */}
    <div className="flex items-center justify-between border-b border-gray-100 p-5">
      <div>
        <h2 className="font-bold text-gray-900">
          {selectedTicket.subject}
        </h2>

        <p className="mt-1 text-xs capitalize text-gray-500">
          {selectedTicket.status.replace("_", " ")}
        </p>
      </div>

     <div className="flex items-center gap-3">
  <button
    onClick={() => handleViewTicket(selectedTicket)}
    disabled={messagesLoading}
    className="text-sm font-semibold text-green-700 hover:text-green-800 disabled:opacity-50"
  >
    {messagesLoading ? "Refreshing..." : "Refresh"}
  </button>

  <button
    onClick={() => {
      setSelectedTicket(null);
      setMessages([]);
      setReply("");
    }}
    className="text-sm font-semibold text-gray-500 hover:text-green-700"
  >
    Close
  </button>
</div>
    </div>

    {/* Messages */}
    <div className="max-h-125 space-y-5 overflow-y-auto bg-gray-50 p-5">
      {/* Original ticket description */}
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-green-600 p-4 text-white">
          <p className="mb-2 text-xs font-semibold text-green-100">
            You · Original request
          </p>

          <p className="text-sm leading-6">
            {selectedTicket.description}
          </p>
        </div>
      </div>

      {messagesLoading ? (
        <p className="py-6 text-center text-sm text-gray-500">
          Loading conversation...
        </p>
      ) : (
        messages.map((item) => (
          <div
            key={item._id}
            className={`flex ${
              item.senderRole === "support"
                ? "justify-start"
                : "justify-end"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                item.senderRole === "support"
                  ? "rounded-tl-none bg-white shadow-sm"
                  : "rounded-tr-none bg-green-600 text-white"
              }`}
            >
              <p
                className={`mb-2 text-xs font-semibold ${
                  item.senderRole === "support"
                    ? "text-green-700"
                    : "text-green-100"
                }`}
              >
                {item.senderRole === "support"
                  ? "GreenSpringHomes Support"
                  : "You"}
              </p>

              <p className="text-sm leading-6">
                {item.message}
              </p>

              <p
                className={`mt-2 text-[10px] ${
                  item.senderRole === "support"
                    ? "text-gray-400"
                    : "text-green-100"
                }`}
              >
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Reply Form */}
    <form
      onSubmit={handleSendMessage}
      className="border-t border-gray-100 p-4"
    >
      {error && (
        <p className="mb-3 text-sm text-red-600">{error}</p>
      )}

      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a message..."
        rows={3}
        maxLength={3000}
        disabled={
          sending ||
          selectedTicket.status === "closed" ||
          selectedTicket.status === "resolved"
        }
        className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-green-500 disabled:bg-gray-100"
      />

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={!reply.trim() || sending || messagesLoading ||
            selectedTicket.status === "closed" ||
            selectedTicket.status === "resolved"}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiSend size={16} />
          {sending ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
