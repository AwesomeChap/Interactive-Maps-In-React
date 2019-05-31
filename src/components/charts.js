import React, { Component } from 'react'
import Chart1 from './chart1';
import Chart2 from './chart2';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraphs: false
    }
  }

  handleClick = () => this.setState({ showGraphs: !this.state.showGraphs });

  render() {
    return (
      <>
        {
          this.state.showGraphs && (
            <div className="charts-container">
              <div className="chart">
                <div className="chart-heading"><span>Number of bookings made round the clock</span></div>
                <Chart2 getBTF={this.props.getBTF} data={this.props.btd} />
              </div>
              <div className="chart">
                <div className="dummy-chart">Chart 2</div>
              </div>
              <div className="chart">
                <div className="dummy-chart">Chart 3</div>
              </div>
            </div>
          )
        }
        <div className="btns">
          <div onClick={this.handleClick} className="btn">
            <>
              {
                this.state.showGraphs ? (
                  <>
                    <i class="fas hide fa-chart-bar"></i>
                    <div className="diag-strike"></div>
                  </>
                ) : (
                  <i class="fas fa-chart-bar"></i>
                    // <i className="fas fa-chart-area"></i>
                  )
              }
            </>
          </div>
          <>
            {
              this.props.time_filter_selected && <div onClick={this.props.resetFilter} className="btn">
                <i class="fas fa-undo-alt"></i>
              </div>
            }
          </>

        </div>

      </>
    )
  }
}