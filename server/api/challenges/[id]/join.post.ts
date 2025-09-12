import { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import { ChallengeRepository } from "~~/server/repository/ChallengeRepository";

export default defineEventHandler(async (event) => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ChallengeRepository = new ChallengeRepository(apiClient);
    const id = getRouterParam(event, "id");
    if (!id) {
        return createError({
            statusCode: 400,
            statusMessage: "Bad request",
        });
    }
    return await repository.join(id);
});
