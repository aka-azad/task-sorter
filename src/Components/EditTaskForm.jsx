import { useContext, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import AuthContext from "../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const EditTaskForm = ({ onClose, task }) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
  const [taskData, setTaskData] = useState({
    title: task.title,
    _id: task._id,
    description: task.description,
    category: task.category,
  });
  const userId = currentUser.uid;

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      await axiosPublic.put(`/edit-task/${updatedTask._id}`, updatedTask);
    },
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries(["tasks", userId]);

      const previousTasks = queryClient.getQueryData(["tasks", userId]);

      queryClient.setQueryData(["tasks", userId], (oldTasks) =>
        oldTasks.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );

      return { previousTasks };
    },
    onSuccess: (_, updatedTask) => {
      queryClient.setQueryData(["tasks", userId], (oldTasks) =>
        oldTasks.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );
    },
    onError: (error, _, context) => {
      toast.error("Failed to update task order");

      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks", userId], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks", userId]);
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
    updateTaskMutation.mutate({
      ...taskData,
      userId: currentUser.uid,
      email: currentUser.email,
      timestamp: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mx-auto">
      <h2 className="text-xl font-semibold mb-2">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Task title (Max 50 characters) - Required"
          maxLength={50}
          required
          className="w-full p-2 border rounded mb-2 "
        />
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Task description (Max 200 characters)"
          maxLength={200}
          className="w-full p-2 border rounded mb-2"
        />
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
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

EditTaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default EditTaskForm;
