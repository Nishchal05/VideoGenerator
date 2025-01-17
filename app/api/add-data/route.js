import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { user } = await req.json();
    
    // Check if user object is properly received
    if (!user || !user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({
        success: false,
        message: "User information is incomplete.",
      }, { status: 400 });  // Bad Request
    }
    
    // Check if the user already exists in the database
    const data = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
    
    if (data.length > 0) {
      return NextResponse.json({
        success: true,
        message: "User already exists.",
        data: data,
      });
    }

    // Insert new user if not found
    const result = await db.insert(USER_TABLE).values({
      name: user.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    }).returning(USER_TABLE);

    return NextResponse.json({
      success: true,
      message: "User added successfully.",
      data: result,
    }, { status: 201 });  // Created
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing the request.",
      error: error.toString(),
    }, { status: 500 });  // Internal Server Error
  }
}
