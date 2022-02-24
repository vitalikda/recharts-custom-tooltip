import Chart from "./chart";
import { chartData } from "./data";
import { ChakraProvider, Box } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider>
      <Box pt={30} p={20}>
        <Chart
          data={chartData}
          xAxisInterval={1}
          yAxisInterval={0}
          height={450}
        />
      </Box>
    </ChakraProvider>
  );
}
