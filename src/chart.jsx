import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Tooltip as ChakraTooltip, theme, Box, Text } from "@chakra-ui/react";

const CustomLineActiveDot = (props) => {
  const { dataKey, value, cx, cy, payload, ...rest } = props;

  if (!cx || !cy) return null;

  const { label, ...data } = payload;

  const displayValue = (val) => {
    const notObject = typeof val !== "object";
    const isCurrentValue = val === value;
    return val && notObject && isCurrentValue;
  };

  return (
    <ChakraTooltip
      delayDuration={0}
      label={
        <Box flex="column" justify="center" items="center" css={{ py: "$1" }}>
          <Text size="sm" color="text2">
            {label}
          </Text>
          {Object.entries(data).map(
            ([key, value]) =>
              displayValue(value) && (
                <Text key={`${key}-${value}`} size="sm" color="text1">
                  {value} {key}
                </Text>
              )
          )}
        </Box>
      }
    >
      <circle {...rest} cx={cx} cy={cy} />
    </ChakraTooltip>
  );
};

const CustomLineChart = (props) => {
  const {
    data,
    height,
    width = "100%",
    yAxisInterval = "preserveEnd",
    xAxisInterval = "preserveStartEnd",
    margin = { top: 10, bottom: 10 }
  } = props;

  const dataKeys = Object.keys(data[0]).filter((k) => k && k !== "label");

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data} margin={{ top: 10, bottom: 10, ...margin }}>
        <CartesianGrid strokeWidth={1} vertical={false} />
        <XAxis
          dataKey="label"
          textAnchor="middle"
          interval={xAxisInterval}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          fontSize={theme.fontSizes.sm}
          padding={{ left: 30, right: 30 }}
        />
        {/* Hide Y axis when there are multiple data keys  */}
        {dataKeys.length === 1 && (
          <YAxis
            type="number"
            interval={yAxisInterval}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            minTickGap={5}
            width={50}
          />
        )}
        {/* Hide Tooltip; CustomLineActiveDot is used instead */}
        <Tooltip cursor={false} wrapperStyle={{ display: "none" }} />
        {dataKeys.map((dataKey) => (
          <Line
            key={dataKey}
            dataKey={dataKey}
            type="linear"
            strokeWidth={1.5}
            dot={false}
            activeDot={(props) => <CustomLineActiveDot {...props} />}
            isAnimationActive={false}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
