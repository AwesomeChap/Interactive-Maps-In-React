import React, { Component } from 'react';
import './app.scss';
import Map from './components/map';
import axios from 'axios';
import Charts from './components/charts';

let inputFile = '../data.csv'
let outputFile = '../data.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      filtered_data: [],
      booking_time_data: [],
      time_filter: "",
      time_filter_selected: false,
      selectedFile: null,
      uploaded: false
    }
  }

  handleBTF = (time) => {
    const newData = [...this.state.data].filter(d => d.time_hour === time);
    this.setState({ time_filter: time, time_filter_selected: true, filtered_data: newData });
  }

  handleResetFilter = () => this.setState({ time_filter: "", time_filter_selected: false });

  componentDidMount() {

    const requestUrl = this.props.choice === 1 ? '/api/data' : '/api/default';
    axios.get(requestUrl).then(({ data }) => {
      let i = 0;
      const d1 = data.map(d => {
        if (d.from_area_id != "NULL" && d.from_long != "NULL" && d.from_lat !== "NULL") {
          i++;
          return {
            name: d.from_area_id,
            longitude: d.from_long,
            latitude: d.from_lat,
            time_hour: parseInt(d.booking_created.split(' ')[1].split(':')[0], 10)
          }
        }
      })

      const time_occur = Array.from(Array(24), (x) => 0);
      const time = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"]

      const book_d1 = data.map(d => {
        const booking_time = d.booking_created.split(' ')[1].split(':')[0];
        var booking_time_integer = parseInt(booking_time, 10);
        time_occur[booking_time_integer]++;
      });

      const btd = time_occur.map((t, i) => ({
        x0: i,
        x: i + 1,
        y: t,
        xOffset: -15,
        style: { fill: '#aaa', fontSize: 13 }
      }))

      this.setState({ loading: false, data: d1, booking_time_data: btd },() => console.log('loaded'));
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
                <Map cities={!this.state.time_filter_selected ? this.state.data : this.state.filtered_data} />
                <Charts time_filter_selected={this.state.time_filter_selected} time_filter={this.state.time_filter} resetFilter={this.handleResetFilter} getBTF={this.handleBTF} btd={this.state.booking_time_data} />
              </>
            )
        }
      </>
    )
  }
}

export default App;