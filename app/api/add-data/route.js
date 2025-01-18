import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
export async function POST(req) {
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
      }, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',  
          'Access-Control-Allow-Methods': 'POST, OPTIONS',  
          'Access-Control-Allow-Headers': 'Content-Type', 
        }
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
    }, {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing the request.",
      error: error.toString(),
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}
export async function OPTIONS(req) {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
