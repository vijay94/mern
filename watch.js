/*
  Used to watch for the changes under src directory and build for development.
*/

process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const config = require('react-scripts/config/webpack.config.js')('development');

config.entry.shift();
config.entry = config.entry.filter(
  entry => !entry.includes('webpackHotDevClient')
);

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
  fs.copySync(paths.appPublic, "./dist", {
    dereference: true,
    filter: file => file !== paths.appHtml
  });

  fs.readdir("./dist", function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        if (file.includes("hot-update")) {
          fs.unlink("./dist/"+file);
        }
    });
  });
}