import { useEffect, useState, type FormEvent } from "react";
import { FiMessageSquare, FiSearch, FiSend, FiClock, FiCheckCircle, FiAlertCircle, FiUser, FiArrowLeft, } from "react-icons/fi";
import api from "../../services/api";
import axios from "axios";

interface SupportTicket {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  subject: string;
  category: string;
  description: string;
  priority: "low" | "medium" | "high";
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

const AdminSupport = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] =
    useState<SupportTicket | null>(null);

  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [reply, setReply] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  // Fetch messages for selected ticket
  const fetchMessages = async (ticketId: string) => {
    try {
      setMessagesLoading(true);

      const response = await api.get(
        `/api/admin/support/tickets/${ticketId}/messages`
      );

      setMessages(response.data.messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setError("Unable to load this conversation.");
    } finally {
      setMessagesLoading(false);
    }
  };

useEffect(() => {
  let ignore = false;

  const loadTickets = async () => {
    try {
      const { data } = await api.get("/api/admin/support/tickets");

      if (!ignore) {
        setTickets(data.tickets);
      }
    } catch (err: unknown) {
      if (!ignore) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "Unable to retrieve support tickets."
          );
        } else {
          setError("An unexpected error occurred.");
        }
      }
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  };

  void loadTickets();

  return () => {
    ignore = true;
  };
}, []);

  // Select ticket
  const handleSelectTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setMessages([]);
    setError("");
    fetchMessages(ticket._id);
  };

  // Send admin response
  const handleSendReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTicket || !reply.trim()) return;

    try {
      setSending(true);
      setError("");

      const response = await api.post(
        `/api/admin/support/tickets/${selectedTicket._id}/messages`,
        {
          message: reply.trim(),
        }
      );

      setMessages((prev) => [...prev, response.data.data]);
      setReply("");

      // Refresh ticket status
      const updatedTicket = {
        ...selectedTicket,
        status:
          selectedTicket.status === "open"
            ? "in_progress"
            : selectedTicket.status,
      };

      setSelectedTicket(updatedTicket);

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === updatedTicket._id ? updatedTicket : ticket
        )
      );
    } catch (error) {
      console.error("Failed to send reply:", error);
      setError("Unable to send your response. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const query = search.toLowerCase();

    return (
      ticket.subject.toLowerCase().includes(query) ||
      ticket.user?.username?.toLowerCase().includes(query) ||
      ticket.user?.email?.toLowerCase().includes(query) ||
      ticket.status.toLowerCase().includes(query)
    );
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-50 text-blue-600";
      case "in_progress":
        return "bg-amber-50 text-amber-600";
      case "resolved":
        return "bg-green-50 text-green-600";
      case "closed":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Customer Support
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage customer support tickets and respond to enquiries.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total tickets",
            value: tickets.length,
            icon: FiMessageSquare,
          },
          {
            label: "Open",
            value: tickets.filter((t) => t.status === "open").length,
            icon: FiAlertCircle,
          },
          {
            label: "In progress",
            value: tickets.filter((t) => t.status === "in_progress").length,
            icon: FiClock,
          },
          {
            label: "Resolved",
            value: tickets.filter((t) => t.status === "resolved").length,
            icon: FiCheckCircle,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <Icon className="text-gray-400" size={19} />
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main support area */}
      <div className="grid min-h-162.5 grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white lg:grid-cols-[360px_1fr]">
        {/* Ticket list */}
        <div
          className={`border-r border-gray-200 ${
            selectedTicket ? "hidden lg:block" : "block"
          }`}
        >
          <div className="border-b border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900">
              Support tickets
            </h2>

            <div className="relative mt-3">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={17}
              />
              <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-green-600"
              />
            </div>
          </div>

          <div className="max-h-150 overflow-y-auto">
            {loading ? (
              <p className="p-6 text-center text-sm text-gray-500">
                Loading tickets...
              </p>
            ) : filteredTickets.length === 0 ? (
              <p className="p-6 text-center text-sm text-gray-500">
                No support tickets found.
              </p>
            ) : (
              filteredTickets.map((ticket) => (
                <button
                  key={ticket._id}
                  onClick={() => handleSelectTicket(ticket)}
                  className={`w-full border-b border-gray-100 p-4 text-left transition hover:bg-gray-50 ${
                    selectedTicket?._id === ticket._id
                      ? "bg-green-50"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate font-semibold text-gray-900">
                      {ticket.subject}
                    </p>

                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold capitalize ${getStatusStyle(
                        ticket.status
                      )}`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    {ticket.user?.username || ticket.user?.email || "Customer"}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs capitalize text-gray-500">
                      {ticket.category.replace("_", " ")}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Conversation panel */}
        <div
          className={`flex min-w-0 flex-col ${
            selectedTicket ? "flex" : "hidden lg:flex"
          }`}
        >
          {!selectedTicket ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-5">
                <FiMessageSquare size={30} className="text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Select a support ticket
              </h3>
              <p className="mt-2 max-w-sm text-sm text-gray-500">
                Choose a ticket from the list to view the customer's
                message and respond.
              </p>
            </div>
          ) : (
            <>
              {/* Conversation header */}
              <div className="border-b border-gray-200 p-4">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="mb-3 flex items-center gap-2 text-sm text-gray-500 lg:hidden"
                >
                  <FiArrowLeft size={16} />
                  Back to tickets
                </button>

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {selectedTicket.subject}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                      {selectedTicket.user?.username} ·{" "}
                      {selectedTicket.user?.email}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                      selectedTicket.status
                    )}`}
                  >
                    {selectedTicket.status.replace("_", " ")}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                  <span>
                    Category: {selectedTicket.category.replace("_", " ")}
                  </span>
                  <span>
                    Priority: {selectedTicket.priority}
                  </span>
                  <span>
                    Submitted: {formatDate(selectedTicket.createdAt)}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">
                {/* Original ticket description */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-xl rounded-tl-none border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <FiUser size={15} className="text-gray-500" />
                      <span className="text-xs font-semibold text-gray-800">
                        {selectedTicket.user?.username || "Customer"}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap text-sm text-gray-700">
                      {selectedTicket.description}
                    </p>
                    <p className="mt-2 text-[10px] text-gray-400">
                      {formatDate(selectedTicket.createdAt)}
                    </p>
                  </div>
                </div>

                {messagesLoading ? (
                  <p className="py-4 text-center text-sm text-gray-500">
                    Loading conversation...
                  </p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex ${
                        message.senderRole === "support"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl p-4 shadow-sm ${
                          message.senderRole === "support"
                            ? "rounded-tr-none bg-green-700 text-white"
                            : "rounded-tl-none border border-gray-200 bg-white text-gray-800"
                        }`}
                      >
                        <p
                          className={`mb-2 text-xs font-semibold ${
                            message.senderRole === "support"
                              ? "text-green-100"
                              : "text-gray-700"
                          }`}
                        >
                          {message.senderRole === "support"
                            ? "Support team"
                            : message.sender?.username || "Customer"}
                        </p>

                        <p className="whitespace-pre-wrap text-sm">
                          {message.message}
                        </p>

                        <p
                          className={`mt-2 text-[10px] ${
                            message.senderRole === "support"
                              ? "text-green-100"
                              : "text-gray-400"
                          }`}
                        >
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Reply form */}
              <form
                onSubmit={handleSendReply}
                className="border-t border-gray-200 bg-white p-4"
              >
                {error && (
                  <p className="mb-3 text-sm text-red-600">{error}</p>
                )}

                <div className="flex items-end gap-3">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Write your response to the customer..."
                    rows={3}
                    maxLength={3000}
                    className="min-h-20 flex-1 resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-green-600"
                  />

                  <button
                    type="submit"
                    disabled={!reply.trim() || sending || messagesLoading}
                    className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiSend size={16} />
                    <span className="hidden sm:inline">
                      {sending ? "Sending..." : "Send"}
                    </span>
                  </button>
                </div>

                <p className="mt-2 text-right text-xs text-gray-400">
                  {reply.length}/3000 characters
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      {error && !selectedTicket && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default AdminSupport;
