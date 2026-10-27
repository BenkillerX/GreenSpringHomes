
import { useState } from "react";
import { UserRound, ShieldCheck, Bell, Settings2, Save, LockKeyhole, Mail, Phone, Eye, EyeOff, CheckCircle2, ChevronRight, LogOut, Trash2, LoaderCircle, } from "lucide-react";

type SettingsTab = "profile" | "security" | "notifications" | "account";

interface ProfileForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

interface NotificationPreferences {
  emailUpdates: boolean;
  propertyAlerts: boolean;
  inspectionReminders: boolean;
  promotionalEmails: boolean;
}

const Settings = () => {
  // Replace these initial values with your existing auth context.
  const [profile, setProfile] = useState<ProfileForm>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] =
    useState<NotificationPreferences>({
      emailUpdates: true,
      propertyAlerts: true,
      inspectionReminders: true,
      promotionalEmails: false,
    });

  const navigation: {
    id: SettingsTab;
    label: string;
    description: string;
    icon: typeof UserRound;
  }[] = [
    {
      id: "profile",
      label: "Personal information",
      description: "Your name and contact details",
      icon: UserRound,
    },
    {
      id: "security",
      label: "Password & security",
      description: "Keep your account secure",
      icon: ShieldCheck,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Manage your preferences",
      icon: Bell,
    },
    {
      id: "account",
      label: "Account management",
      description: "Manage your account",
      icon: Settings2,
    },
  ];

  const updateProfileField = (field: keyof ProfileForm, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaveMessage("");
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-700";

  const saveButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60";

  // Connect this handler to your real profile-update API.
  const handleProfileSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveMessage("");

    if (!profile.firstname.trim() || !profile.lastname.trim()) {
      setSaveMessage("First name and last name are required.");
      return;
    }

    setIsSaving(true);

    try {
      // TODO: Call your profile-update endpoint here.
      // Do not show success until the API confirms the update.
      setSaveMessage(
        "Profile API is not connected yet. Your changes have not been saved."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveMessage("");

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setSaveMessage("Please complete all password fields.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setSaveMessage("Your new password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setSaveMessage("Your new passwords do not match.");
      return;
    }

    setSaveMessage(
      "Password API is not connected yet. Your password has not been changed."
    );
  };

  const toggleNotification = (key: keyof NotificationPreferences) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const getInitials = () =>
    `${profile.firstname.trim().charAt(0)}${profile.lastname
      .trim()
      .charAt(0)}`.toUpperCase() || "GS";

  return (
    <div className="min-h-screen bg-[#F7F9F8] px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
           Settings
          </h1>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          {/* Settings sidebar */}
          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-base font-bold text-emerald-800">
                  {getInitials()}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {[profile.firstname, profile.lastname]
                      .filter(Boolean)
                      .join(" ") || "Your account"}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {profile.email || "Tenant account"}
                  </p>
                </div>
              </div>
            </div>

            <nav
              aria-label="Settings navigation"
              className="space-y-1 p-3"
            >
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setSaveMessage("");
                    }}
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

                    <ChevronRight
                      size={16}
                      className={isActive ? "text-emerald-700" : "text-slate-300"}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-slate-100 p-3">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("account");
                  setSaveMessage("");
                }}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Account actions</span>
              </button>
            </div>
          </aside>

          {/* Settings content */}
          <main className="min-w-0 space-y-6">
            {saveMessage && (
              <div
                role="status"
                className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
              >
                {saveMessage}
              </div>
            )}

            {/* Personal information */}
            {activeTab === "profile" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-slate-900">
                    Personal information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Keep your contact details accurate so property owners can
                    reach you about your enquiries.
                  </p>
                </div>

                <form onSubmit={handleProfileSave}>
                  <div className="space-y-7 p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
                        {getInitials()}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          Profile details
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Update the information associated with your account.
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                          Profile photo uploads can be connected separately.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstname" className={labelClass}>
                          First name
                        </label>
                        <input
                          id="firstname"
                          autoComplete="given-name"
                          required
                          value={profile.firstname}
                          onChange={(event) =>
                            updateProfileField("firstname", event.target.value)
                          }
                          placeholder="Enter your first name"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="lastname" className={labelClass}>
                          Last name
                        </label>
                        <input
                          id="lastname"
                          autoComplete="family-name"
                          required
                          value={profile.lastname}
                          onChange={(event) =>
                            updateProfileField("lastname", event.target.value)
                          }
                          placeholder="Enter your last name"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email address
                        </label>
                        <div className="relative">
                          <Mail
                            size={17}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={profile.email}
                            readOnly
                            className={`${inputClass} cursor-not-allowed bg-slate-50 pl-10 text-slate-500`}
                          />
                        </div>
                        <p className="mt-2 text-xs leading-5 text-slate-400">
                          Email changes should use your verified email-change
                          workflow.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone number
                        </label>
                        <div className="relative">
                          <Phone
                            size={17}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            value={profile.phone}
                            onChange={(event) =>
                              updateProfileField("phone", event.target.value)
                            }
                            placeholder="+234..."
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <p className="text-xs leading-5 text-slate-400">
                      Your information should remain accurate and up to date.
                    </p>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={saveButtonClass}
                    >
                      {isSaving ? (
                        <LoaderCircle size={17} className="animate-spin" />
                      ) : (
                        <Save size={17} />
                      )}
                      Save changes
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Password & security
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Protect your GreenSpringHomes account.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePasswordSave}>
                  <div className="space-y-5 p-5 sm:p-7">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className={labelClass}
                      >
                        Current password
                      </label>
                      <div className="relative">
                        <input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          autoComplete="current-password"
                          value={passwords.currentPassword}
                          onChange={(event) =>
                            setPasswords((current) => ({
                              ...current,
                              currentPassword: event.target.value,
                            }))
                          }
                          placeholder="Enter current password"
                          className={`${inputClass} pr-12`}
                        />
                        <button
                          type="button"
                          aria-label={
                            showCurrentPassword
                              ? "Hide current password"
                              : "Show current password"
                          }
                          onClick={() =>
                            setShowCurrentPassword((current) => !current)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700"
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="newPassword" className={labelClass}>
                        New password
                      </label>
                      <div className="relative">
                        <input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          autoComplete="new-password"
                          minLength={8}
                          value={passwords.newPassword}
                          onChange={(event) =>
                            setPasswords((current) => ({
                              ...current,
                              newPassword: event.target.value,
                            }))
                          }
                          placeholder="At least 8 characters"
                          className={`${inputClass} pr-12`}
                        />
                        <button
                          type="button"
                          aria-label={
                            showNewPassword
                              ? "Hide new password"
                              : "Show new password"
                          }
                          onClick={() =>
                            setShowNewPassword((current) => !current)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700"
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className={labelClass}
                      >
                        Confirm new password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        minLength={8}
                        value={passwords.confirmPassword}
                        onChange={(event) =>
                          setPasswords((current) => ({
                            ...current,
                            confirmPassword: event.target.value,
                          }))
                        }
                        placeholder="Re-enter your new password"
                        className={inputClass}
                      />
                    </div>

                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                      <div className="flex items-start gap-3">
                        <LockKeyhole
                          size={19}
                          className="mt-0.5 shrink-0 text-emerald-700"
                        />
                        <div>
                          <p className="text-sm font-semibold text-emerald-900">
                            Keep your account secure
                          </p>
                          <p className="mt-1 text-sm leading-6 text-emerald-800/80">
                            Use a unique password and never share your login
                            details with another person.
                          </p>
                        </div>
                      </div>
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

            {/* Notifications */}
            {activeTab === "notifications" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-slate-900">
                    Notification preferences
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Choose which updates you'd like to receive.
                  </p>
                </div>

                <div className="divide-y divide-slate-100 px-5 sm:px-7">
                  {[
                    {
                      key: "emailUpdates" as const,
                      title: "Account updates",
                      description:
                        "Important information about your account and activity.",
                    },
                    {
                      key: "propertyAlerts" as const,
                      title: "Property alerts",
                      description:
                        "Updates about properties that match your interests.",
                    },
                    {
                      key: "inspectionReminders" as const,
                      title: "Inspection reminders",
                      description:
                        "Reminders about upcoming property inspections.",
                    },
                    {
                      key: "promotionalEmails" as const,
                      title: "News and promotions",
                      description:
                        "Property news, platform announcements, and offers.",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-4 py-5"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="mt-1 max-w-lg text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifications[item.key]}
                        aria-label={item.title}
                        onClick={() => toggleNotification(item.key)}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          notifications[item.key]
                            ? "bg-emerald-700"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                            notifications[item.key]
                              ? "left-[22px]"
                              : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <p className="text-xs leading-5 text-slate-400">
                    Preferences currently apply to this page only.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setSaveMessage(
                        "Notification preferences are not connected to persistent storage yet."
                      )
                    }
                    className={saveButtonClass}
                  >
                    <Save size={17} />
                    Save preferences
                  </button>
                </div>
              </section>
            )}

            {/* Account management */}
            {activeTab === "account" && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-slate-900">
                    Account management
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Manage your GreenSpringHomes account and access.
                  </p>
                </div>

                <div className="space-y-5 p-5 sm:p-7">
                  <div className="flex items-start gap-4 rounded-xl border border-slate-200 p-4">
                    <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                      <LogOut size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">
                        Sign out
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Sign out of your current session on this device.
                      </p>
                      <p className="mt-3 text-xs text-slate-400">
                        Connect this action to your existing authentication
                        context's logout method.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-rose-200 p-4">
                    <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
                      <Trash2 size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">
                        Delete account
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Permanently request deletion of your account and
                        associated personal data, subject to applicable
                        retention requirements.
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setSaveMessage(
                            "Account deletion is not available until a secure backend deletion workflow is implemented."
                          )
                        }
                        className="mt-4 rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        Delete account
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-center gap-2 py-2 text-xs text-slate-400">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>GreenSpringHomes</span>
              <span>·</span>
              <span>Account settings</span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
