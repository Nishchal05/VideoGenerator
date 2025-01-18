import Cors from 'cors';
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
const cors = Cors({
  methods: ['POST', 'OPTIONS'],
  origin: 'https://video-generator-dusky.vercel.app',
  credentials: true,
});
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(req) {
  await runMiddleware(req, res, cors);

  try {
    const { user } = await req.json();
    if (!user || !user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({
        success: false,
        message: "User information is incomplete.",
      }, { status: 400 }); 
    }
    const data = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
    
    if (data.length > 0) {
      return NextResponse.json({
        success: true,
        message: "User already exists.",
        data: data,
      });
    }
    const result = await db.insert(USER_TABLE).values({
      name: user.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    }).returning(USER_TABLE);

    return NextResponse.json({
      success: true,
      message: "User added successfully.",
      data: result,
    }, { status: 201 }); 
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing the request.",
      error: error.toString(),
    }, { status: 500 }); 
  }
}
export async function OPTIONS(req) {
  await runMiddleware(req, res, cors);
  return NextResponse.json({}, { status: 200 });
}
