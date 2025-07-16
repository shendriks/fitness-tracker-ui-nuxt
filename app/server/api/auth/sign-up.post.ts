import { z } from "zod";
import { ApiClient } from "~/server/clients/ApiClient";

export default defineEventHandler(async (event) => {
    const apiClient = ApiClient.create();
    const { name, email, password, type } = await readValidatedBody(event, signUpSchema.parse);

    return await apiClient.request("/users/signup", "POST", {
        "Content-Type": "application/json",
    }, {
        name: name,
        email: email,
        password: password,
        accountType: type,
    }).then((response) => {
        console.log("Sign-up response", response);
    }).catch((error) => {
        console.log("Sign-up error", error);
        throw error;
    });
});

const signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    type: z.string(),
});
