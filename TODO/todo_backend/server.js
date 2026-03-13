const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// FIXED: Matches the 'static' folder created by your Jenkinsfile
app.use(express.static(path.join(__dirname, "static")));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/TODO';
const PORT = process.env.PORT || 5000;

console.log('Connecting to MongoDB...', MONGODB_URI);

// FIXED: Corrected callback syntax
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

app.post('/add', (req, res) => {
    const { task } = req.body;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    TodoModel.findByIdAndUpdate(id, { task: task })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

// FIXED: Catch-all to serve index.html for React routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

module.exports = app;