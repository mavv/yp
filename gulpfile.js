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
const templateCache = require('gulp-angular-templatecache');
const rimraf = require('rimraf');
const svgSprite  = require('gulp-svg-sprite');

const paths = {
	assets: {
		src: './src/assets/*.svg',
		dest: './dest/assets/'
	},
	html: {
		src: './src/index.html',
		dest: './dest/',
		views: './src/js/views/**/*.html'
	},
	sass: {
		src: './src/sass/**/*.{scss,sass}',
		dest: './dest/css/',
		opts: {}
	},
	js: {
		src: './src/js/app.js',
		srcAll: './src/js/**/*.js',
		dest: './dest/js/',
		destTemplates: './src/js/'
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

gulp.task('static', () => {
	return gulp.src(paths.assets.src)
					.pipe(gulp.dest(paths.assets.dest))
});

// TODO: prepare to sprite svg's
// gulp.task('assets', () => {
// 	return gulp.src(paths.assets.src)
// 					.pipe(svgSprite({
// 						mode: {
// 							css: {
// 								render: {
// 									scss: true
// 								}
// 							}
// 						}
// 					}))
// 					.on('error', (error) => {
// 						console.log('spriting svgs errored with ', error);
// 					 /* Do some awesome error handling ... */
// 					 })
// 					.pipe(gulp.dest(paths.assets.dest));
// });

gulp.task('html', () => {
	return gulp.src(paths.html.src)
					.pipe(gulp.dest(paths.html.dest))
					.pipe(connect.reload());
});

gulp.task('views-cache', () => {
	console.log('\nbuilding views-cache\n');

	return gulp.src(paths.html.views)
					.on('error', (error) => {
						console.log('views-cache errored ' + error);
					})
					.pipe(templateCache({
						module: 'root',
						moduleSystem: 'IIFE'
					}))
					.pipe(gulp.dest(paths.js.destTemplates));
});

gulp.task('sass', () => {
	console.log('\nbuilding sass\n');
  return gulp.src(paths.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dest))
		.pipe(connect.reload());
});

gulp.task('js-bundle', () => {
	console.log('\nbuilding js bundle\n');
  const bundler = watchify(browserify(wOpt));

	return bundler
					.bundle()
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

gulp.task('clean', () => {
	// return gulp.src('./dest/**/*', { read: false }) // much faster
  //  .pipe(rimraf({
	// 	 force: true
	//  }));

	// console.log('\nclean dest\n');
	rimraf('./dest', (err) => {
		throw (err);
	});
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
	gulp.watch(paths.js.src, gulp.series('views-cache', 'js-bundle'));
});

gulp.task('watch:views', () => {
	gulp.watch(paths.html.views, gulp.series('views-cache'));
});


gulp.task('watch', gulp.series(
	'clean',
	'static',
	'html',
	'sass',
	'views-cache',
	'js-bundle',
  gulp.parallel('watch:html', 'watch:styles',
	'watch:views',
	'watch:js')
));

// -------------------------------------------- Default task
gulp.task('default', gulp.series(
  gulp.parallel('connect', 'watch')
));
