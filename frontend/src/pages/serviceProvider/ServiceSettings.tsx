
import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiShield,
  FiUser,
  FiBell,
  FiAlertTriangle,
  FiMail,
  FiMessageSquare,
  FiInfo,
} from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useAuth } from "../../context/useAuth";

const ServiceSettings = () => {
  const { currentUser } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    serviceInquiries: true,
    platformUpdates: false,
  });

  const togglePasswordVisibility = (
    field: keyof typeof showPasswords
  ) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const toggleNotification = (
    field: keyof typeof notifications
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must differ from your current password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.patch("/api/auth/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(
        response.data.message || "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      let message = "Unable to change your password.";

      if (typeof error === "object" && error !== null && "response" in error) {
        const response = error.response;

        if (
          typeof response === "object" &&
          response !== null &&
          "data" in response &&
          typeof response.data === "object" &&
          response.data !== null &&
          "message" in response.data &&
          typeof response.data.message === "string"
        ) {
          message = response.data.message;
        }
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const passwordFields = [
    {
      id: "current",
      label: "Current Password",
      value: currentPassword,
      setter: setCurrentPassword,
      visible: showPasswords.current,
    },
    {
      id: "new",
      label: "New Password",
      value: newPassword,
      setter: setNewPassword,
      visible: showPasswords.new,
    },
    {
      id: "confirm",
      label: "Confirm New Password",
      value: confirmPassword,
      setter: setConfirmPassword,
      visible: showPasswords.confirm,
    },
  ] as const;

  const notificationOptions = [
    {
      id: "emailNotifications",
      title: "Email Notifications",
      description: "Receive important account notifications through email.",
      icon: FiMail,
    },
    {
      id: "serviceInquiries",
      title: "Service Inquiries",
      description: "Get notified when potential customers contact you.",
      icon: FiMessageSquare,
    },
    {
      id: "platformUpdates",
      title: "Platform Updates",
      description: "Receive product announcements and GreenSpringHomes updates.",
      icon: FiInfo,
    },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8 pb-10">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Service Settings
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account, security and notification preferences.
          </p>
        </div>

        {/* Account Information */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiUser size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Account Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your registered account details
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-400">
                FIRST NAME
              </label>
              <input
                value={currentUser?.firstname || ""}
                readOnly
                className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-400">
                LAST NAME
              </label>
              <input
                value={currentUser?.lastname || ""}
                readOnly
                className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-medium text-gray-400">
                EMAIL ADDRESS
              </label>
              <input
                value={currentUser?.email || ""}
                readOnly
                className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
              />
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-5 sm:col-span-2">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Account Role
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Your registered account type
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                Service Provider
              </span>
            </div>
          </div>
        </section>

        {/* Account Security */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiShield size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Account Security
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Keep your account protected
              </p>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-5 flex items-center gap-2">
              <FiLock className="text-green-600" />
              <h3 className="font-semibold text-gray-800">
                Change Password
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {passwordFields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>

                  <div className="relative">
                    <input
                      id={field.id}
                      type={field.visible ? "text" : "password"}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      autoComplete={
                        field.id === "current"
                          ? "current-password"
                          : "new-password"
                      }
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-50"
                    />

                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.id)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-600"
                      aria-label={field.visible ? "Hide password" : "Show password"}
                    >
                      {field.visible ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              <p className="text-xs text-gray-400">
                Your new password must contain at least 8 characters.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Updating Password..." : "Update Password"}
              </button>
            </form>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FiBell size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Notification Preferences
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Choose the notifications you want to receive
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {notificationOptions.map((option) => {
              const Icon = option.icon;

              return (
                <div
                  key={option.id}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <Icon size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {option.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifications[option.id]}
                    aria-label={option.title}
                    onClick={() => toggleNotification(option.id)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      notifications[option.id]
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
                        notifications[option.id]
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="px-5 pb-5">
            <p className="rounded-xl bg-green-50 p-3 text-xs text-green-700">
              Notification preferences are currently temporary and will
              reset when you reload the page. Persistent settings will
              be connected to your account next.
            </p>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-red-50 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <FiAlertTriangle size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-red-700">
                Danger Zone
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Irreversible account actions
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Delete Account
              </h3>
              <p className="mt-1 max-w-lg text-xs leading-6 text-gray-500">
                Permanently deleting your account may remove your service
                provider profile and associated information. This action
                cannot be undone.
              </p>
            </div>

            <button
              type="button"
              disabled
              className="shrink-0 cursor-not-allowed rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-400"
            >
              Delete Account
            </button>
          </div>

          <div className="px-5 pb-5">
            <p className="text-xs text-gray-400">
              Account deletion will become available when the secure
              deletion process is implemented.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ServiceSettings;
