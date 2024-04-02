import express from 'express';

//PORT
const PORT = 8000;

//rest object
const app = express();

//route
app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to Node server</h1>");
})

//Listen
app.listen(PORT, () => {
    console.log(`Server  is running on port ${PORT}`);
})

