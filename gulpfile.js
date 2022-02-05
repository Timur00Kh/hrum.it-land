import gulp from 'gulp'
import gulpPug from 'gulp-pug'
import browserSync from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
const sass = gulpSass(dartSass)

const srcFolder = './src'
const buildFolder = './dist'

function pug() {
    return gulp
        .src(`${srcFolder}/*.pug`)
        .pipe(gulpPug())
        .pipe(gulp.dest(buildFolder))
}

function buildStyles() {
    return gulp
        .src(`${srcFolder}/index.scss`)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(gulp.dest(buildFolder))
}

function images() {
    return gulp
        .src(`${srcFolder}/*.{png,ico,jpe?g}`)
        .pipe(gulp.dest(buildFolder))
}

gulp.task('serve', () => {
    browserSync.init({
        server: buildFolder,
    })

    gulp.watch(`${srcFolder}/*.(pug|js)`, pug).on('change', browserSync.reload)
    gulp.watch(`${srcFolder}/*.scss`, buildStyles).on(
        'change',
        browserSync.reload
    )
    gulp.watch(`${srcFolder}/**/*.(jpe?g|png|ico|webp)`, images).on(
        'change',
        browserSync.reload
    )
})

const build = gulp.series(pug, buildStyles, images)

gulp.task('default', build)