import { GenerateAIVideoDataModal } from "@/configs/AiModal";
import { inngest } from "./client";
import { VIDEO_RAW_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { getServices, renderMediaOnCloudrun } from "@remotion/cloudrun/client";
export const GenerateAIVideoData = inngest.createFunction(
    { id: "generator-ai-video-data" },
    { event: 'ai/generate-video-data' },
    async ({ event, step }) => {
      const { prompt, videoId } = event.data;
      
      // Generate video data from AI
      const generateVideodata = await step.run('Generate AI video Data', async () => {
        try {
          const result = await GenerateAIVideoDataModal.sendMessage(prompt);
          console.log("AI Response:", result.response.text());
          return JSON.parse(result.response.text());
        } catch (error) {
          console.error("Error generating AI video data:", error);
          throw new Error("Failed to generate AI video data");
        }
      });
  
      // Update the video record in the database
      const updateRecord = await step.run('Update Record using videoId', async () => {
        try {
          const result = await db.update(VIDEO_RAW_TABLE).set({
            videoData: generateVideodata,
            status:'active'
          }).where(eq(VIDEO_RAW_TABLE.videoId, videoId)).returning(VIDEO_RAW_TABLE);
          console.log("Updated Record:", result);
          return result;
        } catch (error) {
          console.error("Error updating record:", error);
          throw new Error("Failed to update video record");
        }
      });
  
      return updateRecord;
    }
  );
  
  // export const rendercloudvideo=inngest.createFunction({id:'render-video'},
  //   {event:'render/promo-video'},
  //   async({event,step})=>{
  //     const {videoFrames}=event.data;
  //     const RenderVideo=await step.run('Render Promo Video using cloud run',async()=>{
  //       const services = await getServices({
  //         region: "us-east1",
  //         compatibleOnly: true,
  //       });
         
  //       const serviceName = services[0].serviceName;
  //       const result = await renderMediaOnCloudrun({
  //         serviceName,
  //         region: "us-east1",
  //         serveUrl: url,
  //         composition: "HelloWorld",
  //         inputProps: {},
  //         codec: "h264",
  //         updateRenderProgress,
  //       });
  //     })
  //   })
  