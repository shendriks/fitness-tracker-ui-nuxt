import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import type { MilestoneResponse } from "~/dto/milestone/MilestoneResponse";
import { MilestoneResponseSchema } from "~/dto/milestone/MilestoneResponse";

export class MilestoneRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<MilestoneResponse[]> {
        const challenges = await this.apiClient.request<MilestoneResponse[]>("/milestones");
        return challenges.map(value => MilestoneResponseSchema.parse(value));
    }
}
