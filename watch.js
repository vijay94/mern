/*
  Used to watch for the changes under src directory and build for development.
*/

process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const config = require('react-scripts/config/webpack.config.dev.js');

config.entry.shift();
config.entry = config.entry.filter(
  entry => !entry.includes('webpackHotDevClient')
);

paths.ouputIndex = "./index.html";
paths.ouputPublicIndex = "./client/index.html";
paths.appBuild = "./client/";
paths.appStatic = "./static";
paths.publicStatic = "./client/static";
paths.appHtml = "./public/index.html";

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });

  fs.move(paths.ouputIndex, paths.ouputPublicIndex, { overwrite: true }, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  fs.move(paths.appStatic, paths.publicStatic, { overwrite: true }, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

}