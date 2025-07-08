import type FitnessTrackerApiClient from "~/server/clients/fitness-tracker-api-client";
import { createFitnessTrackerApiClient } from "~/server/clients/fitness-tracker-api-client";

export default defineEventHandler(async (event) => {
    const client: FitnessTrackerApiClient = createFitnessTrackerApiClient(event);
    const activities = await client.fetchActivities();
    return activities;
});
