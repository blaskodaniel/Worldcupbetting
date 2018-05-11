var gulp = require("gulp");
var path = require('path');
var source = require('vinyl-source-stream'); // form gulp stream
var babel = require('gulp-babel');
var log = require('fancy-log');
var rimraf = require('rimraf'); // delete dist folder
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var globalPaths = {
    wwwfolder: ['192.168.1.136/raspi/API_Server/test/'],
    distfolder: ['./dist/*.*']
};

// Copy views to dist folder
gulp.task("deploy", function() {
    return gulp.src(globalPaths.distfolder)
        .pipe(gulp.dest(globalPaths.wwwfolder));
});

// Cleaner
gulp.task('cleaner', function(cb) {
    rimraf('./dist', cb);
});

// Main task:
gulp.task("default", ["deploy"], function() {});