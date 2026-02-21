import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    title: String,
    description: String,
    category: {
        type: String,
        enum: ["Learning", "Project", "Job"],
    },
    status:{
        type: String,
        required: true,
    },
    statusHistory: [
        {
            status: String,
            changedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    deadline:Date,
    file: {
        type: String,
    },
    googleEventId: {
        type: String,
    }, 
}, {timestamps: true});

taskSchema.pre("save", async function() {
    
    const statusMap = {
        Learning: ["Saved", "Started", "Completed"],
        Job: ["Saved", "Applied", "Interviewed", "Rejected", "Selected"],
        Project: ["Saved", "Started", "In Progress", "Completed"],
    };

    const allowedStatuses = statusMap[this.category];

    if(!allowedStatuses.includes(this.status)) {
        return new Error("Invalid status for selected category.");
    }
});

export default mongoose.model("Task", taskSchema);