import type { AuthenticatedApiClient } from "~~/server/clients/AuthenticatedApiClient";
import type { ActivityCountResponse } from "~~/dto/activity/ActivityCountResponse";
import { ActivityCountResponseSchema } from "~~/dto/activity/ActivityCountResponse";
import type { ActivityResponse } from "~~/dto/activity/ActivityResponse";
import { ActivityResponseSchema } from "~~/dto/activity/ActivityResponse";
import type { ActivityCreateRequest } from "~~/dto/activity/ActivityCreateRequest";
import type { ActivityUpdateRequest } from "~~/dto/activity/ActivityUpdateRequest";
import type { ActivityDetailsResponse } from "~~/dto/activity/ActivityDetailsResponse";
import { ActivityDetailsResponseSchema } from "~~/dto/activity/ActivityDetailsResponse";

export class ActivityRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {}

    async findAll(): Promise<ActivityResponse[]> {
        const activities = await this.apiClient.request<ActivityResponse[]>("/activities");
        return activities.map(value => ActivityResponseSchema.parse(value));
    }

    async find(id: string): Promise<ActivityDetailsResponse> {
        const activity = await this.apiClient.request<ActivityDetailsResponse>(`/activities/${id}`);
        return ActivityDetailsResponseSchema.parse(activity);
    }

    async findCount(): Promise<ActivityCountResponse> {
        const activityCount = await this.apiClient.request<ActivityCountResponse>("/activities/count");
        return ActivityCountResponseSchema.parse(activityCount);
    }

    async create(activity: ActivityCreateRequest): Promise<ActivityDetailsResponse> {
        return await this.apiClient.request<ActivityDetailsResponse>("/activities", "POST", {}, activity);
    }

    async delete(id: string): Promise<unknown> {
        return await this.apiClient.request<unknown>(`/activities/${id}`, "DELETE");
    }

    async update(id: string, activity: ActivityUpdateRequest): Promise<ActivityDetailsResponse> {
        return await this.apiClient.request<ActivityDetailsResponse>(`/activities/${id}`, "PATCH", {}, activity);
    }

    async upload(formData: FormData): Promise<ActivityDetailsResponse> {
        return await this.apiClient.request<ActivityDetailsResponse>("/activities/upload", "POST", {}, formData, false);
    }
}
