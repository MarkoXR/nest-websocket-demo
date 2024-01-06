import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/in/message';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
  private readonly logger: Logger = new Logger(ChatGateway.name);

  constructor(private readonly chatService: ChatService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public afterInit(server: Server) {
    this.logger.log('Chat gateway Initialized!');
  }

  public handleConnection(socket: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${socket.id}`);
    socket.emit('status', `Successfully connected to chat namespace!`);
  }

  @SubscribeMessage('message')
  public async handleMessage(
    @MessageBody() { message }: MessageDto,
  ): Promise<string> {
    return this.chatService.handleMessage(message);
  }

  @SubscribeMessage('status')
  public async handleStatus(
    @ConnectedSocket() socket: Socket,
  ): Promise<string> {
    return `Your id is: ${socket.id}`;
  }
}
