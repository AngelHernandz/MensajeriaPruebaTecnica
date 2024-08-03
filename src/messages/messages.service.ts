import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async createMessage(createMessageDto: { sender: string, receiver: string, content: string }): Promise<Message> {
    const newMessage = new this.messageModel(createMessageDto);
    return newMessage.save();
  }

  async findMessages(userId: string, readStatus?: boolean, isStarred?: boolean) {
    const query: any = { $or: [{ sender: userId }, { receiver: userId }] };

    if (readStatus !== undefined) {
      query.read = readStatus;
    }

    if (isStarred !== undefined) {
      query.isStarred = isStarred;
    }

    return this.messageModel.find(query).exec();
  }

  async markAsRead(id: string) {
    return this.messageModel.findByIdAndUpdate(id, { read: true }, { new: true }).exec();
  }
}
