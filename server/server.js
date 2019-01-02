import express from 'express';
import cors from 'cors';
import path from 'path';
import fetch from 'node-fetch';

//Environment Variables
const port = process.env.PORT || 3000;

let app = express();

//CORS
app.use(cors());
app.use(express.json());

//API Keys
//DarkSky
let weatherAPIkey = 'a5fba080fd2d698d40c4ae5d11d15d5b';

//Static Files
app.use(express.static(__dirname + '/public'));

// Index Route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//News
app.get('/api/news', async (req, res) => {
  let Parser = require('rss-parser');
  let parser = new Parser();
  let filter = req.query.filter;
  let articles = await parser.parseURL('https://www.theverge.com/rss/index.xml');

  if (filter) {
    articles = articles.filter(article => {
      return article.title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
  }

  res.send(articles.items);
});

app.get('/api/weather', async(req, res) => {
  let weatherAPIkey = 'a5fba080fd2d698d40c4ae5d11d15d5b';
  let lat = req.query.latitude ? req.query.latitude : '34.052235';
  let long = req.query.longitude ? req.query.longitude : '-118.243683';
  let response = await fetch(`https://api.darksky.net/forecast/${weatherAPIkey}/${lat},${long}`)
  const data = await response.json()

  res.send(data)
})

//Server
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
