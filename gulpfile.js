import gulp from 'gulp'
import gulpPug from 'gulp-pug'
import browserSync from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import version from 'gulp-version-number'
import { Transform } from 'stream'
const sass = gulpSass(dartSass)

const srcFolder = './src'
const buildFolder = './dist'

function pug() {
    // Обрабатываем index.pug отдельно
    const indexFiles = gulp
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

    // Обрабатываем donate.pug отдельно и переименовываем в index.html
    const renameTransform = new Transform({
        objectMode: true,
        transform(file, encoding, callback) {
            // Переименовываем donate.html в index.html
            // file.stem содержит имя файла без расширения
            if (
                file.stem === 'donate' ||
                file.basename === 'donate' ||
                file.basename === 'donate.html'
            ) {
                file.basename = 'index'
                file.extname = '.html'
            }
            callback(null, file)
        },
    })

    const donateFile = gulp
        .src(`${srcFolder}/donate.pug`)
        .pipe(gulpPug())
        .pipe(
            version({
                append: {
                    to: ['css', 'js'],
                },
                output: `${buildFolder}/version.json`,
            })
        )
        .pipe(renameTransform)
        .pipe(gulp.dest(`${buildFolder}/donate`))

    return Promise.all([indexFiles, donateFile])
}

function buildStyles() {
    return gulp
        .src(`${srcFolder}/*.scss`)
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

    gulp.watch(`${srcFolder}/**/*.pug`, pug).on('change', browserSync.reload)
    gulp.watch(`${srcFolder}/**/*.js`, pug).on('change', browserSync.reload)
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
