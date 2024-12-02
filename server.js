import express from "express";
const app = express();
import "dotenv/config";

//set port to use either deploymnet environment port or local port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port: ${port}`));
app.use(express.static("public")); //allow expres to use public folder
app.use(express.json({ limit: "1mb" })); //limit the amount of data that can be posted to server
