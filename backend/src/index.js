import { nanoid } from "nanoid";
import { createClient } from "redis";
import express from "express";
import cors from "cors";

const port = 3001;
const app = express();
const client = createClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*"
}))

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

app.get("/", async (req, res) => {
  try {
    const keys = await client.keys("*");
    if (keys.length === 0) {
      return res.json({});
    }

    const values = await client.mGet(keys);
    const data = {};
    keys.forEach((key, index) => {
      data[key] = values[index];
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/create", async (req, res) => {
  try {
    const longURL = req?.body?.longURL;
    const shortURL = nanoid(7);
    const result = await client.set(shortURL, longURL);
    const savedValue = await client.get(shortURL);

    res.send({
      message: "URL Shortened!",
      result: result,
      shortURL: shortURL,
      longURL: savedValue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/:shortURL", async (req, res) => {
  try {
    const shortURL = req.params.shortURL;
    const retrievedValue = await client.get(shortURL);
    if (!retrievedValue) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(retrievedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
