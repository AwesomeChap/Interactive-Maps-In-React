import React, { Component } from 'react';
import App from './app';

import axios from 'axios'
import { spawn } from 'child_process';

export default class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploaded: false,
      clicked: false,
      flnm: ""
    }
  }

  handleChange = e => {
    this.setState({ selectedFile: e.target.files[0], flnm: e.target.files[0].name })
  }

  handleUpload = (e) => {
    e.preventDefault();
    console.log(this.state.selectedFile);
    this.setState({ clicked: true }, () => {

      const data = new FormData();
      const isCsv = this.state.selectedFile.name.split('.')[1] === 'csv';

      if (isCsv) {
        data.append('file', this.state.selectedFile)

        // console.log(this.state.selectedFile);

        axios.post('/api/upload', data).then(res => {
          this.setState({
            uploaded: true
          })
          console.log(res.statusText)
        }).catch(e => console.log(e));
      }
      else {
        this.setState({ selectedFile: null, flnm: "" });
        alert('Please enter csv file');
      }
    })
  }

  render() {
    return (
      <>
        {
          this.state.uploaded ? (
            <App />
          ) : (
              <div className="upload-form-wrapper">
                <div className="heading">Interactive Graphs In React</div>
                <div className="upload-form">
                  <input onChange={this.handleChange} type="file" name="selectedFile" id="file" class="inputfile" data-multiple-caption="{count} files selected" multiple />
                  <label htmlFor="file">{this.state.flnm.length ? this.state.flnm : "Choose File"}</label>
                  <button onClick={this.handleUpload} > {!this.state.clicked ? "Upload" : <span className="spinner"></span> } </button>
                </div>
              </div>
            )
        }
      </>
    )
  }
}