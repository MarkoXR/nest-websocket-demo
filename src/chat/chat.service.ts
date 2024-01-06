import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  public async handleMessage(message: string): Promise<string> {
    return `You said: ${message}`;
  }
}
