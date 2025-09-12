import type { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import type { ChallengeResponse } from "~~/dto/challenge/ChallengeResponse";
import { ChallengeResponseSchema } from "~~/dto/challenge/ChallengeResponse";

export class ChallengeRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<ChallengeResponse[]> {
        const challenges = await this.apiClient.request<ChallengeResponse[]>("/challenges");
        return challenges.map(value => ChallengeResponseSchema.parse(value));
    }

    async join(id: string): Promise<void> {
        await this.apiClient.request<unknown>(`/challenges/${id}/join`, "POST");
    }

    async leave(id: string): Promise<void> {
        await this.apiClient.request<unknown>(`/challenges/${id}/leave`, "POST");
    }
}
