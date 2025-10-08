import { describe, expect, test } from "vitest";
import { centralMovingAverage } from "../../lib/util";

describe("Util", () => {
    test("centralMovingAverage returns empty array if given empty array", () => {
        expect(centralMovingAverage([], 0)).toStrictEqual([]);
    });

    test("centralMovingAverage returns same array when bucket size is 1", () => {
        expect(centralMovingAverage([1, 7, 13], 1)).toStrictEqual([1, 7, 13]);
    });

    test("centralMovingAverage with bucket size 2", () => {
        expect(centralMovingAverage([1, 7, 13], 2)).toStrictEqual([4, 10, 13]);
    });

    test("centralMovingAverage with bucket size 3", () => {
        expect(centralMovingAverage([1, 7, 13], 3)).toStrictEqual([4, 7, 10]);
    });

    test("centralMovingAverage with bucket size 4", () => {
        expect(centralMovingAverage([1, 7, 13], 4)).toStrictEqual([7, 7, 10]);
    });

    test("centralMovingAverage with bucket size 5", () => {
        expect(centralMovingAverage([1, 7, 13], 5)).toStrictEqual([7, 7, 7]);
    });
});
