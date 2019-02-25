/*
	Used to move files from default build directory to client directory
*/

process.env.NODE_ENV = 'production';

const fs = require('fs-extra');

buildPath = "./build";
clientPath = "./client";


function copyBuildFolder() {
  fs.move(buildPath, clientPath, { overwrite: true }, err => {
    if (err) return console.error(err)

    console.log('success!')
  })
}

copyBuildFolder();