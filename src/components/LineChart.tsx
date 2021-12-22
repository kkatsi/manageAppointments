import React from "react";
import "react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";

interface Single {
  x: string;
  y: number;
}

interface Props {
  data: Single[];
}

export default function LineChart({ data }: Props) {
  return (
    <XYPlot
      height={300}
      width={
        document.querySelector(".content")?.clientWidth ||
        window.innerWidth - 30
      }
      xType="ordinal"
    >
      <XAxis />
      <YAxis />
      <HorizontalGridLines />
      {/* <AreaSeries
        color="#f472b6"
        data={data}
        opacity={0.25}
        stroke="transparent"
      /> */}
      <LineSeries
        data={data}
        opacity={1}
        stroke="#f472b6"
        strokeStyle="solid"
      />
    </XYPlot>
  );
}
