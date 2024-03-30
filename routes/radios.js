var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json([
    {
      name: "NRJ egypt",
      source: "https://nrjstreaming.ahmed-melege.com/nrjegypt",
    },
    {
      name: "MEGA FM",
      source: "http://nebula.shoutca.st:8211/mp3",
    },
    {
      name: "NOGOUMFM",
      source: "https://audio.nrpstream.com/listen/nogoumfm/radio.mp3",
    },
    {
      name: "Radio 9090 FM",
      source: "https://9090streaming.mobtada.com/9090FMEGYPT",
    },
    {
      name: "105.3 Nagham FM",
      source: "https://ahmsamir.radioca.st/stream",
    },
  ]);
});

module.exports = router;
