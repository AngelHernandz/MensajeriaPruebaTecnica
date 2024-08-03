import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const mockMessagesService = {
      createMessage: jest.fn().mockResolvedValue({}),
      findMessages: jest.fn().mockResolvedValue([]),
      markAsRead: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessagesService,
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createMessage', () => {
    it('should create and return a new message', async () => {
      const dto = { sender: 'user1', receiver: 'user2', content: 'Hello' };
      const result = await controller.createMessage(dto);
      expect(result).toEqual({});
    });
  });

  describe('getMessages', () => {
    it('should return messages based on query', async () => {
      const result = await controller.getMessages('user1');
      expect(result).toEqual([]);
    });
  });

  describe('markAsRead', () => {
    it('should mark a message as read', async () => {
      const result = await controller.markAsRead('some-id');
      expect(result).toEqual({});
    });
  });
});
