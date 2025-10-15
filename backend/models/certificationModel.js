import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, required: true },
    course: { type: String, required: true },
    completionDate: { type: Date, required: true }
}, { timestamps: true });

const Certification = mongoose.model("Certification", certificationSchema);
export default Certification;
