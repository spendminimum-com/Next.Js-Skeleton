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

export const Edge6 = objectType({
  name: 'Edge6',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: VerificationToken,
    });
  },
});

export const PageInfo6 = objectType({
  name: 'PageInfo6',
  definition(t) {
    t.string('endCursor');
    t.boolean('hasNextPage');
  },
});

export const Response6 = objectType({
  name: 'Response6',
  definition(t) {
    t.field('pageInfo6', { type: PageInfo6 });
    t.list.field('edges6', {
      type: Edge6,
    });
  },
});

export const vertokQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('Link6', {
      type: 'Response6',
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
            pageInfo6: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first,
            },
            edges6: queryResults.map((Link) => ({
              cursor: Link.id,
              node: Link,
            })),
          };
          return result;
        }
        return {
          pageInfo6: {
            endCursor: null,
            hasNextPage: false,
          },
          edges6: [],
        };
      },
    });
  },
});
