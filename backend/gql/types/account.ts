import { extendType, intArg, objectType, stringArg } from 'nexus';

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.string('id');
    t.string('userId');
    t.string('type');
    t.string('provider');
    t.string('providerAccountId');
    t.string('refresh_token');
    t.string('access_token');
    t.string('expires_at');
    t.string('token_type');
    t.string('scope');
    t.string('alliance_code');
    t.string('id_token');
    t.string('session_state');
    t.string('oauth_token_secret');
    t.string('oauth_token');
  },
});

export const Edge2 = objectType({
  name: 'Edge2',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: Account,
    });
  },
});

export const PageInfo2 = objectType({
  name: 'PageInfo2',
  definition(t) {
    t.string('endCursor');
    t.boolean('hasNextPage');
  },
});

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo2', { type: PageInfo2 });
    t.list.field('edges2', {
      type: Edge2,
    });
  },
});

export const accountQuery = extendType({
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
          queryResults = await ctx.prisma.account.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after,
            },
          });
        } else {
          queryResults = await ctx.prisma.account.findMany({
            take: args.first,
          });
        }
        if (queryResults.length > 0) {
          const lastLinkInResults = queryResults[queryResults.length - 1];
          const myCursor = lastLinkInResults.id;
          const secondQueryResults = await ctx.prisma.account.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
          });
          const result = {
            pageInfo2: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first,
            },
            edges2: queryResults.map((Link) => ({
              cursor: Link.id,
              node: Link,
            })),
          };
          return result;
        }
        return {
          pageInfo2: {
            endCursor: null,
            hasNextPage: false,
          },
          edges2: [],
        };
      },
    });
  },
});
