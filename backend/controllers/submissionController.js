
import Submission from '../models/submissionModel.js';
import { Assignment } from '../models/assignmentModel.js';
import Course from '../models/courseModel.js';

export const submitAssignment = async (req, res) => {
    try {
        const { assignmentId, submissionLink } = req.body;
        const studentId = req.user._id;

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        const course = await Course.findById(assignment.course).populate('students');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const isEnrolled = course.students.some(student => student.equals(studentId));
        if (!isEnrolled) {
            return res.status(403).json({ message: 'You are not enrolled in this course' });
        }

        const existingSubmission = await Submission.findOne({ assignment: assignmentId, student: studentId });
        if (existingSubmission) {
            return res.status(400).json({ message: 'You have already submitted this assignment' });
        }

        const submission = new Submission({
            assignment: assignmentId,
            student: studentId,
            submissionLink
        });

        await submission.save();

        res.status(201).json({ message: 'Assignment submitted successfully', submission });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSubmissions = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const educatorId = req.user._id;

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        const course = await Course.findById(assignment.course);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.createdBy.toString() !== educatorId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to view submissions for this assignment' });
        }

        const submissions = await Submission.find({ assignment: assignmentId }).populate('student', 'name');

        res.status(200).json({ submissions });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
