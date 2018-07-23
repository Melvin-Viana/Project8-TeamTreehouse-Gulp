"use strict";

const gulp = require("gulp"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  uglifyCss= require('gulp-uglifycss'),
  maps = require("gulp-sourcemaps"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  image = require("gulp-imagemin"),
  sequence = require("run-sequence").use(gulp),
  del = require("del"),
  browserSync = require("browser-sync").create();

/* gulp scripts command:
1. Concatenate
2. Minify
3. Copy file into dist/scripts
4.Place source maps in dist/scripts
*/
gulp.task("scripts", () => {
  gulp
    .src(["js/circle/autogrow.js", "js/circle/circle.js"])
    .pipe(concat("all.js")) //Concatenation    .pipe(maps.init())
    .pipe(maps.init())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
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
  return gulp
    .src("sass/global.scss")
    .pipe(
      sass().on("error", function(err) {
        console.error(err.message);
        this.emit("end"); // Prevent gulp from catching the error and exiting the watch process
      })
    )
    .pipe(sass())
    .pipe(maps.init())
    .pipe(uglifyCss())
    .pipe(rename('all.min.css'))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("dist/styles"))
    .pipe(browserSync.stream());
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
  return del(["dist/*"]);
});

//=====================================
//gulp build:
//Runs clean command first then scripts,styles, and images
gulp.task("build", ["clean"], () => {
  //Place index.html in dist folder
  gulp.src("index.html")
  .pipe(gulp.dest("dist"));
  //Create dist data
  return sequence(["images", "scripts", "styles"]);
});
//================================================
//gulp default:
gulp.task("default", ["build"], () => {

  /*This creates a web server and inserts public files into webserver and runs index.html*/
  browserSync.init({
    server: "dist",
    port: 3000,
    notify: false
  });
  
  gulp.watch("./sass/**/*.scss", ["styles"]);
  gulp.watch("sass/**/*.scss").on("change", browserSync.reload);

  //Kills process when gulpfile.js is changed
  gulp.watch("gulpfile.js").on("change", () => process.exit(0));
});
