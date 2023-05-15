const express = require("express");

const pattern = process.env.MATCH_PATTERN || "/**/*";
const mockResponse = process.env.MOCK_RESPONSE || { success: true };
const mockResponseType = process.env.MOCK_RESPONSE_TYPE = "application/json";
const port = process.env.MOCK_PORT || 8084;

const app = express();

app.use(express.json());

const history = [];

app.all(pattern, (req, res) => {
  const snapshot = { 
    url: req.url, 
    headers: req.headers, 
    body: req.body, 
    date: new Date() 
  };

  console.log("New Snapshot", snapshot);
  history.push(snapshot);
  
  res.setHeader("content-type", mockResponseType);
  
  res.status(201).send(mockResponse);
});

app.get("/_history", (_, res) => {
  console.log("Retrieve history");
  res.status(200).send(history);
});

app.get("/_tail", (_, res) => {
  console.log('Retrieve tail');
  const tail = history.at(-1);

  if (!tail) {
    res.status(404).send({});
    return;
  }

  res.status(200).send(tail);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
