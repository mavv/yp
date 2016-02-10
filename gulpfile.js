'use  strict';

const gulp = require('gulp');
const	sass = require('gulp-sass');
const connect = require('gulp-connect');
const	watchify = require('watchify');
const	browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const ngAnnotate = require('browserify-ngannotate');

const paths = {
	html: {
		src: './src/index.html',
		dest: './dest/'
	},
	sass: {
		src: './src/sass/**/*.{scss,sass}',
		dest: './dest/css',
		opts: {}
	},
	js: {
		src: './src/js/app.js',
		srcAll: './src/js/**/*.js',
		dest: './dest/js/'
	}
};

const bOpt = {
	entries: [ paths.js.src ],
	// paths: [ './src/js/controllers/', './src/js/directives/*.js', './src/js/services'],
	transform: [ngAnnotate],
	debug: true
};

const wOpt = Object.assign({}, watchify.args, bOpt);

const libs = [
	'angular',
	'angular-material'
];

// ---------------------------------------------- Gulp Tasks
gulp.task('html', () => {
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest))
		.pipe(connect.reload());
});

// gulp.task('views', () => {
//
// 	return gulp.src('./src/views/**/*')
//   	.pipe(gulp.dest('dist/views/'))
// });

gulp.task('sass', () => {

  return gulp.src(paths.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dest))
		.pipe(connect.reload());
});

gulp.task('jsApp', () => {
  const bundler = watchify(browserify(wOpt));
	return bundler.bundle()
					.on('error', (error) => {
						console.log('browserify error! ' + error);
					})
					.pipe(source('yp.bundle.js'))
					.pipe(buffer())
					.pipe(sourcemaps.init({
						loadMaps: true // loads maps from browserify file
					}))
					.pipe(sourcemaps.write('./'))
					.pipe(gulp.dest(paths.js.dest))
					.pipe(connect.reload());
});

gulp.task('connect', () => {
	connect.server({
		root: './dest/',
		livereload: true
	});
});

// ---------------------------------------------- Gulp Watch
gulp.task('watch:html', () => {
	gulp.watch(paths.html.src, gulp.series('html'));
})

gulp.task('watch:styles', () => {
  gulp.watch(paths.sass.src, gulp.series('sass'));
});

gulp.task('watch:js', () => {
	gulp.watch(paths.js.src, gulp.series('jsApp'));
})


gulp.task('watch', gulp.series('html', 'sass', 'jsApp',
  gulp.parallel('watch:html', 'watch:styles', 'watch:js')
));


// -------------------------------------------- Default task
gulp.task('default', gulp.series(
  gulp.parallel('connect', 'watch')
));
