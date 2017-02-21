var wp_config = {
	DB_NAME: 	'project_db',
	DB_USER: 	'root',
	DB_PASSWORD: 'mypassword',
	WP_HOME: 	'http://dev.mysite.com',
	DB_COLLATE: 'utf8_unicode_ci',
	DB_CHARSET: 'utf8'
};

var util = require('util');
var gulp = require('gulp');
var shell = require('gulp-shell');
var prompt = require('gulp-prompt');
var composer = require('gulp-composer');
var change = require('gulp-change');

function setup_wp_config(content){
	return content.replace( /database_name_here/g, wp_config.DB_NAME )
		.replace( /username_here/g, wp_config.DB_USER )
		.replace( /password_here/g, wp_config.DB_PASSWORD )
		.replace( /http:\/\/dev.example.com/g, wp_config.WP_HOME )
		.replace( /charset_here/g, wp_config.DB_CHARSET )
		.replace( /collate_here/g, wp_config.DB_COLLATE );
}

gulp.task('wp:create', function(){
	/**
	 * populate wp-config.php
	 */
	gulp.src('wp-config.php')
	.pipe( change( setup_wp_config ) )
	.pipe( gulp.dest('./') )

	/**
	 * Run composer install
	 */
	composer();

	/**
	 * Create database
	 */
	var shellCommand = '/Applications/MAMP/Library/bin/mysql -u'+wp_config.DB_USER+' -p'+wp_config.DB_PASSWORD+' -e "CREATE DATABASE '+wp_config.DB_NAME+' DEFAULT CHARACTER SET '+wp_config.DB_CHARSET+' DEFAULt COLLATE '+wp_config.DB_COLLATE+'"';
	gulp.src('').pipe(shell([shellCommand]));
	console.log('\n\x1b[32m%s\x1b[0m', 'Database created!');
});


