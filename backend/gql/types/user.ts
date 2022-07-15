import { extendType, intArg, objectType, stringArg } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('role');
    t.string('email');
    t.string('emailVerified');
    t.string('image');
    t.string('createdAt');
    t.string('updatedAt');
    t.string('posts');
    t.string('accounts');
    t.string('sessions');
  },
});

export const Edge5 = objectType({
  name: 'Edge5',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: User,
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

export const Response5 = objectType({
  name: 'Response5',
  definition(t) {
    t.field('pageInfo5', { type: PageInfo5 });
    t.list.field('edges', {
      type: Edge5,
    });
  },
});

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('Link5', {
      type: 'Response5',
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null;
        if (args.after) {
          queryResults = await ctx.prisma.user.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after,
            },
          });
        } else {
          queryResults = await ctx.prisma.user.findMany({
            take: args.first,
          });
        }
        if (queryResults.length > 0) {
          const lastLinkInResults = queryResults[queryResults.length - 1];
          const myCursor = lastLinkInResults.id;
          const secondQueryResults = await ctx.prisma.user.findMany({
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
        return {
          pageInfo5: {
            endCursor: null,
            hasNextPage: false,
          },
          edges5: [],
        };
      },
    });
  },
});
