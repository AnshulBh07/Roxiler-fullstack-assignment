import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { isNumber } from "./services/isNumber.js";

const app = express();
const port = 3001;
const prisma = new PrismaClient();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("on the server!");
});

// async function to fetch all data initially
let allData;
async function fetchData() {
  try {
    const response = await axios({
      method: "get",
      url: "https://s3.amazonaws.com/roxiler.com/product_transaction.json",
    });

    allData = response.data; // converts to json
    console.log(allData);
  } catch (err) {
    console.error(err);
  }
}

// function to populate database with fetched data
async function populateDB() {
  // We have a PostgreSQL db hosted on Amazon RDS so we just need to populate it once
  // so first we need to check whether it is already populated or not
  let noOfRecords;
  try {
    // let's achieve this by checking the number of records already in db
    noOfRecords = await prisma.products.count();
  } catch (err) {
    console.error(err);
  }

  // proceed to populate db if count is 0
  if (noOfRecords == 0) {
    await fetchData();

    for (let i = 0; i < allData.length; i++) {
      //   do something about timezone if got more time

      try {
        const item = await prisma.products.create({
          data: {
            product_id: allData[i].id,
            title: allData[i].title,
            price: allData[i].price,
            description: allData[i].description,
            category: allData[i].category,
            image_url: allData[i].image,
            sold: allData[i].sold,
            date_of_sale: allData[i].dateOfSale,
          },
        });
      } catch (err) {
        console.err(err);
      }
    }
  }

  console.log("Data saved into the database.");
}

populateDB();

// task-1 to search any given product according to query parameter, matching it against title/description/price
async function searchTransaction(records, search_text) {
  //slice the first 3 characters of string
  let isValidNumber;

  isValidNumber = isNumber(search_text);

  let records_for_month = records;
  //   console.log(isValidNumber);

  // if it is a number match it against price for each item, if not then match against title/description
  if (isValidNumber) {
    records_for_month = records_for_month.filter((x) => {
      const curr_price = x.price.toString();
      let j = 0;

      for (let i = 0; i < curr_price.length; i++) {
        if (curr_price[i] === search_text[i]) j++;
      }

      return j === search_text.length;
    });
  } else {
    records_for_month = records_for_month.filter((x) => {
      const desc = x.description.toLowerCase();
      const title = x.title.toLowerCase();

      return (
        desc.includes(search_text.toLowerCase()) ||
        title.includes(search_text.toLowerCase())
      );
    });
  }

  return records_for_month;
}

// task-2 get data for statistics
async function getStats(records) {
  //get required aggregated results
  let total_sale = 0,
    total_sold = 0,
    total_not_sold = 0;

  for (let i = 0; i < records.length; i++) {
    if (records[i].sold === true) {
      total_sold++;
      total_sale += records[i].price;
    } else total_not_sold++;
  }

  const data = {
    total_sale: total_sale,
    total_items_sold: total_sold,
    total_unsold_items: total_not_sold,
  };

  return data;
}

// task-3, creating api for bar chart
async function getBarChartData(records) {
  //   creating an array that would store number of elements for given price range for given month
  let items_per_range = new Array(10).fill(0);

  for (let i = 0; i < records.length; i++) {
    const price = records[i].price;

    switch (true) {
      case price > 0 && price <= 100:
        items_per_range[0]++;
        break;

      case price > 100 && price <= 200:
        items_per_range[1]++;
        break;

      case price > 200 && price <= 300:
        items_per_range[2]++;
        break;

      case price > 300 && price <= 400:
        items_per_range[3]++;
        break;

      case price > 400 && price <= 500:
        items_per_range[4]++;
        break;

      case price > 500 && price <= 600:
        items_per_range[5]++;
        break;

      case price > 600 && price <= 700:
        items_per_range[6]++;
        break;

      case price > 700 && price <= 800:
        items_per_range[7]++;
        break;

      case price > 800 && price <= 900:
        items_per_range[8]++;
        break;

      case price > 900:
        items_per_range[9]++;
        break;

      default:
        console.log("invalid price!");
        break;
    }
  }

  //   console.log(items_per_range);

  const data = {
    array: items_per_range,
    Range_0to100: items_per_range[0],
    Range_101to200: items_per_range[1],
    Range_201to300: items_per_range[2],
    Range_301to400: items_per_range[3],
    Range_401to500: items_per_range[4],
    Range_501to600: items_per_range[5],
    Range_601to700: items_per_range[6],
    Range_701to800: items_per_range[7],
    Range_801to900: items_per_range[8],
    Range_901andAbove: items_per_range[9],
  };

  return data;
}

// task-4, getting data for unique categories for a particular month
async function getPieData(records) {
  const map = new Map();

  // iterate over products then insert into map if it is not present
  for (let i = 0; i < records.length; i++) {
    const category = records[i].category.toLowerCase();

    if (!map.has(category)) {
      map.set(category, 1);
    } else {
      map.set(category, map.get(category) + 1);
    }
  }

  //   map.forEach((value, key) => {
  //     console.log(key + " : " + value);
  //   });

  let data = {};

  map.forEach((value, key) => {
    data[key] = value;
  });

  return data;
}

// task-4 , combining the responses of all APIs and sending to the client
app.get("/get_all_data", async (req, res) => {
  const key = String(req.query.key);

  // first finding data for selected month
  let curr_month = String(req.query.month).toLowerCase();
  curr_month = curr_month.slice(0, 3);

  let records_for_month;
  try {
    const all_records = await prisma.products.findMany();
    // sort for selected month
    records_for_month = all_records.filter((x) => {
      const date = x.date_of_sale.toDateString();
      const y = date.split(" "); //y[1] gives the month

      return y[1].toLowerCase() === curr_month;
    });
  } catch (err) {
    console.error(err);
  }

  if (key.length !== 0) console.log(key);

  let api1 =
    key.length > 0
      ? await searchTransaction(records_for_month, key)
      : records_for_month;
  const api2 = await getStats(records_for_month);
  const api3 = await getBarChartData(records_for_month);
  const api4 = await getPieData(records_for_month);

  let result = {};
  result = { ...result, Month: req.query.month };
  result = { ...result, Products: api1 };
  result = { ...result, Statistics: api2 };
  result = { ...result, BarData: api3 };
  result = { ...result, PieData: api4 };

  res.send(result);
});

app.listen(port, () => console.log(`listening to server at port ${port}`));

export default app;
