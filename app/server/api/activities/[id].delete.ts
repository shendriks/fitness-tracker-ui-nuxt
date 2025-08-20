import { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import { ActivityRepository } from "~~/server/repository/ActivityRepository";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id") as string;
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    return await repository.delete(id);
});
