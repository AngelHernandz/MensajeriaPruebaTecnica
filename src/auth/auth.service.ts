import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private users = [
        { userId: 1, username: 'user1', password: 'password1' },
        { userId: 2, username: 'user2', password: 'password2' },
      ];
    
      async validateUser(username: string, password: string): Promise<any> {
        const user = this.users.find(user => user.username === username && user.password === password);
        if (user) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
}
