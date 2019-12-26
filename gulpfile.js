const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');    
const {SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false })
        .pipe(rm());
  });


 
task('copy:scss', () => {
    return src(`${SRC_PATH}/**/*.scss`)
        .pipe(dest(DIST_PATH)); 
});

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(browserSync.reload({stream: true})); 
});

task('copy:img', () => {
    return src(`${SRC_PATH}/img/**`)
        .pipe(dest(DIST_PATH));
});

task('copy:font', () => {
    return src(`${SRC_PATH}/fonts/**`)
        .pipe(dest(`${DIST_PATH}/fonts/`));
});

task('styles', () => {
    return src([...STYLES_LIBS, 'src/styles/main.scss'])
        .pipe(gulpif(env==='dev', sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(px2rem())
        .pipe(gulpif(env==='dev',
            autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS({compatibility: 'ie8'})))        
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('dist'));
});

task('scripts', () => {
    return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
        presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'));
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        open: false
    });
});


watch('./src/styles/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/scripts/*.js', series('scripts'));
task('default', series('clean', parallel('copy:html', 'copy:img', 'copy:font', 'styles', 'scripts'), 'server'));