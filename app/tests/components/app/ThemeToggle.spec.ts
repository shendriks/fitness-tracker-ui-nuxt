import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AppThemeToggle from "../../../components/app/ThemeToggle.vue";

describe("ThemeToggle", () => {
    it("renders the component properly", async () => {
        const wrapper = await mountSuspended(AppThemeToggle);

        expect(wrapper.find(".theme-toggle").exists()).toBe(true);
        expect(wrapper.find("svg").exists()).toBe(true);
        expect(wrapper.find(".theme-toggle-sr").text()).toBe("Toggle theme");
    });

    it("renders the SVG element with the correct attributes", async () => {
        const wrapper = await mountSuspended(AppThemeToggle);

        const svg = wrapper.find("svg");
        expect(svg.attributes("xmlns")).toBe("http://www.w3.org/2000/svg");
        expect(svg.attributes("aria-hidden")).toBe("true");
        expect(svg.attributes("width")).toBe("1.5em");
        expect(svg.attributes("height")).toBe("1.5em");
        expect(svg.attributes("fill")).toBe("currentColor");
        expect(svg.attributes("viewBox")).toBe("0 0 32 32");
    });
});
