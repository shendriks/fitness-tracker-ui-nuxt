import { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import { MilestoneRepository } from "~~/server/repository/MilestoneRepository";

export default defineEventHandler(async (event) => {
    const apiClient: AuthenticatedApiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: MilestoneRepository = new MilestoneRepository(apiClient);
    return await repository.findAll();
});
