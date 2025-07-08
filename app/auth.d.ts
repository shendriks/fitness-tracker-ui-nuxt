declare module "#auth-utils" {
    interface UserSession {
        name: string;
    }

    interface SecureSessionData {
        token: string;
    }
}

export {};
