declare module "#auth-utils" {
    interface UserSession {
        name: string;
        email: string;
        accountType: string;
    }

    interface SecureSessionData {
        token: string;
    }
}

export {};
