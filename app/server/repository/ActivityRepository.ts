import type AuthenticatedApiClient from "~/server/clients/AuthenticatedApiClient";
import type { ActivityResponse } from "~/domain/activity/dto/ActivityResponse";
import { mapToActivityResponse } from "~/domain/activity/dto/ActivityResponse";

export class ActivityRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<ActivityResponse[]> {
        const activities = await this.apiClient.request<ActivityResponse[]>("/activities");
        return activities.map(value => mapToActivityResponse(value));
    }
}
