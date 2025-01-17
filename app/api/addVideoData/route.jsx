import { db } from "@/configs/db";
import { VIDEO_RAW_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"; 
export async function POST(req) {
  try {
    const { videoId, useremail } = await req.json();

    const response = await db.insert(VIDEO_RAW_TABLE).values({
      videoId: videoId,
      createdBy: useremail,
    }).returning(VIDEO_RAW_TABLE); 
    
    return NextResponse.json({ response: response });
  } catch (error) {
    console.error('Error during video data insertion:', error);
    return NextResponse.json({ error: 'An error occurred on the server' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { videoId, videoData } = await req.json();

    const response = await db.update(VIDEO_RAW_TABLE)
      .set({ videoData: videoData })
      .where(eq(VIDEO_RAW_TABLE.videoId, videoId))
      .returning(VIDEO_RAW_TABLE);

    return NextResponse.json({ response: response });
  } catch (error) {
    console.error('Error during video data update:', error);
    return NextResponse.json({ error: 'An error occurred while updating video data' }, { status: 500 });
  }
}
export async function GET(req) {
    try{
        const url = new URL(req.url);
    const videoId = url.searchParams.get("videoId");
    const result = await db
    .select()
    .from(VIDEO_RAW_TABLE)
    .where(eq(VIDEO_RAW_TABLE.videoId, videoId));
    return NextResponse.json(result);
    }catch(error){
        console.log(error);
    }
    
}