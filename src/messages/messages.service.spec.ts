import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

describe('MessagesService', () => {
  let service: MessagesService;
  let model: Model<Message>;

  beforeEach(async () => {
    const mockMessageModel = {
      new: jest.fn().mockResolvedValue({ save: jest.fn().mockResolvedValue({}) }),
      find: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([]),
      findByIdAndUpdate: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken('Message'),
          useValue: mockMessageModel,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    model = module.get<Model<Message>>(getModelToken('Message'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMessage', () => {
    it('should create and return a new message', async () => {
      const dto = { sender: 'user1', receiver: 'user2', content: 'Hello' };
      const result = await service.createMessage(dto);
      expect(result).toEqual({});
    });
  });

  describe('findMessages', () => {
    it('should return messages based on query', async () => {
      const result = await service.findMessages('user1');
      expect(result).toEqual([]);
    });
  });

  describe('markAsRead', () => {
    it('should mark a message as read', async () => {
      const result = await service.markAsRead('some-id');
      expect(result).toEqual({});
    });
  });
});
