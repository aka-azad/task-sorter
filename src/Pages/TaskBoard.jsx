import { useState } from "react";
import AddTaskForm from "../Components/AddNewTaskForm";

const TaskBoard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setIsFormOpen(true)}
        className="btn btn-primary mb-4"
      >
        + Add New Task
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-sm">
            <AddTaskForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}

      {/* Your Task List Component Goes Here */}
    </div>
  );
};

export default TaskBoard;
