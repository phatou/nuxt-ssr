const functions = required('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');

const app = express();

const config = {
  dev: false,
  buildDir: 'nuxt',
  buidl: {
    publicPath: '/public/'
  }
};

const nuxt = new Nuxt(config);

function handleRequest(req, res) {
  res.set('Cache-control', 'public, max-age=600, s-maxage=1200');
  nuxt
    .renderRoute('/')
    .then(result => {
      res.send(result.html);
    })
    .catch(e => {
      res.send(e);
    });
}

app.get('*', handleRequest);

exports.ssrapp = functions.https.onRequest(app);
