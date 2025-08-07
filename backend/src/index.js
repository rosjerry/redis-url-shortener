const express = require('express')
const app = express()
const port = 3000

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

app.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;

  dummyData.filter((url) => {
    if (Object.keys(url) != shortURL){
      console.log("could not found")
    }else {
      console.log(shortURL)
      console.log(Object.keys(url) == shortURL)
    }
  })

  //shortURL
  // res.redirect("https://google.com")
  res.send("1")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})