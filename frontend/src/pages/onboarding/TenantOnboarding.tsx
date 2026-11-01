import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../services/api";

const TenantOnboarding = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors([]);
    setLoading(true);

    try {
      await api.post("/api/onboarding/tenant", {
        phone,
      });

      navigate("/tenant");
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
              "Unable to complete onboarding. Please try again.",
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
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
            🏠
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Complete your profile
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
            Just a few details before you start using QuickStay.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8 lg:p-10">

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Profile setup
              </span>

              <span className="text-sm text-gray-400">
                1 of 1
              </span>
            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-full bg-green-500 rounded-full" />
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <p
                    key={index}
                    className="text-sm text-red-600"
                  >
                    {error}
                  </p>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Phone */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Contact information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add your phone number so you can communicate with
                property owners.
              </p>

              <div className="mt-5">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08012345678"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  required
                />

                <p className="mt-2 text-xs text-gray-400">
                  Use a phone number you can be reached on.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t border-gray-100 pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-green-500 text-white font-medium shadow-sm transition hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {loading
                  ? "Completing setup..."
                  : "Complete setup"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          You can update your profile information later from settings.
        </p>
      </div>
    </section>
  );
};

export default TenantOnboarding;
