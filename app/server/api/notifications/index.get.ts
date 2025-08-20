import { z } from "zod";
import { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import { NotificationRepository } from "~~/server/repository/NotificationRepository";

export default defineEventHandler(async (event) => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: NotificationRepository = new NotificationRepository(apiClient);
    const validator = z.object({
        sinceId: z.string().optional().nullable().default(null),
    });
    const query = await getValidatedQuery(event, validator.parse);
    if (query.sinceId) {
        return await repository.findAllSinceId(query.sinceId);
    }
    return await repository.findAll();
});
