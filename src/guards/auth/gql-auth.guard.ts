import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();

    // Handle both HTTP and WebSocket contexts
    let req = gqlContext.req;
    if (!req && gqlContext.connection) {
      req = gqlContext.connection.context;
    }
    // If user is already attached, allow access.
    if (req?.user) {
      return true;
    }

    // Try to extract token from different locations
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token);
      if (gqlContext.connection) {
        gqlContext.connection.context.user = payload;
        console.log('🔐 User authenticated (WebSocket):', payload);
      } else {
        req.user = payload;
        console.log('🔐 User authenticated (HTTP):', payload);
      }
      return true;
    } catch (error) {
      console.error('❌ Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractToken(req: any): string | null {
    // Check Authorization header
    const authHeader =
      req?.headers?.authorization || req?.headers?.Authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }

    // Check connection params for WebSocket
    if (req?.connectionParams?.authorization) {
      const rawToken = req.connectionParams.authorization;
      return rawToken.replace('Bearer ', '');
    }

    return null;
  }
}
