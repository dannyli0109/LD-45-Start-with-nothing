const gulp = require('gulp')
const express = require('express')
const browserify = require('browserify')
const path = require('path')
const source = require('vinyl-source-stream')
const buffer = require('gulp-buffer')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const gutil = require('gulp-util')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat');




sass.compiler = require('node-sass')


const buildSource = () => {

    return gulp.src('src/**/*.js', { sourcemaps: true })
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream())

    // const bundler = browserify('./src/main')

    // return bundler
    //     .bundle()
    //     .pipe(source('build.js'))
    //     .pipe(buffer())
    //     .pipe(babel({
    //         presets: ['@babel/env']
    //     }))
    //     .pipe(gulp.dest('build'))
    //     .pipe(browserSync.stream())
}

const buildIndex = () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream())
}

const buildStyles = () => {
    return gulp.src('src/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream())
}

const buildResources = () => {
    return gulp.src('src/assets/*')
        .pipe(gulp.dest('build/assets'))
}

const build = gulp.series(buildSource, buildIndex, buildStyles, buildResources)

const watch = () => {
    gulp.watch('src/**/*.js', buildSource)
    gulp.watch('src/style.scss', buildStyles)
    gulp.watch('src/index.html', buildIndex)
    gulp.watch('src/assets/*', buildResources)
}

const serve = () => {
    browserSync.init({
        server: "./build"
    })
    const htdocs = path.resolve(__dirname, 'build')

    const app = express()
    app.use(express.static(htdocs))
    app.listen(3000, () => {
        gutil.log("Server started on '" + gutil.colors.green('http://localhost:3000') + "'")
    })
}


exports.build = build
exports.serve = serve
exports.watch = watch



