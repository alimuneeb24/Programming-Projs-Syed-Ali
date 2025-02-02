const express = require('express');
const mongoose = require('mongoose');
const shorturl = require('./shorturl');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/urlshortner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    try {
        const shorturls = await shorturl.find();
        res.render('index', { shorturls: shorturls });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.post('/shorturls', async (req, res) => {
    try {
        await shorturl.create({ full: req.body.fullurl });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/:shorturl', async (req, res) => {
    try {
        const shortUrl = await shorturl.findOne({ short: req.params.shorturl });
        if (shortUrl == null) return res.sendStatus(404);

        shortUrl.clicks++;
        await shortUrl.save();

        res.redirect(shortUrl.full);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || 1234, () => {
    console.log('Server is running on port 1234');
});