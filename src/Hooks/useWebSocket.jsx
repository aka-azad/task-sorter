import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const SOCKET_URL = "ws://localhost:3000";

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(SOCKET_URL);

   

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Invalidate the tasks query to refetch data
      if (["TASK_ADDED", "TASK_UPDATED", "TASK_DELETED", "TASKS_REORDERED"].includes(data.type)) {
        queryClient.invalidateQueries(["tasks"]);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [queryClient]);

  return { socket };
};

export default useWebSocket;
