import React, { Component } from 'react';

import { XYPlot, XAxis, YAxis, VerticalRectSeries, LabelSeries } from 'react-vis';

class BarGraph extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartDomain_y : 0
    }
  }

  handleValueClick = (event) => {
    console.log(event);
    this.props.filterData(event.x0);
  }

  render() {
    const {data} = this.props;
    if(data.length){
      let chartDomain_y = data[0].y;
      for(let i = 0; i<data.length; i++){
        if(data[i].y > chartDomain_y){
          chartDomain_y = data[i].y;
        }
      }
    }
    return (
      <XYPlot width={800} height={300} 
        // yDomain={[0,85]}
      >
        <XAxis />
        <YAxis />
        <VerticalRectSeries
          data={data}
          strokeWidth={2}
          stroke="#222"
          fill="#ED0A3F"
          colorType="literal"
          onValueClick={this.handleValueClick}
        />
        <LabelSeries
          data={data.map(obj => {
            return { ...obj, label: obj.y.toString() }
          })}
          labelAnchorX="middle"
          labelAnchorY="text-after-edge"
        />
      </XYPlot>
    );
  }
}

export default BarGraph;