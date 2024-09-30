import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// initialize express and port 3000
const app = express();
const port = 3000;

// use middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// use app.get to get data from the blockchain API
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.blockchain.com/v3/exchange/symbols"
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
    // use catch for error
  } catch (error) {
    console.error("Failed to make request:", error.message);
    // render the error message to the user passing the data as null and error message
    res.render("index.ejs", {
      data: "null",
      error: error.message,
    });
  }
});

// use app.get for the about page
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// use app.post to get data from the blockchain API based on the currency
app.post("/", async (req, res) => {
  console.log(req.body);
  // use toUpperCase to convert the base and counter to uppercase letters to match API format
  const base_currency = req.body.base_currency.toUpperCase();
  const counter_currency = req.body.counter_currency.toUpperCase();
  // use try and catch to handle errors
  try {
    const response = await axios.get(
      `https://api.blockchain.com/v3/exchange/symbols/${base_currency}-${counter_currency}`
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
    // use catch for error
  } catch (error) {
    console.error("Failed to make request:", error.message);
    // render the error message to the user passing the data as null and error message
    res.render("index.ejs", {
      data: "null",
      error: "Error: Enter Valid Currency",
    });
  }
});

// use app.listen for the server to start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
