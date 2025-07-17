import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import type { ActivityCountResponse } from "~/domain/activity/dto/ActivityCountResponse";
import { mapToActivityCountResponse } from "~/domain/activity/dto/ActivityCountResponse";
import type { ActivityResponse } from "~/domain/activity/dto/ActivityResponse";
import { mapToActivityResponse } from "~/domain/activity/dto/ActivityResponse";
import type { ActivityCreateRequest } from "~/domain/activity/dto/ActivityCreateRequest";

export class ActivityRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<ActivityResponse[]> {
        const activities = await this.apiClient.request<ActivityResponse[]>("/activities");
        return activities.map(value => mapToActivityResponse(value));
    }

    async findCount(): Promise<ActivityCountResponse> {
        const activityCount = await this.apiClient.request<ActivityCountResponse>("/activities/count");
        return mapToActivityCountResponse(activityCount);
    }

    async create(activity: ActivityCreateRequest): Promise<void> {
        await this.apiClient.request<unknown>("/activities", "POST", {}, activity);
    }
}
