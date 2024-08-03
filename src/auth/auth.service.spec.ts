import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are correct', async () => {
      const result = await service.validateUser('user1', 'password1');
      expect(result).toEqual({ userId: 1, username: 'user1' });
    });

    it('should return null if credentials are incorrect', async () => {
      const result = await service.validateUser('user1', 'wrongpassword');
      expect(result).toBeNull();
    });
  });
});