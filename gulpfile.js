"use strict";

const gulp = require("gulp"),
  concat = require("gulp-concat"),
  minify = require("gulp-minify"),
  maps   = require("gulp-sourcemaps"),
  sass = require("gulp-sass");


//Concatenate JS files into global.js
gulp.task("concatJS", () => {
  gulp
    .src(["js/circle/autogrow.js", "js/circle/circle.js"])
    .pipe(maps.init())              //Creates source map
    .pipe(concat('js/global.js'))   //Concatenation
    .pipe(maps.write("./"))         //Designates location of source map
    .pipe(gulp.dest("./"));         //Places all files within the js directory.
});

//Compile Sass into CSS
gulp.task("compileSass", () => {
    return gulp
      .src("sass/global.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write("./")) //Creates a file relative to directory
      .pipe(gulp.dest("css"));
  });