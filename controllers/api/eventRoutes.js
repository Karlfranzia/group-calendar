const router = require('express').Router();
const { Event } = require('../../models/');
const dayjs = require('dayjs')
const { Op } = require('sequelize');

router.post("/create-event", async(req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.sendStatus(201)
});

router.get("/get-events", async (req, res) => {
    try{
        console.log("hello world")
        console.log(dayjs(req.query.start).toDate())
        console.log(dayjs(req.query.end).toDate())
        const events = await Event.findAll({
        where: {
            start: {
                [Op.gte]: dayjs(req.query.start).toDate()
            },
            end: {
                [Op.lte]: dayjs(req.query.end).toDate()
            }
        }
        });
        console.log(events);
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching events');
      }   
    
  });

module.exports = router;