import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AppSkeleton from "~~/app/components/app/Skeleton.vue";

describe("Skeleton", () => {
    it("renders with correct classes", async () => {
        const wrapper = await mountSuspended (AppSkeleton, {
            props: {
                class: "h-2 w-200 mb-1",
            },
        });

        const skeleton = wrapper.find("div");
        expect(skeleton.exists()).toBe(true);
        expect(skeleton.classes()).toContain("skeleton");
        expect(skeleton.classes()).toContain("h-2");
        expect(skeleton.classes()).toContain("w-200");
        expect(skeleton.classes()).toContain("mb-1");
    });

    it("renders without additional classes when no props provided", async () => {
        const wrapper = await mountSuspended(AppSkeleton);

        const skeleton = wrapper.find("div");
        expect(skeleton.exists()).toBe(true);
        expect(skeleton.classes()).toEqual(["skeleton"]);
    });
});
