import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [JwtService],
      useFactory: (jwtService: JwtService): ApolloDriverConfig => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        playground: false, // Altair replaces this
        installSubscriptionHandlers: true,
        csrfPrevention: {
          // Allow requests with these headers:
          requestHeaders: [
            'Content-Type',
            'X-Apollo-Operation-Name',
            'Apollo-Require-Preflight',
          ],
        },

        subscriptions: {
          'graphql-ws': {
            onConnect: async (ctx) => {
              // console.log('📡 ConnectionParams:', ctx.connectionParams);
              const rawToken =
                ctx.connectionParams?.authorization ||
                ctx.connectionParams?.Authorization;

              if (!rawToken || typeof rawToken !== 'string') {
                throw new Error('No token provided');
              }

              const token = rawToken.replace('Bearer ', '');

              try {
                const payload = jwtService.verify(token);
                return {
                  user: payload,
                  authorization: rawToken, // optional
                };
              } catch {
                throw new Error('Invalid or expired token');
              }
            },
          },
        },

        context: ({ req, connection }) => {
          if (connection) {
            // For subscriptions/web sockets
            return {
              req: {
                user: connection.context?.user,
                headers: connection.context?.headers || {},
                connectionParams: connection.context, // Make sure connectionParams are available
                ip:
                  connection.context?.ip ||
                  req?.ip ||
                  req?.connection?.remoteAddress,
              },
            };
          }
          // For regular queries/mutations
          return { req };
        },
      }),
    }),
  ],
})
export class GraphqlConfigModule {}
