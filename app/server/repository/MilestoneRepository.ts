import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import type { MilestoneResponse } from "~/domain/milestone/dto/MilestoneResponse";
import { MilestoneResponseSchema } from "~/domain/milestone/dto/MilestoneResponse";

export class MilestoneRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<MilestoneResponse[]> {
        const challenges = await this.apiClient.request<MilestoneResponse[]>("/milestones");
        return challenges.map(value => MilestoneResponseSchema.parse(value));
    }
}
