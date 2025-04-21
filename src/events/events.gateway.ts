import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UseGuards, Logger } from '@nestjs/common'; // ✅ FIXED
import { WsJwtGuard } from '../modules/auth/ws-jwt.guard';
import { Socket } from 'socket.io';

interface AuthenticatedSocket extends Socket {
  user: {
    userId: number;
    username: string;
  };
}

@WebSocketGateway({ cors: true })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('EventsGateway');

  afterInit() {
    this.logger.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('secureMessage')
  handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { username } = client.user;
    this.logger.log(`User ${username} sent message: ${data}`);
    client.emit('secureResponse', { msg: `Hello ${username}` });
  }
}
