import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const entryId = request.params.id;

    const entry = await this.prisma.diaryEntry.findUnique({
      where: { id: entryId },
    });
    if (!entry || entry.userId !== user.id) {
      // throw new ForbiddenException('You do not own this entry.');
      return false;
    }
    return true;
  }
}
