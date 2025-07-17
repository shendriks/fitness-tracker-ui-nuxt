import { ActivityRepository } from "~/server/repository/ActivityRepository";
import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id") as string;
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    return await repository.findById(id);
});
