import { $fetch } from "ofetch/node";
import type { EventHandlerRequest, H3Event } from "h3";

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

        return $fetch(this.baseUrl + url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: { Authorization: "Bearer " + accessToken },
        });
    }

    private async getToken(): Promise<string> {
        const session = await getUserSession(this.event);
        const { token: accessToken } = session.secure;
        return accessToken;
    }
}
