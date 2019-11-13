const express = require("express");
const app = express();
app.listen(8000, () => console.log("listening on port 8000"));

//for post data
app.use(express.urlencoded({ extended: true }));

//for reading json
app.use(express.json());

//for angular app
app.use(express.static(__dirname + '/public/dist/public'));

//require Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quote_rank', { useNewUrlParser: true });

const QuoteSchema = new mongoose.Schema({
    quote: { type: String, required: true, minlength: 3 },
    vote: { type: Number, default: 0 }
}, { timestamps: true })
const AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    quotes: [QuoteSchema]
}, { timestamps: true })

const Quote = mongoose.model("Quote", QuoteSchema);
const Author = mongoose.model("Author", AuthorSchema);

app.get('/authors', (request, response) => {
    Author.find()
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.get('/author/:id', (request, response) => {
    Author.findOne({ _id: request.params.id })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.post('/author', (request, response) => {
    const one_author = new Author(request.body);
    one_author.save()
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.put('/author/:id', (request, response) => {
    Author.update({ _id: request.params.id }, request.body, { runValidators: true })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.post('/author/:id', (request, response) => {
    const one_quote = new Quote(request.body);
    Author.findOneAndUpdate({ _id: request.params.id }, { $push: { quotes: one_quote } }, { runValidators: true })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.delete('/author/:a_id/:q_id', (request, response) => {
    Author.update({ _id: request.params.a_id }, { $pull: { "quotes": { _id: request.params.q_id } } })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.put('/up/:a_id/:q_id', (request, response) => {
    Author.update({  _id: request.params.a_id, "quotes._id": request.params.q_id }, { $inc: {"quotes.$.vote": 1}})
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.put('/down/:a_id/:q_id', (request, response) => {
    Author.update({  _id: request.params.a_id, "quotes._id": request.params.q_id }, { $inc: {"quotes.$.vote": -1}})
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

//require path
const path = require("path");
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});
