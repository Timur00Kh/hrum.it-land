import gulp from 'gulp'
import gulpPug from 'gulp-pug'
import browserSync from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import version from 'gulp-version-number'
const sass = gulpSass(dartSass)

const srcFolder = './src'
const buildFolder = './dist'

function pug() {
    return gulp
        .src(`${srcFolder}/index.pug`)
        .pipe(gulpPug())
        .pipe(
            version({
                append: {
                    to: ['css', 'js'],
                },
                output: `${buildFolder}/version.json`,
            })
        )
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

const imgExt = '{png,ico,jpe?g,svg}'
function images() {
    return gulp.src(`${srcFolder}/**/*.${imgExt}`).pipe(gulp.dest(buildFolder))
}

gulp.task('serve', () => {
    browserSync.init({
        server: buildFolder,
    })

    gulp.watch(`${srcFolder}/**/*.(pug|js)`, pug).on(
        'change',
        browserSync.reload
    )
    gulp.watch(`${srcFolder}/**/*.scss`, buildStyles).on(
        'change',
        browserSync.reload
    )
    gulp.watch(`${srcFolder}/**/*.${imgExt}`, images).on(
        'change',
        browserSync.reload
    )
})

const build = gulp.series(pug, buildStyles, images)

gulp.task('default', build)
