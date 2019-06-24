import React, { Component } from 'react';
import './app.scss';
import Map from './components/map';
import axios from 'axios';
import Charts from './components/charts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      filtered_data: [],
      booking_time_data: [],
      time_filter: "",
    }
  }

  //
  handleFiltering = (time) => {
    const newData = [...this.state.data].filter(d => d.time_hour === time);
    this.setState({ time_filter: time, filtered_data: newData });
  }

  handleResetFilter = () => this.setState({ time_filter: ""});

  componentDidMount() {

    const requestUrl = this.props.choice === 1 ? '/api/data' : '/api/default';
    axios.get(requestUrl).then(({ data }) => {

      console.log(data);

      let validData = [];
      
      data.forEach(d => {
        if (d.from_area_id != "NULL" && d.from_long != "NULL" && d.from_lat !== "NULL") {
          let validItem = {
            name: d.from_area_id,
            longitude: d.from_long,
            latitude: d.from_lat,
            time_hour: parseInt(d.booking_created.split(' ')[1].split(':')[0], 10)
          }
          validData.push(validItem);
        }
      })

      const time_occur = Array.from(Array(24), (x) => 0);

      data.forEach(d => {
        const booking_hour = d.booking_created.split(' ')[1].split(':')[0];
        var booking_hour_integer = parseInt(booking_hour, 10);
        time_occur[booking_hour_integer]++;
      });

      const btd = time_occur.map((t, i) => ({
        x0: i,
        x: i + 1,
        y: t,
        xOffset: -16, // hack to center the count label of bars
        style: { fill: '#aaa', fontSize: 13 }
      }))

      this.setState({ loading: false, data: validData, booking_time_data: btd }, () => console.log('loaded'));
    }).catch(e => console.log(e));
  }

  render() {
    return (
      <>
        {
          this.state.loading ? (
            <div className="loading"></div>
          ) : (
              <>
                <Map cities={this.state.time_filter.length === 0 ? this.state.data : this.state.filtered_data} />
                <Charts time_filter_selected={this.state.time_filter.length !== 0}
                  resetFilter={this.handleResetFilter}
                  filterData={this.handleFiltering} btd={this.state.booking_time_data} />
              </>
            )
        }
      </>
    )
  }
}

export default App;