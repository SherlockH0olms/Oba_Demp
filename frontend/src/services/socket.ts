import { io, Socket } from 'socket.io-client';
import type { Feedback, CallCenterTicket, Survey } from '../types';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
    private socket: Socket | null = null;
    private listeners: Map<string, Set<Function>> = new Map();

    connect() {
        if (this.socket?.connected) return;

        this.socket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        this.socket.on('connect', () => {
            console.log('🔌 Connected to WebSocket server');
        });

        this.socket.on('disconnect', () => {
            console.log('❌ Disconnected from WebSocket server');
        });

        // Set up event forwarding
        this.socket.on('new_feedback', (data: Feedback) => {
            this.emit('new_feedback', data);
        });

        this.socket.on('feedback_updated', (data: Feedback) => {
            this.emit('feedback_updated', data);
        });

        this.socket.on('new_ticket', (data: CallCenterTicket) => {
            this.emit('new_ticket', data);
        });

        this.socket.on('ticket_updated', (data: CallCenterTicket) => {
            this.emit('ticket_updated', data);
        });

        this.socket.on('call_center_alert', (data: { type: string; feedback: Feedback }) => {
            this.emit('call_center_alert', data);
        });

        this.socket.on('survey_activated', (data: Survey) => {
            this.emit('survey_activated', data);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    on(event: string, callback: Function) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);

        return () => {
            this.listeners.get(event)?.delete(callback);
        };
    }

    off(event: string, callback: Function) {
        this.listeners.get(event)?.delete(callback);
    }

    private emit(event: string, data: unknown) {
        this.listeners.get(event)?.forEach((callback) => callback(data));
    }

    isConnected() {
        return this.socket?.connected ?? false;
    }
}

export const socketService = new SocketService();
export default socketService;
