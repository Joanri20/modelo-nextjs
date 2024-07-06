import graphql_ from "graphql/index.js";
import graphqlTools from "graphql-tools";

const { graphql } = graphql_;
const { makeExecutableSchema } = graphqlTools;

const typeDefs = `
type Query {
   as: [A]
}

type A {
   x: Int,
   y: Int
}
`;
const schema = makeExecutableSchema({ typeDefs });

graphql(schema, "{ as { x, y } }").then(console.log);
