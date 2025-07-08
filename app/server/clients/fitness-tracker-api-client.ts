import { $fetch } from "ofetch/node";
import type { EventHandlerRequest, H3Event } from "h3";
import type { SecureSessionData } from "#auth-utils";
import type { Activity } from "~/domain/activity/dto/activityResponse";
import { mapToActivity } from "~/domain/activity/dto/activityResponse";

interface ClientConfig {
    baseUrl: string;
}

export const createFitnessTrackerApiClient = (event: H3Event<EventHandlerRequest>) => {
    const config = useRuntimeConfig();
    return new FitnessTrackerApiClient(
        event, {
            baseUrl: config.fitnessTrackerApiBaseUrl,
        });
};

export default class FitnessTrackerApiClient {
    private readonly baseUrl: string;
    private readonly event: H3Event<EventHandlerRequest>;

    constructor(event: H3Event<EventHandlerRequest>, config: ClientConfig) {
        this.event = event;
        this.baseUrl = config.baseUrl;
    }

    public async request(
        url: string,
        method: string = "GET",
        body?: object,
    ): Promise<unknown> {
        const accessToken = await this.getToken();

        return await $fetch(this.baseUrl + url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: { Authorization: "Bearer " + accessToken },
        }).catch((error) => {
            console.error("STATUS:", error.statusCode);
            if (error.statusCode === 401) {
                clearUserSession(this.event);
                throw createError({
                    statusCode: 401,
                    statusMessage: "Unauthorized. Please login again.",
                });
            }
            if (error.statusCode === 429) {
                throw createError({
                    statusCode: 429,
                    statusMessage: "You reached your rate limit. Please try again later or upgrade your plan.",
                });
            }
            throw createError({
                statusCode: error.statusCode || 500,
                statusMessage: error.statusMessage || "Unknown error occurred",
            });
        });
    }

    public async fetchActivities(): Promise<Activity[]> {
        const activities = await this.request("/activities");
        return activities.map((activity) => {
            return (mapToActivity(activity) as Activity);
        });
    }

    private async getToken(): Promise<string> {
        const session = await getUserSession(this.event);
        const { token: accessToken }: SecureSessionData | undefined = session.secure;
        return accessToken;
    }
}
