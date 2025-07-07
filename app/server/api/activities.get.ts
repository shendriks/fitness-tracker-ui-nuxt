import type FitnessTrackerApiClient from "~/server/clients/fitness-tracker-api-client";
import { createFitnessTrackerApiClient } from "~/server/clients/fitness-tracker-api-client";

export default defineEventHandler(async (event) => {
    // const session = await getUserSession(event);
    // console.log("YO: ", session);
    const client: FitnessTrackerApiClient = createFitnessTrackerApiClient(event);
    const activities = await client.request("/activities");
    return {
        activities,
    };
});
