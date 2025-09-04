import { Chart, Title, Tooltip, Legend, LineController, LineElement, PointElement, CategoryScale, LinearScale, Filler } from "chart.js";

export default defineNuxtPlugin(() => {
    Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend, Filler);
});
