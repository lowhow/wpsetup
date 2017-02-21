var wp_config = {
	DB_NAME: 	'project_db',
	DB_USER: 	'root',
	DB_PASSWORD: '20070604',
	WP_HOME: 	'http://dev.mysite.com'
};

var gulp = require('gulp');
var composer = require('gulp-composer');
var change = require('gulp-change');

function resetDBInfo(content){
	return content.replace( /database_name_here/g, wp_config.DB_NAME )
		.replace( /username_here/g, wp_config.DB_USER )
		.replace( /password_here/g, wp_config.DB_PASSWORD )
		.replace( /http:\/\/dev.example.com/g, wp_config.WP_HOME );
}

gulp.task('setupDB', function(){
	return gulp.src('wp-config.php')
	.pipe( change( resetDBInfo ) )
	.pipe( gulp.dest('./') )
});

gulp.task('composer', function () {
    composer();
});
