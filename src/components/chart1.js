import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';

const MSEC_DAILY = 86400000;

export default function Example(props) {
  const timestamp = new Date('September 9 2017').getTime();
  return (
    <XYPlot xType="time" width={300} height={300}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis title="X Axis" />
      <YAxis title="Y Axis" />
      <LineSeries
        data={[
          {x: timestamp + MSEC_DAILY, y: 3},
          {x: timestamp + MSEC_DAILY * 2, y: 5},
          {x: timestamp + MSEC_DAILY * 3, y: 15},
          {x: timestamp + MSEC_DAILY * 4, y: 12}
        ]}
      />
      <LineSeries data={null} />
      <LineSeries
        data={[
          {x: timestamp + MSEC_DAILY, y: 10},
          {x: timestamp + MSEC_DAILY * 2, y: 4},
          {x: timestamp + MSEC_DAILY * 3, y: 2},
          {x: timestamp + MSEC_DAILY * 4, y: 15}
        ]}
      />
    </XYPlot>
  );
}