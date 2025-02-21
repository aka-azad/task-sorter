import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditTaskForm from "./EditTaskForm";
import useWebSocket from "../Hooks/useWebSocket";

const TaskList = () => {
  useWebSocket();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasksState, setTasksState] = useState([]);

  const userId = currentUser.uid;

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${userId}`);
      return res.data.sort((a, b) => a.orderIndex - b.orderIndex);
    },
  });

  useEffect(() => {
    if (tasks.length > 0) {
      setTasksState(tasks);
    }
  }, [tasks]);

 
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => axiosPublic.delete(`/tasks/${taskId}`),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries(["tasks", userId]);
      const previousTasks = queryClient.getQueryData(["tasks", userId]);
      queryClient.setQueryData(["tasks", userId], (oldTasks) =>
        oldTasks.filter((task) => task._id !== taskId)
      );
      return { previousTasks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks", userId], context.previousTasks);
      toast.error("Failed to delete task.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks", userId]);
      toast.success("Task deleted successfully!");
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (updatedTasks) => {
      await axiosPublic.put(`/tasks/reorder`, { tasks: updatedTasks });
    },
    onMutate: async (updatedTasks) => {
      await queryClient.cancelQueries(["tasks", userId]);
      const previousTasks = queryClient.getQueryData(["tasks", userId]);
      queryClient.setQueryData(["tasks", userId], updatedTasks);
      return { previousTasks };
    },
    onError: (_, __, context) => {
      toast.error("Failed to update task order");
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks", userId], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks", userId]);
    },
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    const tasksByCategory = {
      "To-Do": [],
      "In Progress": [],
      Done: [],
    };

    tasksState.forEach((task) => {
      tasksByCategory[task.category].push({ ...task });
    });

    const movedTaskIndex = tasksByCategory[source.droppableId].findIndex(
      (task) => task._id === draggableId
    );
    if (movedTaskIndex === -1) return;

    const [movedTask] = tasksByCategory[source.droppableId].splice(
      movedTaskIndex,
      1
    );

    movedTask.category = destination.droppableId;

    tasksByCategory[destination.droppableId].splice(
      destination.index,
      0,
      movedTask
    );

    const updatedTasks = [
      ...tasksByCategory["To-Do"].map((task, index) => ({
        ...task,
        orderIndex: index,
      })),
      ...tasksByCategory["In Progress"].map((task, index) => ({
        ...task,
        orderIndex: index,
      })),
      ...tasksByCategory["Done"].map((task, index) => ({
        ...task,
        orderIndex: index,
      })),
    ];

    console.log(updatedTasks);
    setTasksState(updatedTasks);
    reorderMutation.mutate(updatedTasks);
  };

  if (isLoading)
    return <p className="text-center text-gray-600">Loading tasks...</p>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 text-black">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-primary bg-opacity-20 p-4 rounded-lg shadow min-h-[300px] border border-gray-300"
              >
                <h2 className="text-lg font-semibold text-center mb-4">
                  {category}
                </h2>
                {tasksState
                  .filter((task) => task.category === category)
                  .map((task, index) => (
                    <Draggable
                      key={`${task._id}-${index}`}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border bg-gray-100 bg-opacity-50 backdrop-blur-lg p-3 rounded-lg shadow mb-2 flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-gray-600">
                              {task.description}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setIsFormOpen(true);
                                setSelectedTask(task);
                              }}
                              className="btn btn-outline text-blue-500 hover:text-blue-700"
                            >
                              <FaEdit className="text-lg" />
                            </button>
                            <button
                              onClick={() =>
                                deleteTaskMutation.mutate(task._id)
                              }
                              className="btn btn-outline text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="text-lg" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
      {isFormOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex justify-center items-center">
          <div className="bg-white bg-opacity-40 backdrop-blur-xl p-6 rounded-lg shadow-xl max-w-screen-sm mx-auto text-black shadow-white">
            <EditTaskForm
              task={selectedTask}
              onClose={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </DragDropContext>
  );
};

export default TaskList;
