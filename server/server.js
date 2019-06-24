const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
let csvToJson = require('convert-csv-to-json');
const publicPath = path.join(__dirname, '..', 'dist');

const defaultData = path.join(__dirname, 'data', 'Kaggle_data.csv');
const fileDir = path.join(__dirname, 'data', 'data_set.csv');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(fileUpload());

app.get('/api/default', (req, res) => {
  let jsonData = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(defaultData);
  res.json(jsonData.slice(0,2000));
})

app.get('/api/data', (req, res) => {
  let jsonData = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(fileDir);
  res.json(jsonData.slice(0,2000));
})

app.post('/api/upload', function(req, res) {

  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploadFile = req.files.file;

  uploadFile.mv(fileDir, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
})