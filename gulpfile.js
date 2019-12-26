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
/*
const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/styles/main.scss'
]
*/

task('styles', () => {
    return src([...STYLES_LIBS, 'src/styles/main.scss'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(px2rem())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(gcmq())
        .pipe(cleanCSS({compatibility: 'ie8'}))        
        .pipe(sourcemaps.write())
        .pipe(dest('dist'));
});

//const libs = [
//    'node_modules/jquery/dist/jquery.js',
//    'src/scripts/*.js'
//]

task('scripts', () => {
    return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', { newLine: ';'}))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});


watch(`./${SRC_PATH}/styles/**/*.scss`, series('styles'));
watch(`./${SRC_PATH}/*.html`, series('copy:html'));
watch(`./${SRC_PATH}/scripts/*.js`, series('scripts'));
task('default', series('clean', parallel('copy:scss', 'copy:html', 'copy:img', 'copy:font', 'styles', 'scripts'), 'server'));