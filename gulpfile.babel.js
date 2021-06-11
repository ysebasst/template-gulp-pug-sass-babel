import gulp from "gulp";
import babel from "gulp-babel";
import terser from "gulp-terser";
import concat from "gulp-concat";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import autoprefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import browserSync from "browser-sync";

const server = browserSync.create();

gulp.task("babel", () => {
  console.log("### ### ### JS ### ### ###");
  return gulp
    .src("./src/assets/js/**/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat("scripts-min.js"))
    .pipe(terser())
    .pipe(gulp.dest("./public/assets/js"));
});

gulp.task("pug", () => {
  console.log("### ### ### PUG ### ### ###");
  return gulp
    .src("./src/views/pages/*.pug")
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./public"));
});

gulp.task("sass", () => {
  console.log("### ### ### SASS ### ### ###");
  return gulp
    .src("./src/assets/scss/styles.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(
      rename((path) => {
        path.extname = ".min.css";
      })
    )
    .pipe(gulp.dest("./public/assets/css"));
});

gulp.task("default", () => {
  // SERVER
  server.init({
    server: "./public",
  });
  // JS
  gulp
    .watch("./src/assets/js/**/*.js", gulp.series("babel"))
    .on("change", server.reload);
  // SASS
  gulp
    .watch("./src/assets/scss/**/*.scss", gulp.series("sass"))
    .on("change", server.reload);
  // PUG
  gulp
    .watch("./src/views/**/*.pug", gulp.series("pug"))
    .on("change", server.reload);
});
