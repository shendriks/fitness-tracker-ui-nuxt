import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import { ActivityRepository } from "~/server/repository/ActivityRepository";
import { ActivityUploadRequestSchema } from "~/dto/activity/ActivityUploadRequest";
import { ActivityCreateRequestSchema } from "~/dto/activity/ActivityCreateRequest";

export default defineEventHandler(async (event) => {
    const apiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    const formDataBody = await readMultipartFormData(event);

    const formData = new FormData();

    formDataBody?.forEach((value) => {
        if (value.name && value.data) {
            if ((value.name === "file")) {
                const blob = new Blob([value.data], { type: value.type });
                formData.append(value.name, blob, value.filename);
            }
            else {
                formData.append(value.name, value.data.toString());
            }
        }
    });

    await apiClient.request(
        "/activities/upload",
        "POST",
        {},
        formData,
        false,
    );
});
