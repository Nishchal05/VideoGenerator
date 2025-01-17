import { db } from "@/configs/db";
import { VIDEO_RAW_TABLE } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const email = url.searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const result = await db.select().from(VIDEO_RAW_TABLE).where(eq(VIDEO_RAW_TABLE.createdBy, email)).orderBy(desc(VIDEO_RAW_TABLE.id));

        return NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { videoId } = await req.json();
        
        if (!videoId) {
            return NextResponse.json({ error: "videoId is required" }, { status: 400 });
        }

        const result = await db
            .delete(VIDEO_RAW_TABLE)
            .where(eq(VIDEO_RAW_TABLE.videoId,videoId)); 

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Video deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}