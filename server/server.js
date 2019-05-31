const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
let csvToJson = require('convert-csv-to-json');
const publicPath = path.join(__dirname, '..', 'dist');
const inputFile = path.join(__dirname, 'data', 'data.csv');
const fileDir = path.join(__dirname, 'data', 'data_set.csv');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(fileUpload());

app.get('/api/data', (req, res) => {
  let json = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(fileDir);
  res.json(json.slice(0,2000));
})

app.post('/api/upload', function(req, res) {

  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let uploadFile = req.files.file;

  // Use the mv() method to place the file somewhere on your server
  uploadFile.mv(fileDir, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
})