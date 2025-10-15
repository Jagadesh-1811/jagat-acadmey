import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    grade: { type: String, required: true },
    feedback: { type: String, default: '' }
}, { timestamps: true });

const Grade = mongoose.model("Grade", gradeSchema);
export default Grade;
