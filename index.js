const express = require("express")
const cors = require("cors")
const path = require('path');
const app = express()

app.use('/frontend', express.static(path.join(__dirname, 'frontend')));
app.use('/admin',express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

let numberOfRotation = 20
let finalPosition = 0

const PORT = process.env.PORT || 5000;

var corsOptions = {
    // origin: 'https://wheel-spinner-44gn.onrender.com',
    origin: 'http://localhost:5000',
    credentials: true
}


app.use(cors(corsOptions))

app.get('/update_info', function (req, res) {
    let query = req.query
    finalPosition = query.position
    numberOfRotation = query.rotation
    res.send({ 'success': true })
})

app.get('/get_info', function (req, res) {
    res.send({ 'position': finalPosition, 'rotation': numberOfRotation })
})

// app.get('/frontend', function (req, res) {
//     res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });



app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
})
