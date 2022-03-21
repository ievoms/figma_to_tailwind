const express = require('express');
const https = require("https")
const path = require('path');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

const app = express();
const HOSTNAME = "api.figma.com"
app.get('/api/files/:id', (localReq, localRes) => {

  var options = {
    hostname: HOSTNAME,
    host: HOSTNAME,
    port: null,
    path: `/v1/files/${localReq.params.id}/`,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: localReq.get("Authorization"),
    },
  }
  
  const request = https.request(options, function (response) {
    const chunks = []
    
    response.on("data", function (chunk) {
      chunks.push(chunk)
    })
    
    response.on("end", function () {
      const body = Buffer.concat(chunks) 
      localRes.send(JSON.stringify(body.toString()));
    })
  })
  request.end()
});
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

