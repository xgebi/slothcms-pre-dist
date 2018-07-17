const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('default', () => {
  return gulp
	.src('../sloth-admin-api')
  	.pipe(shell([
		'cd ../sloth-admin-api && composer install'
  	]))
})
