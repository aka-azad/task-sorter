import { useState } from "react";
import AddTaskForm from "../Components/AddNewTaskForm";
import TasksList from "../Components/TasksList";

const TaskBoard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-6">
      {/* Add New Task Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="btn btn-primary mb-4"
      >
        + Add New Task
      </button>

      {/* Drag & Drop Context */}
      <div className="">
        <TasksList />
      </div>


      {/* Modal for Add Task Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white bg-opacity-40 backdrop-blur-xl p-6 rounded-lg shadow-xl max-w-screen-sm mx-auto text-black shadow-white">
            <AddTaskForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
