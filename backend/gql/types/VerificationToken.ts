import { extendType, intArg, objectType, stringArg } from 'nexus';

export const VerificationToken = objectType({
  name: 'VerificationToken',
  definition(t) {
    t.string('identifier');
    t.string('token');
    t.string('expires');
    t.int('id');
  },
});

export const Edge5 = objectType({
  name: 'Edge5',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: VerificationToken,
    });
  },
});

export const PageInfo5 = objectType({
  name: 'PageInfo5',
  definition(t) {
    t.string('endCursor');
    t.boolean('hasNextPage');
  },
});

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo5', { type: PageInfo5 });
    t.list.field('edges5', {
      type: Edge5,
    });
  },
});

export const vertokQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('Link', {
      type: 'Response',
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null;
        if (args.after) {
          queryResults = await ctx.prisma.verificationToken.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after,
            },
          });
        } else {
          queryResults = await ctx.prisma.verificationToken.findMany({
            take: args.first,
          });
        }
        if (queryResults.length > 0) {
          const lastLinkInResults = queryResults[queryResults.length - 1];
          const myCursor = lastLinkInResults.id;
          const secondQueryResults =
            await ctx.prisma.verificationToken.findMany({
              take: args.first,
              cursor: {
                id: myCursor,
              },
            });
          const result = {
            pageInfo5: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first,
            },
            edges5: queryResults.map((Link) => ({
              cursor: Link.id,
              node: Link,
            })),
          };
          return result;
        }
      },
    });
  },
});
