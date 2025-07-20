import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import type { ChallengeResponse } from "~/domain/challenge/dto/ChallengeResponse";
import { ChallengeResponseSchema } from "~/domain/challenge/dto/ChallengeResponse";

export class ChallengeRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<ChallengeResponse[]> {
        const challenges = await this.apiClient.request<ChallengeResponse[]>("/challenges");
        return challenges.map(value => ChallengeResponseSchema.parse(value));
    }
}
