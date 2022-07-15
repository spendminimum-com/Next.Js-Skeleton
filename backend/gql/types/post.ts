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

export const Edge4 = objectType({
  name: 'Edge4',
  definition(t) {
    t.string('cursor');
    t.field('node', {
      type: Post,
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
  name: 'Response4',
  definition(t) {
    t.field('pageInfo4', { type: PageInfo4 });
    t.list.field('edges4', {
      type: Edge4,
    });
  },
});

export const postQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('Link4', {
      type: 'Response4',
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
            cursor: { id: args.after },
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
