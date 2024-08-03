import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      validateUser: jest.fn().mockResolvedValue({ username: 'user1' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return success message and user if credentials are correct', async () => {
      const result = await controller.login({ username: 'user1', password: 'password1' });
      expect(result).toEqual({ message: 'Login successful', user: { username: 'user1' } });
    });

    it('should return invalid credentials message if credentials are incorrect', async () => {
      (service.validateUser as jest.Mock).mockResolvedValue(null);
      const result = await controller.login({ username: 'user1', password: 'wrongpassword' });
      expect(result).toEqual({ message: 'Invalid credentials' });
    });
  });
});
