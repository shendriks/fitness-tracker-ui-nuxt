import { AuthenticatedApiClient } from "~/server/clients/AuthenticatedApiClient";
import { ActivityRepository } from "~/server/repository/ActivityRepository";
import { ActivityUploadRequestSchema } from "~/dto/activity/ActivityUploadRequest";
import type { MultiPartData } from "h3";

export default defineEventHandler(async (event) => {
    const apiClient = AuthenticatedApiClient.createFromEvent(event);
    const repository: ActivityRepository = new ActivityRepository(apiClient);
    const formDataBody = await readMultipartFormData(event);

    const formData = buildFormData(formDataBody);
    validateFormData(formData);

    await repository.upload(formData);
});

function validateFormData(formData: FormData): void {
    const formDataObj = Object.fromEntries(formData.entries());
    ActivityUploadRequestSchema.parse(formDataObj);
}

function buildFormData(multiPartData: MultiPartData[] | undefined): FormData {
    const formData = new FormData();
    multiPartData?.forEach((value) => {
        if (!value.name || !value.data) {
            return;
        }

        if (value.name === "gpxFile") {
            formData.append(value.name, new Blob([value.data], { type: value.type }), value.filename);
            return;
        }

        formData.append(value.name, value.data.toString());
    });

    return formData;
}
