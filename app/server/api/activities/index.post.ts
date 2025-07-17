import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import { ActivityRepository } from "~/server/repository/ActivityRepository";
import { ActivityCreateRequestSchema } from "~/domain/activity/dto/ActivityCreateRequest";

export default defineEventHandler(async (event) => {
    const apiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    const activity = await readValidatedBody(event, ActivityCreateRequestSchema.parse);
    return await repository.create(activity);
});
