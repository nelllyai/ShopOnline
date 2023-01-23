import gulp from 'gulp';
import browserSync from 'browser-sync';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import gulpCssimport from 'gulp-cssimport';
import { deleteAsync } from 'del';

const prepros = true;
const sass = gulpSass(sassPkg);

export const html = () => gulp
  .src('src/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    return gulp.
      src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  }

  return gulp
    .src('src/css/**/*.css')
    .pipe(gulpCssimport({
      extensions: ['css']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
};

export const scripts = () => gulp
  .src('src/scripts/**/*.js')
  .pipe(gulp.dest('dist/scripts'))
  .pipe(browserSync.stream());

export const copy = () => gulp
  .src([
    'src/fonts/**/*',
    'src/img/**/*'
  ], {
    base: 'src'
  })
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream({
    once: true
  }));

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('./src/**/*.html', html);
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
  gulp.watch('./src/scripts/**/*.js', scripts);
  gulp.watch(['./src/img/**/*', './src/fonts/**/*'], copy);
};

export const clear = () => deleteAsync('dist/**/*', {force: true});

export const base = gulp.parallel(html, style, scripts, copy);

export const build = gulp.series(clear, base);

export default gulp.series(base, server); 