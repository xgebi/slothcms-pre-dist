const gulp = require('gulp')
const shell = require('gulp-shell')
const runSequence = require("run-sequence");
const watch = require('gulp-watch');

gulp.task('install-fe', () => {
	return gulp
		.src('./')
		.pipe(shell([
			'cd ../sloth-admin && npm install'
		]));
})

gulp.task("build-fe", () => {
	return gulp
		.src("./")
		.pipe(shell([
			"cd ../sloth-admin && npm run build"
		]));
});

gulp.task("clean", () => {
	return gulp
		.src("./")
		.pipe(shell([
			"rm -rf dist"
		]));
});

gulp.task("copy-be", () => {
	return gulp
		.src("./")
		.pipe(shell([
			"rsync -ruPE ../sloth-admin-api/src/ dist/slothcms/sloth-admin-api/"
		]));
});

gulp.task("copy-fe", () => {
	return gulp
		.src("./")
		.pipe(shell([
			"rsync -ruPE ../sloth-admin/dist/ dist/slothcms/sloth-admin/"
		]));
});

gulp.task("create-folders", () => {
	return gulp
		.src("./")
		.pipe(shell([
			"mkdir dist && \
			mkdir dist/slothcms"
		]));
});

gulp.task("fe", () => {
	runSequence('install-fe','build-fe', 'copy-fe');
});

gulp.task("be", () => {
	runSequence('copy-be');
});

gulp.task("all", () => {
	gulp.start('fe', 'be');
});

gulp.task("clean-all", () => {
	runSequence(
		'clean',
		'create-folders',
		'all'
	);
});

/* watchers */

gulp.task('watch-fe-src', () => {
	return watch('../sloth-admin/src/**/*', () => {
		runSequence('build-fe', 'copy-fe');
	});
});

gulp.task('watch-be', () => {
	return watch('../sloth-admin-api/src/**/*', () => {
		gulp.start('copy-be');
	});
});


gulp.task('watch-all', () => {
	return gulp.start('watch-fe-src', 'watch-be')
});
