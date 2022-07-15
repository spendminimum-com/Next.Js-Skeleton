import { extendType, intArg, objectType, stringArg } from 'nexus';

export const Session = objectType({
  name: 'Session',
  definition(t) {
    t.string('id');
    t.string('sessionToken');
    t.string('userId');
    t.string('expires');
    t.string('user');
  },
});

export const Edge3 = objectType({
  name: 'Edge3',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: Session,
    });
  },
});

export const PageInfo3 = objectType({
  name: 'PageInfo3',
  definition(t) {
    t.string('endCursor');
    t.boolean('hasNextPage');
  },
});

export const Response3 = objectType({
  name: 'Response3',
  definition(t) {
    t.field('pageInfo3', { type: PageInfo3 });
    t.list.field('edges3', {
      type: Edge3,
    });
  },
});

export const sessionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('Link3', {
      type: 'Response3',
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null;
        if (args.after) {
          queryResults = await ctx.prisma.session.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after,
            },
          });
        } else {
          queryResults = await ctx.prisma.session.findMany({
            take: args.first,
          });
        }
        if (queryResults.length > 0) {
          const lastLinkInResults = queryResults[queryResults.length - 1];
          const myCursor = lastLinkInResults.id;
          const secondQueryResults = await ctx.prisma.session.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
          });
          const result = {
            pageInfo3: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first,
            },
            edges: queryResults.map((Link) => ({
              cursor: Link.id,
              node: Link,
            })),
          };
          return result;
        }
        return {
          pageInfo3: {
            endCursor: null,
            hasNextPage: false,
          },
          edges3: [],
        };
      },
    });
  },
});
