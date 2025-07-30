import { ActivityRepository } from "~/server/repository/ActivityRepository";
import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import { ActivityCreateRequestSchema } from "~/dto/activity/ActivityCreateRequest";
import { ActivityUpdateRequestSchema } from "~/dto/activity/ActivityUpdateRequest";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id") as string;
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    const activity = await readValidatedBody(event, ActivityUpdateRequestSchema.parse);

    return await repository.update(id, activity);
});
