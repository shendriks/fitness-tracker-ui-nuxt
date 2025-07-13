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

    public async request<T>(
        path: string,
        method: HTTPMethod = "GET",
        headers: Record<string, string> = {},
        body?: object,
    ): Promise<T> {
        return $fetch<T>(this.baseUrl + path, {
            method: method,
            body: body ? JSON.stringify(body) : undefined,
            headers: headers,
            parseResponse: JSON.parse,
        }).catch((error) => {
            console.error("ERROR:", error);
            switch (error.statusCode) {
                case 401:
                    throw createError({
                        statusCode: 401,
                        statusMessage: "Unauthorized. Please login again.",
                    });
                case 403:
                    throw createError({
                        statusCode: 403,
                        statusMessage: "Access denied. You don't have permission to access this resource.",
                    });
                case 404:
                    throw createError({
                        statusCode: 404,
                        statusMessage: "Resource not found.",
                    });
                case 429:
                    throw createError({
                        statusCode: 429,
                        statusMessage: "You reached your rate limit. Please try again later or upgrade your plan.",
                    });
                default:
                    throw createError({
                        statusCode: error.statusCode || 500,
                        statusMessage: error.statusMessage || "Unknown error occurred",
                    });
            }
        });
    }
}
