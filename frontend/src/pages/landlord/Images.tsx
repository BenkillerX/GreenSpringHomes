import { FiImage, FiPlus, FiX } from "react-icons/fi"
import type { ChangeEvent } from "react";
interface ImagesProps {
  images: File[];
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}
const Images = ({ images, handleImageChange, removeImage, }: ImagesProps) => {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FiImage size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Property Images
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Add clear photos of the property. Maximum 5 images.
              </p>
            </div>

          </div>

          <div className="p-5 sm:p-6">

            {/* UPLOAD AREA */}
            <label
              htmlFor="propertyImages"
              className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 text-center transition hover:border-green-400 hover:bg-green-50/40"
            >

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-600 shadow-sm">
                <FiImage size={25} />
              </div>

              <p className="text-sm font-semibold text-gray-700">
                Upload property photos
              </p>

              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG or WEBP
              </p>

              <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-green-600 shadow-sm">
                <FiPlus size={15} />
                Choose Images
              </span>

              <input
                id="propertyImages"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

            {/* IMAGE PREVIEWS */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

                {images.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
                  >

                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Property ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow transition hover:bg-white"
                    >
                      <FiX size={15} />
                    </button>

                  </div>
                ))}

              </div>
            )}

            {images.length > 0 && (
              <p className="mt-3 text-xs text-gray-500">
                {images.length} {images.length === 1 ? "image" : "images"} selected.
              </p>
            )}

          </div>
        </section>
  )
}

export default Images