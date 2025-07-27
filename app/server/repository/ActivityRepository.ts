import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import type { ActivityCountResponse } from "~/dto/activity/ActivityCountResponse";
import { ActivityCountResponseSchema } from "~/dto/activity/ActivityCountResponse";
import type { ActivityResponse } from "~/dto/activity/ActivityResponse";
import { ActivityResponseSchema } from "~/dto/activity/ActivityResponse";
import type { ActivityCreateRequest } from "~/dto/activity/ActivityCreateRequest";

export class ActivityRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<ActivityResponse[]> {
        const activities = await this.apiClient.request<ActivityResponse[]>("/activities");
        return activities.map(value => ActivityResponseSchema.parse(value));
    }

    async findById(id: string): Promise<ActivityResponse> {
        const activity = await this.apiClient.request<ActivityResponse>(`/activities/${id}`);
        return ActivityResponseSchema.parse(activity);
    }

    async findCount(): Promise<ActivityCountResponse> {
        const activityCount = await this.apiClient.request<ActivityCountResponse>("/activities/count");
        return ActivityCountResponseSchema.parse(activityCount);
    }

    async create(activity: ActivityCreateRequest): Promise<void> {
        await this.apiClient.request<unknown>("/activities", "POST", {}, activity);
    }
}
