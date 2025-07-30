import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import { NotificationRepository } from "~/server/repository/NotificationRepository";

export default defineEventHandler(async (event) => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: NotificationRepository = new NotificationRepository(apiClient);
    return await repository.findAll();
});
