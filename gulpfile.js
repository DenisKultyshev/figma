var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglifyjs'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.+(sass|scss)')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/jquery-3.2.1.min.js',
		'app/libs/pjax/jquery.pjax.js',
		'app/libs/waypoints/waypoints.min.js',
		'app/libs/animate/animate-css.js',
		'app/libs/plugins-scroll/plugins-scroll.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant]
		})))
		.pipe(gulp.dest('dist/img'))
});

gulp.task('clean', function() {
	return del.sync('dist')
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/libs.min.css',
			'app/css/fonts.css',
			'app/css/media.css',
			'app/css/normalize.css'
		])
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildModrnzr = gulp.src('app/libs/modernizr/modernizr.js')
		.pipe(gulp.dest('dist/libs/modernizr'));

	var buildHTML = gulp.src('app/**/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('watch',['browser-sync', 'css-libs', 'scripts' ], function() {
	gulp.watch('app/sass/**/*.+(sass|scss)', ['sass'])
	gulp.watch('app/css/media.css', browserSync.reload)
	gulp.watch('app/**/*.html', browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
});