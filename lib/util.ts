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
    if (metersPerSecond == 0 || metersPerSecond == null) {
        return null;
    }

    return 1000.0 / metersPerSecond;
}

export function toKmh(metersPerSecond: number): number {
    return metersPerSecond != null ? metersPerSecond * 3.6 : null;
}

export function centralMovingAverage(values: number[], bucketSize: number) {
    bucketSize = Math.max(bucketSize, 1);
    const left = Math.floor(-bucketSize / 2 + 1);
    const right = Math.floor(bucketSize / 2);
    const movingAverageValues = [];
    for (let i = 0; i < values.length; i++) {
        let valueSum = 0;
        let valueCount = 0;
        for (let j = left; j <= right; j++) {
            const index = i + j;
            if (index < 0 || index >= values.length || values[index] == null) {
                continue;
            }
            valueSum += values[index];
            valueCount++;
        }
        // if the bucket is empty, we can't calculate the average
        const average = valueCount > 0 ? valueSum / valueCount : null;
        movingAverageValues.push(average);
    }
    return movingAverageValues;
}
