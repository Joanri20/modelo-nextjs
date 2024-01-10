import { NextRequest, NextResponse } from "next/server";

type Data = {
  name: string;
};

export async function GET(req: Request, res: Request) {
  console.log("Hola mundo");
  return NextResponse.json({ name: "Johm De" });
}
