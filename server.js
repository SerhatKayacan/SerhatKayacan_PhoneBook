const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.get("/api/customers", (req, res) => {
  fs.readFile("./MOCK_CUSTOMERS.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      let customers = JSON.parse(jsonString);
      res.json(customers);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});
app.post("/api/customers", (req, res) => {
  fs.readFile("./MOCK_CUSTOMERS.json", "utf8", (err, jsonString2) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      let customersdata = JSON.parse(jsonString2);
      let customers = customersdata.customers;
      var foundIndex = customers.findIndex(x => x.id == req.body.id);
      customers[foundIndex] = req.body;
      const jsonString = JSON.stringify({ customers: customers });
      fs.writeFile("./MOCK_CUSTOMERS.json", jsonString, err => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});
app.post("/api/newcustomer", (req, res) => {
  fs.readFile("./MOCK_CUSTOMERS.json", "utf8", (err, jsonString2) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      let customersdata = JSON.parse(jsonString2);
      let customers = customersdata.customers;
      let customersLength = customers.length;
      let lastCustomerId = customers[customersLength - 1].id;

      let customerToPost = {
        id: lastCustomerId + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone
      };
      customers.push(customerToPost);
      const jsonString = JSON.stringify({ customers: customers });
      fs.writeFile("./MOCK_CUSTOMERS.json", jsonString, err => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
