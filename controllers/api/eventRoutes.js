const router = require('express').Router();
const { Event } = require('../../models/');
const dayjs = require('dayjs')

router.post("/create-event", async(req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.sendStatus(201)
});

router.get("get-events", async (req, res) => {
    try{
        const events = await Event.findAll();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching events');
      }   
    
  });

module.exports = router;