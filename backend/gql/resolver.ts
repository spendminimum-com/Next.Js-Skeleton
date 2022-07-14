export const resolvers = {
  Query: {
    Post: async (_parent, _args, context) =>
      await context.prisma.post.findMany(),
    Account: async (_parent, _args, context) =>
      await context.prisma.account.findMany(),
    Session: async (_parent, _args, context) =>
      await context.prisma.session.findMany(),
    User: async (_parent, _args, context) =>
      await context.prisma.User.findMany(),
    // VerificationToken: async (_parent, _args, context) =>
    //   await context.prisma.VerificationToken.findMany(),
  },
};
