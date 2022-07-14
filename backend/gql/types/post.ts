import { extendType, intArg, objectType, stringArg } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.string('ptitle');
    t.string('pbody');
    t.string('psdes');
    t.string('pimg');
    t.string('content');
    t.boolean('published');
    t.string('authorId');
    t.string('author');
    t.string('postid');
  },
});

export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: Post,
    });
  },
});

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('endCursor');
    t.boolean('hasNextPage');
  },
});

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo });
    t.list.field('edges', {
      type: Edge,
    });
  },
});

export const postQuery = extendType({
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
          queryResults = await ctx.prisma.post.findMany({
            take: args.first,
            skip: 1,
            cursor: {
              id: args.after,
            },
          });
        } else {
          queryResults = await ctx.prisma.post.findMany({
            take: args.first,
          });
        }
        if (queryResults.length > 0) {
          const lastLinkInResults = queryResults[queryResults.length - 1];
          const myCursor = lastLinkInResults.id;
          const secondQueryResults = await ctx.prisma.post.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
          });
          const result = {
            pageInfo: {
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
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        };
      },
    });
  },
});
