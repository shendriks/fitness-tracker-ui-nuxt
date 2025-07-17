import type { ApiClientConfig } from "~/server/clients/ApiClientConfig";
import type { HTTPMethod } from "h3";
import { $fetch } from "ofetch";

export class ApiClient {
    private readonly baseUrl: string;

    constructor(config: ApiClientConfig) {
        this.baseUrl = config.baseUrl;
    }

    static create() {
        const config = useRuntimeConfig();
        return new ApiClient(
            {
                baseUrl: config.fitnessTrackerApiBaseUrl,
            });
    }

    private async sleep(ms: number): Promise<void> {
        console.warn("Sleeping for", ms, "ms - remove this before going to production");
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async request<T>(
        path: string,
        method: HTTPMethod = "GET",
        headers: Record<string, string> = {},
        body?: object,
    ): Promise<T> {
        // TODO remove sleep
        return this.sleep(0).then(() => $fetch<T>(this.baseUrl + path, {
            method: method,
            body: body ? JSON.stringify(body) : undefined,
            headers: headers,
            parseResponse: this.safeParseJson,
        }).catch((error) => {
            console.error(error);
            throw createError({
                statusCode: error.statusCode,
                statusMessage: error.data?.message || error.statusMessage || "An unknown error occurred",
            });
        }));
    }

    private safeParseJson(text: string): object | undefined {
        if (!text) {
            return undefined;
        }

        try {
            return JSON.parse(text);
        }
        catch (e) {
            console.error("Error parsing JSON", e);
            return undefined;
        }
    };
}
