import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

interface SavePropertyButtonProps {
  propertyId: string;
}

const SavePropertyButton = ({
  propertyId,
}: SavePropertyButtonProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check if property is already saved
  useEffect(() => {
    let cancelled = false;

    const checkSavedStatus = async () => {
      try {
        setChecking(true);

        const response = await api.get(
          `/api/saved-properties/${propertyId}/status`
        );

        if (!cancelled) {
          setIsSaved(response.data.isSaved);
        }
      } catch (error) {
        console.error("CHECK SAVED STATUS ERROR:", error);
      } finally {
        if (!cancelled) {
          setChecking(false);
        }
      }
    };

    checkSavedStatus();

    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  const handleToggleSave = async () => {
    if (loading || checking) return;

    try {
      setLoading(true);

      if (isSaved) {
        // Remove from saved properties
        await api.delete(
          `/api/saved-properties/${propertyId}`
        );

        setIsSaved(false);
        toast.success("Property removed from saved properties");
      } else {
        // Save property
        await api.post(
          `/api/saved-properties/${propertyId}`
        );

        setIsSaved(true);
        toast.success("Property saved successfully");
      }
    } catch (error) {
      console.error("SAVE PROPERTY ERROR:", error);

      toast.error("Unable to update saved property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleSave}
      disabled={loading || checking}
      aria-label={isSaved ? "Remove saved property" : "Save property"}
      aria-pressed={isSaved}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Heart
        size={21}
        className={
          isSaved
            ? "fill-red-500 text-red-500"
            : "text-slate-600"
        }
      />
    </button>
  );
};

export default SavePropertyButton;