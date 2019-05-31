# Interactive Maps Reactjs
This application demonstrates how can we generate Interactive Maps in React. In order to render maps and charts `react-map-gl` library is used. You may visit here in order to see it's live demo.

## How to use it ?
* Upload a `.csv` file which contain dataset. You may see sample dataset file `data.csv` located in `server/data` directory in order to get the idea about the files this demo would accept. 
<p align="center">
  <img src="https://github.com/AwesomeChap/Interactive-Maps-In-React/blob/master/uploaded.png" width="800">
</p>

* After uploading the suitable `.csv` file. Your screen would seem quite similar to as shown below. You may click `SHOW CHARTS` button (located in top right corner) in order to see the charts.
<p align="center">
  <img src="https://github.com/AwesomeChap/Interactive-Maps-In-React/blob/master/first_preview.png" width="800">
</p>

* After you'll clicked the button. You can also filter content by clicking on individual bars. Now in case you wish to revert back to unfiltered state, you can do that by clicking the `UNDO` button (located below `SHOW BUTTON`).
<p align="center">
  <img src="https://github.com/AwesomeChap/Interactive-Maps-In-React/blob/master/filtered_preview.png" width="800">
</p>

## How to run it locally ?
In order to run this project in your machine you first need to create a Mapbox account and grab Access Token. Then you need to paste it in `map.js`. After doing it you can run app locally using three commands that are shown below.
* `npm install` : It would install all the necessary packages
* `npm run dev` : It would run development server for our React Frontend. 
* `npm start`   : It would run node server for our Backend.

**Note:** For the sake of fast development I've restricted number of input data points to first 2000 entries. If you wish to change it, you can do it be editing `server.js` file.
