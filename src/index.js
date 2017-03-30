const snekfetch = require('snekfetch');
const querystring = require('querystring');

const API = 'https://newsapi.org/v1';

class Source {
  constructor(news, data) {
    this.news = news;
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.url = data.url;
    this.locale = `${data.language}-${data.country.toUpperCase()}`;
    this.language = data.language;
    this.country = data.country;
    this.logos = {
      small: data.urlsToLogos.small,
      medium: data.urlsToLogos.medium,
      large: data.urlsToLogos.large,
    };
    this.availableSortingMethods = data.sortBysAvailable;
  }

  getArticles(options) {
    return this.news.getArticles(this.id, options);
  }
}

class Article {
  constructor(data) {
    this.author = data.author;
    this.description = data.description;
    this.url = data.url;
    this.image = data.urlToImage;
    this.publishedAt = new Date(data.publishedAt);
  }
}

class NewsAPI {
  constructor(token) {
    this.token = token;
  }

  getSources(options = {}) {
    return this._makeRequest('sources', options).then((body) => body.sources.map((s) => new Source(this, s)));
  }

  getArticles(source, options = {}) {
    // source is seperate to remind people it isn't optional
    options.source = source;
    return this._makeRequest('articles', options).then((body) => body.articles.map((a) => new Article(a)));
  }

  _makeRequest(path, options) {
    options.apiKey = this.token;
    return snekfetch.get(`${API}/${path}?${querystring.stringify(options)}`)
    .then((response) => {
      const body = response.body;
      if (body.status !== 'ok') return Promise.reject(body.message);
      return body;
    });
  }
}

module.exports = NewsAPI;
