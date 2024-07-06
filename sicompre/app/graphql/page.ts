import { GlobalTypes } from "@/graphql/back/types";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next/types";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("Hello");
  const server = new ApolloServer({
    typeDefs: [...GlobalTypes],
    resolvers: [],
  });

  await server.start();
  await server.createHandler({
    path: "/api",
  })(req, res);
  console.log("Hola mundo");
  //return NextResponse.json({ name: "Johm Dey" });
}
