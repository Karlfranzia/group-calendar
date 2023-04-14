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
        const events = await Event.findAll({
        // where: {
        //     start: {
        //         [Op.gte]: dayjs(req.query.start).toDate()
        //     },
        //     end: {
        //         [Op.lte]: dayjs(req.query.end).toDate()
        //     }
        // }
        });
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching events');
    }   
    
});


// JY: delete route to delete events based on the event id
router.delete("/delete/:id", async(req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
            // start: req.body.start,
            // end: req.body.end
        },
    })
    .then((deletedEvent) => {
        res.json(deletedEvent);
    })
    .catch((err) => res.json(err));
})

module.exports = router;