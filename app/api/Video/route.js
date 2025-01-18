import { db } from "@/configs/db";
import { VIDEO_RAW_TABLE } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
function setCORSHeaders(response) {
    response.headers.set('Access-Control-Allow-Origin', '*'); 
    response.headers.set('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
}

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const email = url.searchParams.get("email");

        if (!email) {
            const response = NextResponse.json({ error: "Email is required" }, { status: 400 });
            return setCORSHeaders(response);
        }

        const result = await db.select()
            .from(VIDEO_RAW_TABLE)
            .where(eq(VIDEO_RAW_TABLE.createdBy, email))
            .orderBy(desc(VIDEO_RAW_TABLE.id));

        if (result.length === 0) {
            const response = NextResponse.json({ error: "No videos found for the given email" }, { status: 404 });
            return setCORSHeaders(response);
        }

        const response = NextResponse.json({ data: result }, { status: 200 });
        return setCORSHeaders(response);
    } catch (error) {
        console.error('Error during GET request:', error);
        const response = NextResponse.json({ error: "Server error" }, { status: 500 });
        return setCORSHeaders(response);
    }
}

export async function DELETE(req) {
    try {
        const { videoId } = await req.json();

        if (!videoId) {
            const response = NextResponse.json({ error: "videoId is required" }, { status: 400 });
            return setCORSHeaders(response);
        }

        const result = await db
            .delete(VIDEO_RAW_TABLE)
            .where(eq(VIDEO_RAW_TABLE.videoId, videoId));

        if (result.rowCount === 0) {
            const response = NextResponse.json({ error: "Video not found" }, { status: 404 });
            return setCORSHeaders(response);
        }

        const response = NextResponse.json({ message: "Video deleted successfully" }, { status: 200 });
        return setCORSHeaders(response);
    } catch (error) {
        console.error('Error during DELETE request:', error);
        const response = NextResponse.json({ error: "Server error" }, { status: 500 });
        return setCORSHeaders(response);
    }
}

// Handle OPTIONS preflight request for CORS
export async function OPTIONS() {
    const res = new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins
            'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
    return setCORSHeaders(res);
}
