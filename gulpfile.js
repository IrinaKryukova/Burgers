const { src, dest, task, series, watch } = require('gulp');
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

sass.compiler = require('node-sass');

task('clean', () => {
    return src( 'dist/**/*', { read: false })
        .pipe(rm());
  });


 
task('copy:scss', () => {
    return src('src/**/*.scss')
        .pipe(dest('dist')); 
});

task('copy:html', () => {
    return src('src/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.reload({stream: true})); 
});

task('copy:img', () => {
    return src('src/img/**')
        .pipe(dest('dist'));
});

task('copy:font', () => {
    return src('src/fonts/**')
        .pipe(dest('dist/fonts/'));
});

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/styles/main.scss'
]

task('styles', () => {
    return src(styles)
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
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist'));
});

const libs = [
    'node_modules/jquery/dist/jquery.js',
    'src/scripts/*.js'
]

task('scripts', () => {
    return src(libs)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', { newLine: ';'}))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});


watch('./src/styles/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/scripts/*.js', series('scripts'));
task('default', series('clean', 'copy:scss', 'copy:html', 'copy:img', 'copy:font', 'styles', 'scripts', 'server'));