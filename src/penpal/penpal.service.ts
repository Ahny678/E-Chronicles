import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PenpalService {
  constructor(private prismaService: PrismaService) {}
  async createPenRequest(senderId, receiverId) {
    if (!receiverId || typeof receiverId !== 'string') {
      throw new Error('Invalid receiverId');
    }
    if (senderId === receiverId) {
      throw new Error('You cannot send a request to yourself');
    }

    const currentReq = await this.prismaService.penpalRequest.findFirst({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });
    if (currentReq) {
      throw new Error('A request already exists between these users');
    }

    return this.prismaService.penpalRequest.create({
      data: { senderId, receiverId },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }
  async getMyPenPalRequests(userId: string) {
    return this.prismaService.penpalRequest.findMany({
      where: {
        receiverId: userId,
        status: 'PENDING',
      },
      include: {
        sender: true,
      },
    });
  }

  async deletePenPalRequest(ReqestId: string, userId: string) {
    await this.prismaService.penpalRequest.delete({
      where: {
        id: ReqestId, // Replace with the actual ID
      },
    });
  }

  async acceptPenPalRequest(RequestId, request) {
    // Check for existing connection (both directions)

    const { senderId, receiverId } = request;
    const existingConnection =
      await this.prismaService.penpalConnection.findFirst({
        where: {
          OR: [
            {
              user1Id: senderId,
              user2Id: receiverId,
            },
            {
              user1Id: receiverId,
              user2Id: senderId,
            },
          ],
        },
      });

    if (existingConnection) {
      throw new Error('One of the users already have a connection.');
    }
    this.prismaService.penpalRequest.update({
      where: { id: RequestId },
      data: { status: 'ACCEPTED' },
    });

    await this.prismaService.penpalConnection.create({
      data: {
        user1Id: request!.senderId,
        user2Id: request!.receiverId,
      },
    });
    return { senderId, receiverId };
  }
}
