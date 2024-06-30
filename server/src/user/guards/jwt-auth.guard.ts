import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private blacklistedTokens: Set<string> = new Set(); // Example blacklist storage

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies.jwt;

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    if (this.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Method to check if token is blacklisted
  private isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  // Method to add token to blacklist (you can call this method when logging out)
  public blacklistToken(token: string): void {
    this.blacklistedTokens.add(token);
  }
}
