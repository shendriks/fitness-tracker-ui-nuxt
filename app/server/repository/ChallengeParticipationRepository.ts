import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";

import type { ChallengeParticipationResponse } from "~/dto/challenge/ChallengeParticipationResponse";
import { ChallengeParticipationResponseSchema } from "~/dto/challenge/ChallengeParticipationResponse";

export class ChallengeParticipationRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<ChallengeParticipationResponse[]> {
        const challenges = await this.apiClient.request<ChallengeParticipationResponse[]>(
            "/challenge-participations");
        return challenges.map(value => ChallengeParticipationResponseSchema.parse(value));
    }
}
