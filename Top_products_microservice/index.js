import express from "express";
import { config } from "dotenv";
import axios from "axios";

config();
const app = express();

const token = process.env.token;

app.get("/categories/:categoryname/products", async (req, res) => {
  const { top, company, minprice, maxprice } = req.query;
  const { categoryname } = req.params;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(
      `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=${top}&minPrice=${minprice}&maxPrice=${maxprice}`,
      config
    );
    let i=0;
    [...response].map(element=>{
        element.id = i;
        i+=1;
    })
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.listen(3000);
