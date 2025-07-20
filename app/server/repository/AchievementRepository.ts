import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import type { AchievementResponse } from "~/domain/achievement/dto/AchievementResponse";
import { AchievementResponseSchema } from "~/domain/achievement/dto/AchievementResponse";

export class AchievementRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<AchievementResponse[]> {
        const achievements = await this.apiClient.request<AchievementResponse[]>("/achievements");
        return achievements.map(value => AchievementResponseSchema.parse(value));
    }
}
