import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/useAuth"
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const Tenant = () => {
    const { register, googleRegisterTenant } = useAuth();
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  function toggleEye() {
  setShowPassword((prev) => !prev);
}
async function handleRegister(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  setErrors([]);
  setLoading(true);

  try {
    const result = await register(
      firstname,
      lastname,
      email,
      password
    );

    navigate("/verify-email", {
      state: { email: result.email },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      if (data?.errors?.length) {
        setErrors(
          data.errors.map(
            (error: { msg: string }) => error.msg
          )
        );
      } else {
        setErrors([
          data?.message ||
            "Unable to create your account. Please try again.",
        ]);
      }
    } else {
      setErrors([
        "Something went wrong. Please try again.",
      ]);
    }
  } finally {
    setLoading(false);
  }
}
async function handleGoogleRegister(
  credentialResponse: CredentialResponse
) {
  setErrors([]);

  if (!credentialResponse.credential) {
    setErrors(["Google authentication failed. Please try again."]);
    return;
  }

  try {
    setLoading(true);

    await googleRegisterTenant(credentialResponse.credential);

    navigate("/tenant/onboarding");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setErrors([
        error.response?.data?.message ??
          "Unable to create your account with Google. Please try again.",
      ]);
    } else if (error instanceof Error) {
      setErrors([error.message]);
    } else {
      setErrors(["Something went wrong. Please try again."]);
    }
  } finally {
    setLoading(false);
  }
}
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
  <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="grid lg:grid-cols-2">

      {/* =========================
          LEFT — SIGN UP FORM
      ========================== */}
      <div className="px-6 py-8 sm:px-10 lg:px-14 lg:py-12">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600 mb-4">
            Tenant
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Join QuickStay and start discovering your next home.
          </p>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex gap-3">

              <div className="shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">
                !
              </div>

              <div className="space-y-1">
                {errors.map((error, index) => (
                  <p key={index} className="text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>

            </div>
          </div>
        )}

       {/* Google Button */}
<div className="w-full flex justify-center">
  <GoogleLogin
    onSuccess={handleGoogleRegister}
    onError={() => {
      setErrors([
        "Google sign-up was cancelled or failed. Please try again.",
      ]);
    }}
    text="continue_with"
    theme="outline"
    size="large"
    shape="rectangular"
    width={320}
  />
</div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs uppercase tracking-wider text-gray-400">
            or continue with email
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* =========================
            FORM
        ========================== */}
        <form
          className="space-y-5"
          onSubmit={handleRegister}
        >

          {/* First + Last Name */}
          <div className="grid sm:grid-cols-2 gap-4">

            {/* Firstname */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="firstname"
                className="text-sm font-medium text-gray-700"
              >
                First name
              </label>

              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Albert"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 placeholder:text-gray-400"
              />
            </div>

            {/* Lastname */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastname"
                className="text-sm font-medium text-gray-700"
              >
                Last name
              </label>

              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Eistien"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 placeholder:text-gray-400"
              />
            </div>

          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
         <div className="flex flex-col gap-2">
  <label
    htmlFor="password"
    className="text-sm font-medium text-gray-700"
  >
    Password
  </label>

  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Create a strong password"
      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 placeholder:text-gray-400"
    />

    <button
      type="button"
      onClick={toggleEye}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition"
    >
      {showPassword ? (
        <FiEyeOff size={20} />
      ) : (
        <FiEye size={20} />
      )}
    </button>
  </div>

  <p className="text-xs text-gray-400">
    Use at least 8 characters for better security.
  </p>
</div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] transition-all shadow-sm"
          >
            {loading ? "Creating account..." : "Create Tenant Account"}
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-7">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-600 hover:text-green-700 hover:underline"
          >
            Log in
          </Link>
        </p>

      </div>

      {/* =========================
          RIGHT — TENANT INTRO
      ========================== */}
      <div className="relative hidden lg:flex min-h-175 bg-gray-900 overflow-hidden">

        {/* Background Image */}
        <img
          src="/images/Quick3.jpg"
          alt="Modern home available on QuickStay"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 text-white">

          {/* Top */}
          <div>
            <div className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 text-sm">
              🏠 Find your next home
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-md">

            <h2 className="text-4xl xl:text-5xl font-semibold leading-tight">
              Your next home could be closer than you think.
            </h2>

            <p className="mt-5 text-white/80 text-base xl:text-lg leading-relaxed">
              Create your QuickStay account and discover properties that
              match what you're looking for. Search, explore, and connect
              with property owners from one place.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-300">
                  ✓
                </div>

                <span className="text-sm text-white/90">
                  Discover properties that fit your needs
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-300">
                  ✓
                </div>

                <span className="text-sm text-white/90">
                  Explore property details before making a decision
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-300">
                  ✓
                </div>

                <span className="text-sm text-white/90">
                  Manage your search from your tenant dashboard
                </span>
              </div>

            </div>

          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-white/60 leading-relaxed">
              After creating your account, you'll be taken to your tenant
              dashboard where you can start exploring available properties.
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
  )
}

export default Tenant