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

export const Edge4 = objectType({
  name: 'Edge4',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: User,
    });
  },
});

export const PageInfo4 = objectType({
  name: 'PageInfo4',
  definition(t) {
    t.string('endCursor');
    t.boolean('hasNextPage');
  },
});

export const Response4 = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo4', { type: PageInfo4 });
    t.list.field('edges4', {
      type: Edge4,
    });
  },
});

export const userQuery = extendType({
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
            pageInfo4: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first,
            },
            edges4: queryResults.map((Link) => ({
              cursor: Link.id,
              node: Link,
            })),
          };
          return result;
        }
        return {
          pageInfo4: {
            endCursor: null,
            hasNextPage: false,
          },
          edges4: [],
        };
      },
    });
  },
});
