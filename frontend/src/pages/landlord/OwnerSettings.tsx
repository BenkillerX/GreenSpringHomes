import { useState } from "react";
import { UserRound, ShieldCheck, Bell, Settings2, Save, LockKeyhole, Mail, Phone, Eye, EyeOff, ChevronRight, Trash2, LoaderCircle, MessageCircle, CheckCircle2, } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import api from "../../services/api";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type SettingsTab =
  | "profile"
  | "business"
  | "listings"
  | "security"
  | "notifications"
  | "account";

const OwnerSettings = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    firstname: currentUser?.firstname ?? "",
    lastname: currentUser?.lastname ?? "",
    email: currentUser?.email ?? "",
    phone: currentUser?.phoneNumber ?? "",
    whatsapp: currentUser?.whatsappNumber ?? "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [notifications, setNotifications] = useState({
    newEnquiries: true,
    listingUpdates: true,
    accountUpdates: true,
    promotionalEmails: false,
  });

  const navigation = [
    {
      id: "profile" as const,
      label: "Personal information",
      description: "Your personal and contact details",
      icon: UserRound,
    },
    
    {
      id: "notifications" as const,
      label: "Notifications",
      description: "Manage your alerts and updates",
      icon: Bell,
    },
    {
      id: "security" as const,
      label: "Password & security",
      description: "Keep your account secure",
      icon: ShieldCheck,
    },
    {
      id: "account" as const,
      label: "Account management",
      description: "Manage your account",
      icon: Settings2,
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50";

  const labelClass = "mb-2 block text-sm font-medium text-slate-700";

  const saveButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60";

  const getInitials = () => {
    const initials = `${profile.firstname.trim().charAt(0)}${profile.lastname.trim().charAt(0)}`.toUpperCase();
    return initials || "GS";
  };

  const handleProfileSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!profile.firstname.trim() || !profile.lastname.trim()) {
      toast.error("First name and last name are required.");
      return;
    }

    setIsSaving(true);

    try {
      // Connect this to your profile update endpoint.
      // No success message until the backend confirms the update.
      toast.error("Profile update endpoint is not connected yet.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      toast.error("Please complete all password fields.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Your new passwords do not match.");
      return;
    }

    toast.error("Connect your password update API to enable this feature.");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await api.delete("/auth/me");
      logout();
      navigate("/login", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to delete account."
        );
        return;
      }

      toast.error("An unexpected error occurred.");
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Settings
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your property owner account and preferences.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-base font-bold text-emerald-800">
                  {getInitials()}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {[profile.firstname, profile.lastname].filter(Boolean).join(" ") || "Your account"}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {profile.email || "Property owner"}
                  </p>
                </div>
              </div>
            </div>

            <nav aria-label="Settings navigation" className="space-y-1 p-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-2 ${
                        isActive
                          ? "bg-white text-emerald-700 shadow-sm"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <ChevronRight size={16} className="shrink-0" />
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 space-y-6">

            {/* Personal Information */}
            {activeTab === "profile" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-slate-900">
                    Personal information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Keep your contact information accurate so prospective tenants can reach you.
                  </p>
                </div>

                <form onSubmit={handleProfileSave}>
                  <div className="space-y-7 p-5 sm:p-7">
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
                        {getInitials()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Profile details</p>
                        <p className="mt-1 text-sm text-slate-500">
                          Your personal identity on GreenSpringHomes.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstname" className={labelClass}>First name</label>
                        <input
                          id="firstname"
                          required
                          value={profile.firstname}
                          onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="lastname" className={labelClass}>Last name</label>
                        <input
                          id="lastname"
                          required
                          value={profile.lastname}
                          onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>Email address</label>
                        <div className="relative">
                          <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            id="email"
                            type="email"
                            value={profile.email}
                            readOnly
                            className={`${inputClass} cursor-not-allowed bg-slate-50 pl-10`}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className={labelClass}>Phone number</label>
                        <div className="relative">
                          <Phone size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            id="phone"
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            placeholder="+234..."
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="whatsapp" className={labelClass}>WhatsApp number</label>
                        <div className="relative">
                          <MessageCircle size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            id="whatsapp"
                            type="tel"
                            value={profile.whatsapp}
                            onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                            placeholder="+234..."
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-7">
                    <button type="submit" disabled={isSaving} className={saveButtonClass}>
                      {isSaving ? <LoaderCircle size={17} className="animate-spin" /> : <Save size={17} />}
                      Save changes
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-slate-900">Notification preferences</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose the updates you want to receive.
                  </p>
                </div>

                <div className="divide-y divide-slate-100 px-5 sm:px-7">
                  {[
                    {
                      key: "newEnquiries" as const,
                      title: "New property enquiries",
                      description: "Get notified when prospective tenants contact you.",
                    },
                    {
                      key: "listingUpdates" as const,
                      title: "Listing updates",
                      description: "Receive updates about your property listings.",
                    },
                    {
                      key: "accountUpdates" as const,
                      title: "Account updates",
                      description: "Important information about your account.",
                    },
                    {
                      key: "promotionalEmails" as const,
                      title: "News and promotions",
                      description: "Platform announcements, news and offers.",
                    },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between gap-4 py-5">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifications[item.key]}
                        aria-label={item.title}
                        onClick={() => toggleNotification(item.key)}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          notifications[item.key] ? "bg-emerald-700" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                            notifications[item.key] ? "left-5" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-7">
                  <p className="text-xs text-slate-500">
                    Notification preferences are currently stored locally in this page only.
                  </p>
                </div>
              </section>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-slate-900">Password & security</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Protect your GreenSpringHomes account.
                  </p>
                </div>

                <form onSubmit={handlePasswordSave}>
                  <div className="space-y-5 p-5 sm:p-7">
                    {[
                      { label: "Current password", key: "currentPassword" as const, show: showCurrentPassword, toggle: () => setShowCurrentPassword(!showCurrentPassword) },
                      { label: "New password", key: "newPassword" as const, show: showNewPassword, toggle: () => setShowNewPassword(!showNewPassword) },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className={labelClass}>{field.label}</label>
                        <div className="relative">
                          <input
                            type={field.show ? "text" : "password"}
                            value={passwords[field.key]}
                            onChange={(e) => setPasswords({
                              ...passwords,
                              [field.key]: e.target.value,
                            })}
                            minLength={field.key === "newPassword" ? 8 : undefined}
                            className={`${inputClass} pr-12`}
                          />
                          <button
                            type="button"
                            onClick={field.toggle}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          >
                            {field.show ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    ))}

                    <div>
                      <label className={labelClass}>Confirm new password</label>
                      <input
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({
                          ...passwords,
                          confirmPassword: e.target.value,
                        })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-7">
                    <button type="submit" className={saveButtonClass}>
                      <LockKeyhole size={17} />
                      Update password
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Account Management */}
            {activeTab === "account" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-slate-900">Account management</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage your GreenSpringHomes account.
                  </p>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex items-start gap-4 rounded-xl border border-rose-200 p-4">
                    <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
                      <Trash2 size={20} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">Delete account</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Permanently request deletion of your account and associated personal data, subject to applicable retention requirements.
                      </p>

                      <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="mt-4 rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        Delete account
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2 py-2 text-xs text-slate-400">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>GreenSpringHomes</span>
              <span>·</span>
              <span>Property owner settings</span>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default OwnerSettings;
