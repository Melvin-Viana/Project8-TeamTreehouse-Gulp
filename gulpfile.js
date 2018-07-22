"use strict";

const gulp = require("gulp"),
  concat = require("gulp-concat"),
  minify = require("gulp-minify"),
  maps = require("gulp-sourcemaps"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  image = require("gulp-image"),
  sequence = require("run-sequence").use(gulp),
  del = require("del");

/* gulp scripts command:
1. Concatenate
2. Minify
3. Copy file into dist/scripts
4.Place source maps in dist/scripts
*/
gulp.task("scripts", () => {
  gulp
    .src(["js/circle/autogrow.js", "js/circle/circle.js"])
    .pipe(concat("js/all.js")) //Concatenation    .pipe(maps.init())
    .pipe(minify())
    .pipe(maps.init())
    .pipe(rename("all.min.js")) //This file will be copied to dist/scripts
    .pipe(maps.write("./"))
    .pipe(gulp.dest("dist/scripts"));
});
//==============================================================

/*gulp styles command:
  1.Concatenate
  2.Minify CSS
  3.Copy files into dist/styles
  4.Place source maps in dist/styles
  */
gulp.task("styles", () => {
  gulp
    .src("sass/global.scss")
    .pipe(sass())
    .pipe(maps.init())
    .pipe(minify())
    .pipe(rename("all.min.css"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("dist/styles"));
});

//==============================================

/*gulp images command: 
1.Optimize the size of the JPEG and PNG files
2. Copy files to dist/content
*/
gulp.task("images", () => {
  gulp
    .src(["images/*.*"])
    .pipe(image())
    .pipe(gulp.dest("dist/content"));
});

//=====================================

//gulp clean: Delete all folders/files from dist folder
gulp.task("clean", () => {
  del(["dist/*"]);
});

//=====================================
//gulp build:
//Runs clean command first then scripts,styles, and images
gulp.task("build", ["clean"], () => {
 //Create dist data  
 sequence("scripts", "styles", "images");
  //Copy index.html into dist folder
  gulp
  .src("index.html")
  .pipe(gulp.dest("dist"));
});

//================================================
gulp.task("localServer", () => {
  const express = require("express");
  const app = express();

  app.use(express.static("dist"));

  app.listen(process.env.PORT || 3000, () =>
    console.log("Index.html is running on localhost:3000")
  );
});

//================================================
//gulp default:
gulp.task("default", ["build"], () => {
  /*This creates a web server and inserts public files into webserver and runs index.html*/
  sequence("localServer");
});
