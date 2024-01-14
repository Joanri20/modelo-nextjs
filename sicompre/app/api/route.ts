import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next/types";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const server = new ApolloServer({
    typeDefs: [],
    resolvers: [],
  });
  console.log("Hello");
  await server.start();
  await server.createHandler({
    path: "/api/route",
  })(req, res);
  console.log("Hola mundo");
  //return NextResponse.json({ name: "Johm Dey" });
}
