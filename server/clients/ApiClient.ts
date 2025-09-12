import type { ApiClientConfig } from "~~/server/clients/ApiClientConfig";
import type { HTTPMethod } from "h3";
import type { FetchError } from "ofetch";
import { $fetch } from "ofetch";
import { ErrorResponseSchema } from "~~/dto/ErrorResponse";

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
        body: BodyInit | Record<string, any> | null | undefined = undefined,
        jsonStringifyBody: boolean = true,
    ): Promise<T> {
        return $fetch<T>(this.baseUrl + path, {
            method: method,
            body: body ? (jsonStringifyBody ? JSON.stringify(body) : body) : undefined,
            headers: headers,
            parseResponse: this.safeParseJson,
        }).catch((error: FetchError) => {
            console.error(error.data ? error.data : error);

            if (error.response) {
                const errorResponse = ErrorResponseSchema.safeParse(error.data);
                const errorString = errorResponse.success
                    ? errorResponse.data.message + ": " + errorResponse.data.errors.join(", ")
                    : undefined;
                throw createError({
                    statusCode: error.statusCode,
                    statusMessage: errorString || "An unknown error occurred. Please try again later.",
                });
            }

            throw createError({
                statusCode: error.statusCode,
                statusMessage: "The server is not responding. Please try again later.",
            });
        });
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
