const router = require('express').Router();
const { User } = require('../../models/');

router.get('/', async (req, res) => {
    // We find all dishes in the db and set the data equal to dishData
    const dishData = await User.findAll().catch((err) => { 
      res.json(err);
    });
    // We use map() to iterate over dishData and then add .get({ plain: true }) each object to serialize it. 
    const dishes = dishData.map((dish) => dish.get({ plain: true }));
    // We render the template, 'all', passing in dishes, a new array of serialized objects.
    res.json(dishes)
    });

// post route for signing up
router.post('/', async (req, res) => {
  try {     
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
   }
});

router.post('/login', async (req, res) => {
  try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }

        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
    res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
