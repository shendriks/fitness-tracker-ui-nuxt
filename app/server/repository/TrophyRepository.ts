import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import type { TrophyResponse } from "~/dto/trophy/TrophyResponse";
import { TrophyResponseSchema } from "~/dto/trophy/TrophyResponse";

export class TrophyRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {
    }

    async findAll(): Promise<TrophyResponse[]> {
        const challenges = await this.apiClient.request<TrophyResponse[]>("/trophies");
        return challenges.map(value => TrophyResponseSchema.parse(value));
    }
}
