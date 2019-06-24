import React, { Component } from 'react';
import App from './app';

import axios from 'axios'

export default class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileView: false,
      selectedFile: null,
      uploaded: false,
      useDefault: false,
      clicked: false,
      flnm: ""
    }
  }

  componentDidMount() {
    if (document.documentElement.clientWidth <= 700 || document.documentElement.clientHeight <=500) {
      this.setState({ isMobileView: true })
    } else {
      this.setState({ isMobileView: false })
    }
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (document.documentElement.clientWidth <= 700 || document.documentElement.clientHeight <=500) {
      this.setState({ isMobileView: true })
    } else {
      this.setState({ isMobileView: false })
    }
  }

  handleChange = e => {
    this.setState({ selectedFile: e.target.files[0], flnm: e.target.files[0].name })
  }

  handleUseDefault = (e) => {
    this.setState({ useDefault: true });
  }

  handleUpload = (e) => {
    e.preventDefault();
    if (!this.state.selectedFile) {
      alert('Please choose a file!');
      return;
    }
    console.log(this.state.selectedFile);
    this.setState({ clicked: true }, () => {

      const data = new FormData();
      const isCsv = this.state.selectedFile.name.split('.')[1] === 'csv';

      if (isCsv) {
        data.append('file', this.state.selectedFile)
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
          this.state.isMobileView ? (
            <div className="upload-form-wrapper">
              <p>Please open it in bigger window.</p>
            </div>
          ) : (
              (this.state.uploaded || this.state.useDefault) ? (
                <App choice={this.state.uploaded ? 1 : 2} />
              ) : (
                  <div className="upload-form-wrapper">
                    <div className="heading">Interactive Maps In React</div>
                    <div className="upload-form">
                      <input onChange={this.handleChange} type="file" name="selectedFile" id="file" className="inputfile" data-multiple-caption="{count} files selected" multiple />
                      <label htmlFor="file">{this.state.flnm.length ? this.state.flnm : "Choose File"}</label>
                      <button onClick={this.handleUpload} > {!this.state.clicked ? "Upload" : <span className="spinner"></span>} </button>
                    </div>
                    <p>OR</p>
                    <div className="upload-form">
                      <button style={{ backgroundColor: "#F55F36" }} onClick={this.handleUseDefault} > Use Dummy Data </button>
                    </div>
                  </div>
                )
            )
        }
      </>
    )
  }
}