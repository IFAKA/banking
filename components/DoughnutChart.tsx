"use client";

import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: [1250, 2500, 3750],
            label: "Banks",
            backgroundColor: ["#0747b6", "#2265dB", "#2f91fa"],
          },
        ],
        labels: ["Bank 1", "Bank 2", "Bank 3"],
      }}
      options={{
        cutout: "75%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
