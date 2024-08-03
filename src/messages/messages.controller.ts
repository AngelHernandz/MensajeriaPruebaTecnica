import { Controller, Post, Get, Patch, Body, Param, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Endpoint para crear un mensaje
  @Post()
  async createMessage(@Body() createMessageDto: { sender: string, receiver: string, content: string }) {
    return this.messagesService.createMessage(createMessageDto);
  }

  // Endpoint para obtener mensajes, con opciones de filtrado
  @Get()
  async getMessages(
    @Query('userId') userId: string,
    @Query('read') read?: boolean,
    @Query('isStarred') isStarred?: boolean,
  ) {
    return this.messagesService.findMessages(userId, read, isStarred);
  }

  // Endpoint para marcar un mensaje como leído
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(id);
  }
}
