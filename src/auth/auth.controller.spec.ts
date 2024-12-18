import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ResponseService } from '../response/response.service';
import { Logger } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
  };

  const mockResponseService = {
    success: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: ResponseService,
          useValue: mockResponseService,
        },
        Logger,
      ],
    }).compile();

  });

  describe('signup', () => {
    it('should successfully sign up a user', async () => {
      const signUpDto: SignUpDto = {
        name: 'John',
        email: 'john@example.com',
        password: '1234abcd',
      };
      const result = { message: { message: 'User added successfully!' }, status: true };

      mockAuthService.signUp.mockResolvedValue(result);

      const response = await authController.signup(signUpDto);
      expect(response).toEqual(result);

      expect(mockAuthService.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('signin', () => {
    it('should successfully sign in a user', async () => {
      const signInDto: SignInDto = {
        email: 'john@example.com',
        password: '1234abcd',
      };
      const result = {
        message: { message: 'User validated successfully!' },
        status: true,
        token: 'token123',
      };

      mockAuthService.signIn.mockResolvedValue(result);

      const response = await authController.signIn(signInDto);
      expect(response).toEqual(result);

      expect(mockAuthService.signIn).toHaveBeenCalledWith(signInDto);
    });
  });
});
