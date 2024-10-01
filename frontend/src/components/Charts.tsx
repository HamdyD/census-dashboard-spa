import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useCensusStore } from "../store/useCensusStore";
import { Box, Heading } from "@chakra-ui/react";

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  selectedColumn: string;
};

const viridisColors = [
  "#440154", // Deep Purple (highest value)
  "#482878", // Dark Blue
  "#3E4A89", // Blue
  "#31688E", // Light Blue
  "#26828E", // Teal
  "#1F9E89", // Greenish-Teal
  "#35B779", // Light Green
  "#6CCE59", // Green-Yellow
  "#B8DE29", // Yellow-Green
  "#FDE725", // Yellow (lowest value)
];

const DoughnutChart = ({ selectedColumn }: DoughnutChartProps) => {
  const { data } = useCensusStore();

  const chartData = {
    labels: data.map((row) =>
      row[selectedColumn] !== null ? row[selectedColumn] : "undefined"
    ),
    datasets: [
      {
        data: data.map((row) => row.count),
        backgroundColor: viridisColors,
        hoverOffset: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRation: false,
    plugins: {
      legend: {
        position: "right" as const,
        // display: false,
      },
    },
  };

  return (
    <Box>
      <Heading fontWeight="normal" fontSize="md" marginBottom="4">
        Distribution of top 10 <strong>{selectedColumn}</strong> categories
      </Heading>
      <Box
        width="600px"
        background="white"
        borderRadius="xl"
        border="1px solid lightgray"
      >
        <Doughnut data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default DoughnutChart;
