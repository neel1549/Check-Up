const express = require("express");
const app = express();
const axios = require("axios");
const courts = require("./CourtDetails/courtDetails");

app.get("/courts", async (req, res) => {
  courts.courtData(req.query.location).then((response) => {
    console.log(response);
    res.json(response);
  });
});

app.listen(4001);
