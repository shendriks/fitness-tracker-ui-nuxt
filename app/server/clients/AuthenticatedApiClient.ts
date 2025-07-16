import type { EventHandlerRequest, H3Event, HTTPMethod } from "h3";
import type { ApiClientConfig } from "~/server/clients/ApiClientConfig";
import { ApiClient } from "~/server/clients/ApiClient";

export class AuthenticatedApiClient extends ApiClient {
    private readonly event: H3Event<EventHandlerRequest>;

    constructor(event: H3Event<EventHandlerRequest>, config: ApiClientConfig) {
        super(config);
        this.event = event;
    }

    static createFromEvent(event: H3Event<EventHandlerRequest>) {
        const config = useRuntimeConfig();
        return new AuthenticatedApiClient(
            event, {
                baseUrl: config.fitnessTrackerApiBaseUrl,
            });
    }

    public async request<T>(
        url: string,
        method: HTTPMethod = "GET",
        headers: Record<string, string> = {},
        body?: object,
    ): Promise<T> {
        headers["Authorization"] = "Bearer " + await this.getAccessTokenOrThrow();
        return await super.request<T>(url, method, headers, body).catch((error) => {
            if (error.statusCode === 401) {
                clearUserSession(this.event);
            }
            throw error;
        });
    }

    private async getAccessTokenOrThrow(): Promise<string | undefined> {
        const session = await requireUserSession(this.event);
        const accessToken = session.secure?.token;
        if (!accessToken) {
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized. Please login again.",
            });
        }
        return accessToken;
    }
}
