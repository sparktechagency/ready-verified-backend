import cron from "node-cron";
import { AssessmentService } from "../app/modules/assessment/assessment.service";



export const cleanup = () => {
    cron.schedule("*/5 * * * *",async () => {
        await AssessmentService.sendZoomMeetingLinkToAllAssessments();
    });
};