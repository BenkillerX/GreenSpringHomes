import { Clock3, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ComingSoonProps {
  title: string;
  description?: string;
}

const ComingSoon = ({
  title,
  description,
}: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
        <Clock3 size={36} className="text-emerald-600" />
      </div>

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        {title} Coming Soon
      </h1>

      <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
        {description ||
          "We're working on this feature to make your experience with GreenSpringHomes even better. Stay tuned!"}
      </p>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mt-8 flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        <ArrowLeft size={18} />
        Go Back
      </button>
    </div>
  );
};

export default ComingSoon;