import { create } from 'zustand';

type MessageCallback = (data: any) => void;

interface WebSocketStore {
  socket: WebSocket | null;
  isConnected: boolean;
  subscriptions: Set<string>; // thread IDs
  connect: () => void;
  disconnect: () => void;
  subscribeToThread: (threadId: string) => void;
  unsubscribeFromThread: (threadId: string) => void;
  sendMessage: (data: any) => void;
  onMessage: (cb: MessageCallback) => void;
}

const useWebSocketStore = create<WebSocketStore>((set, get) => {
  let messageCallback: MessageCallback = () => {};

  return {
    socket: null,
    isConnected: false,
    subscriptions: new Set(),

    connect: () => {
      if (get().socket && get().isConnected) return;

      const socket = new WebSocket(`wss://${process.env.NEXT_PUBLIC_DEV_SERVER}/ws`);

      socket.onopen = () => {
        console.log('WebSocket connected');
        set({ isConnected: true });

        // Resubscribe to existing threads
        get().subscriptions.forEach((threadId) =>
          socket.send(JSON.stringify({ action: 'subscribe', threadId }))
        );
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        messageCallback(data);
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected');
        set({ isConnected: false, socket: null });
      };

      set({ socket });
    },

    disconnect: () => {
      get().socket?.close();
      set({ socket: null, isConnected: false });
    },

    subscribeToThread: (threadId) => {
      const { socket, subscriptions } = get();
      if (!subscriptions.has(threadId)) {
        subscriptions.add(threadId);
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ action: 'subscribe', threadId }));
        }
        set({ subscriptions: new Set(subscriptions) }); // trigger update
      }
    },

    unsubscribeFromThread: (threadId) => {
      const { socket, subscriptions } = get();
      if (subscriptions.has(threadId)) {
        subscriptions.delete(threadId);
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ action: 'unsubscribe', threadId }));
        }
        set({ subscriptions: new Set(subscriptions) });
      }
    },

    sendMessage: (data) => {
      const { socket } = get();
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
      }
    },

    onMessage: (cb) => {
      messageCallback = cb;
    },
  };
});

export default useWebSocketStore;