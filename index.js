import "dotenv/config"; // this is used as we can not use any port diretly as it has security risk so that it can be deployed successfully
// this dotenv ensure that your folder has .env file and this file contain environment variables like port
import express from "express";
// this app is very powerful object as it can listen to any port
const app = express();
//const port = 3000;
const port = process.env.PORT || 3000; // to use variables present in .env we use process.env.variablename
// this is simple and in this we have return the data
app.get("/", (req, res) => {
  res.send("Hello from Shubhankit and his tea!");
});

app.get("/ice-tea", (req, res) => {
  res.send("What ice tea would you prefer?");
});

app.get("/twitter", (req, res) => {
  res.send("shubhankitdotcom");
});

// entire crud application

// now we want to accept the data from frontend side
// any data that comes in json format we accept that
app.use(express.json());

// now we want to design an application that stores my data in an array
let teaData = [];
// to uniquely identify the data
let nextId = 1;

// to add data we generally use post
// here we add a new tea
app.post("/teas", (req, res) => {
  // extracting data from req
  const { name, price } = req.body;
  // creating an object to store it in database
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

// to return all the data
// to get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// to get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // if anything comes in body we use req.body to extract so if anything comes in url we use req.params to extract it
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // if anything comes in body we use req.body to extract so if anything comes in url we use req.params to extract it

  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete tea

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
