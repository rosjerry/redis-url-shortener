const port = 3000
import { nanoid } from 'nanoid'

import express from 'express'
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { createClient } from 'redis';
const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

let dummyData=[
  {
    "a1b2c3": "https://google.com"
  },
  {
    "a1b2c4": "https://youtube.com"
  },
  // {
  //   "a1b2c5": "https://facebook.com"
  // },
  // {
  //   "a1b2c6": "https://apple.com"
  // },
  // {
  //   "a1b2c7": "https://amazon.com"
  // },
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/create', async (req, res) => {

  const longURL = req?.body?.longURL;
  const shortURL = nanoid(7);
  const result =  await client.set(shortURL, longURL);
  const savedValue = await client.get(shortURL);

  res.send({
    message: "URL Shortened!",
    result: result,
    shortURL: shortURL,
    longURL: savedValue
  })
})

app.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;

  dummyData.filter((url) => {
    if (Object.keys(url) != shortURL){
      console.log("could not found")
    }else {
      console.log(shortURL)
      console.log(Object.keys(url) == shortURL)
      console.log(Object.values(url))
      res.send(...(Object.values(url)))
    }
  })

  res.send("1")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})