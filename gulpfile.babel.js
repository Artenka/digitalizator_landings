import gulp from 'gulp';
import sass from 'gulp-sass';
import jade from 'gulp-jade';
import autoprefixer from 'gulp-autoprefixer';
var webserver = require('gulp-webserver');

gulp.task('server', function() {
	gulp.src('./')
			.pipe(webserver({
				livereload: true,
				directoryListing: true,
				open: true
			}));
});

gulp.task('sass', () => {
	return gulp.src('./source/markup/sass/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({ browsers:['last 4 versions'] }))
		.pipe(gulp.dest('./public/css'))
});

gulp.task('jade', () => {
	gulp.src('./source/markup/jade/views/*.jade')
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('./public'));
});

gulp.task('build', ['sass', 'jade']);

gulp.task('default', ['sass', 'jade'], () => {
	gulp.watch('./source/markup/jade/**/*.jade', ['jade']);
	gulp.watch('./source/markup/sass/**/*.scss', ['sass']);
});