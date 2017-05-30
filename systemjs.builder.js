var path = require("path");
var Builder = require('systemjs-builder');
const del = require('del');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('public', 'public/systemjs.config.js');

builder
    .bundle('app/boot.js', './public/js/app/boot.js', { minify: true, encodeNames: false})
    .then(function() {
        del(['./public/js/app/**/*.js', '!./public/js/app/**/{boot.js,*.html,*.htm,*.css}']).then(function (paths) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
        console.log('Build complete');
    })
    .catch(function(err) {
        console.log('Build error');
        console.log(err);
    });