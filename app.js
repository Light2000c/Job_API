const express = require("express");
const routes = require("./routes/router");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors({
    origin: '*',
}));

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

const port = process.env.port || 3000;

app.listen(port, ()=>{

    console.log("Listening on port ", port);
});