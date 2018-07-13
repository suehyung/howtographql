const { GraphQLServer } = require('graphql-yoga')

// temporarily define in memory since no database set up yet
let links = [{
  id: 'link-0',
  description: 'Fullstack tutorial for GraphQL',
  url: 'www.howtographql.com'
}]

//1
let idCount = links.length

//2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: () => Link,
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },

    updateLink: (root, args) => {
      const link = {
        id: `link-${args.id}`,
        description: args.description,
        url: args.url,
      }
      links.splice(link.id, 1, link)
      return link
    },

    deleteLink: (root, args) => {
      links.splice(args.id, 1)
      console.log('Item ${args.id} deleted')
      return
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))