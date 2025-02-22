import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import AuthContext from "../Context/AuthContext";
import useWebSocket from "../Hooks/useWebSocket";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddTaskForm = ({ onClose }) => {
  useWebSocket();
  const { currentUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "To-Do",
    dueDate: "",
  });

  const addTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      return axiosSecure.post("/tasks", newTask);
    },
    onSuccess: () => {
      toast.success("Task added successfully!");
      queryClient.invalidateQueries(["tasks"]);
      onClose();
    },
    onError: (error) => {
      toast.error("Error adding task: " + error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    addTaskMutation.mutate({
      ...taskData,
      userId: currentUser.uid,
      email: currentUser.email,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mx-auto">
      <h2 className="text-xl font-semibold mb-2">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Task title (Max 50 characters)"
          maxLength={50}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Task description (Max 200 characters)"
          maxLength={200}
          className="w-full p-2 border rounded mb-2"
        />

        <label htmlFor="category" className="block text-sm mb-2">
          Category
        </label>
        <select
          name="category"
          value={taskData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <label htmlFor="dueDate" className="block text-sm mb-2">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

AddTaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddTaskForm;
