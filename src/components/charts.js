import React, { Component } from 'react'
import Chart from './chart';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCharts: false
    }
  }

  handleClick = () => this.setState({ showCharts: !this.state.showCharts });

  render() {
    return (
      <>
        {
          this.state.showCharts && (
            <div className="charts-container">
              <div className="chart">
                <div className="chart-heading"><span>Number of bookings made round the clock</span></div>
                <Chart filterData={this.props.filterData} data={this.props.btd} />
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
                this.state.showCharts ? (
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