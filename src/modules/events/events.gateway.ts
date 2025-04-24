// src/modules/events/events.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // you can customize port, namespace, etc.
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: string): string {
    return `pong: ${data}`;
  }

  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }
}
