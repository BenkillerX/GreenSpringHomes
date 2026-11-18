    import mongoose from "mongoose";

    const serviceProviderProfileSchema = new mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
                unique: true
            },

            service: {
                type: String,
                required: true,
                trim: true
            },

            description: {
                type: String,
                required: true,
                trim: true,
                maxlength: 1000
            },

            experience: {
                type: Number,
                required: true,
                min: 0
            },
            image: {
            url: {
                type: String,
                required: true
            },
            publicId: {
                type: String,
                required: true
            }
            },
            location: {
                type: String,
                required: true,
                trim: true
            }
        },
        {
            timestamps: true
        }
    );

    const ServiceProviderProfile = mongoose.model(
        "ServiceProviderProfile",
        serviceProviderProfileSchema
    );

    export default ServiceProviderProfile;