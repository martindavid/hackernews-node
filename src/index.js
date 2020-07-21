const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (parent, args, ctx) => {
      return ctx.prisma.link.findMany();
    },
    link: (parent, args, ctx) => {
      console.log("Args", args);
      return ctx.prisma.link.findOne({
        where: {
          id: parseInt(args.id),
        },
      });
    },
  },
  Mutation: {
    post: (parent, args, ctx) => {
      const newLink = ctx.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    updateLink: (parent, args) => {
      const link = links.filter((link) => link.id === args.id)[0];
      if (link) {
        link.url = args.url;
        link.description = args.description;
      }
      return link;
    },
  },
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
