import type { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import type { NotificationResponse } from "~/dto/notification/NotificationResponse";
import { NotificationResponseSchema } from "~/dto/notification/NotificationResponse";

export class NotificationRepository {
    constructor(private readonly apiClient: AuthenticatedApiClient) {
    }

    async findAll(): Promise<NotificationResponse[]> {
        const notifications = await this.apiClient.request<NotificationResponse[]>("/notifications");
        return notifications.map(value => NotificationResponseSchema.parse(value));
    }
}
