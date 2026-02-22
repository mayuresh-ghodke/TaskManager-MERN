import Task from "../models/Task.js";
import { createGoogleCalendarEvent } from "../utils/googleCalendar.js";
import User from "../models/User.js";

/* Create Task */
const createTask = async(req, res) => {
    try{

        const {addToCalendar, ...formData} = req.body;

        const task = await Task.create({
            ...formData,
            user: req.user,
            file: req.file ? req.file.filename : null,
            statusHistory: [{status: req.body.status}],
        });

        let calendarMessage = "Task saved successfully.";

        if(addToCalendar === "true" || addToCalendar === true){
            try{
                const user = await User.findById(req.user);
                if(user?.googleAccessToken){
                    const event = await createGoogleCalendarEvent(user, task);
                    // store google event ID
                    task.googleEventId = event.id;
                    await task.save();
                    calendarMessage = "Task saved and added to google calendar.";
                }
                else{
                    calendarMessage = "Task saved, but google not connected.";
                }
            }
            catch(error){
                console.log("Calendar error: ", error);
                calendarMessage = "Task saved, but failed to add to Google Calendar";
            }
        }

        res.status(201).json({
            message: calendarMessage,
            task
        });
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
};

/**
 * Get Tasks (with filtering)
 *  */ 
const getTasks = async (req, res) => {

    const query = {user: req.user};

    if(req.query.category){
        query.category = req.query.category;
    }

    if(req.query.status){
        query.status = req.query.status;
    }

    const tasks = await Task.find(query).sort({createdAt: -1});
    res.json(tasks);
};

const updateTask = async(req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        // ensuring task belongs to logged-in user
        if(task.user.toString() !== req.user){
            return res.status(401).json({message: "Not authorized"});
        }
        // update task
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: "Task updated successfully", task: updatedTask});
    }
    catch(error){
        console.log("Error: ", error.message);
        res.status(500).json({message: "Server error"});
    }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {createTask, getTasks, updateTask, deleteTask};