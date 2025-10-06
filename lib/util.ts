export function metersToKilometers(meters: number): number {
    return meters / 1000.0;
}

export function durationInSecondsToFormattedString(duration: number | null, forceShowHours: boolean = false): string {
    if (duration == null) {
        return "-";
    }

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.round((duration % 3600) % 60);
    const minuteString = String(minutes).padStart(2, "0");
    const secondString = String(seconds).padStart(2, "0");

    if (forceShowHours || hours > 0) {
        const hourString = String(hours).padStart(2, "0");
        return `${hourString}:${minuteString}:${secondString}`;
    }

    return `${minuteString}:${secondString}`;
}

export function speedToPace(metersPerSecond: number): number {
    return metersPerSecond != 0 ? 1000.0 / metersPerSecond : null;
}

export function toKmh(metersPerSecond: number): number {
    return metersPerSecond != null ? metersPerSecond * 3.6 : null;
}
