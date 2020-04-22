const { Router } = require("express");

const LogEntry = require('../models/LogEntry')

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.status(200);
    res.json(entries);
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req, res, next) => {
  if (req.body != null) {
    LogEntry.create(req.body, (err, entries) => {
      if (err) {
        console.log(req.body)
        next(err)
      } else {
        console.log('Entries: ', entries)
        res.status(200)
        res.json(entries)
      }
    });

    // LogEntry.create(req.body)
    // .then((entry) => {
    //   console.log('Entry is created', entry)
    //   res.status(200)
    //   res.json(entry)
    // }, (err) => next(err))
    // .catch((err) => next(err));
  }
})

module.exports = router;
