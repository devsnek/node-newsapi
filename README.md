# News API for Node.js

```js
const NewsAPI = require('newsapi');

const api = new NewsAPI('token');

// get some articles from The New York Times
api.getArticles('the-new-york-times').then(console.log);

// get all available sources
api.getSources().then((sources) => {
  sources[0].getArticles().then(console.log);
});
```
