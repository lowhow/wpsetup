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


gulp.task('wp:config', function(){
	if ( wp_config.DB_NAME == 'project_db' || wp_config.DB_NAME == 'mypassword' || wp_config.WP_HOME == 'http://dev.mysite.com' ){
		gulp.src('')
			.pipe( prompt.prompt([{
				type: 'input',
				name: 'DB_NAME',
				message: 'Enter DB_NAME: ',
				validate: function( DB_NAME ){
		            if( DB_NAME == '' ){
		                return false;
		            }
		            wp_config.DB_NAME = DB_NAME;
		            return true;
		        }
			},{
				type: 'input',
				name: 'DB_PASSWORD',
				message: 'Enter DB_PASSWORD: ',
				validate: function( DB_PASSWORD ){
		            if( DB_PASSWORD == '' ){
		                return false;
		            }
		            wp_config.DB_PASSWORD = DB_PASSWORD;
		            return true;
		        }
			},{
				type: 'input',
				name: 'WP_HOME',
				message: 'Enter WP_HOME ("http://dev.mysite.com"):',
				validate: function( WP_HOME ){
		            if( WP_HOME == '' ){
		                return false;
		            }
		            wp_config.WP_HOME = WP_HOME;
		            return true;
		        }
			}], function(res){
				/**
				 * populate wp-config.php
				 */
				gulp.src('wp-config.php')
				.pipe( change( setup_wp_config ) )
				.pipe( gulp.dest('./') )
			}))
			.on('end', function(){
				console.log( 'DB_NAME: ' + wp_config.DB_NAME + '\nDB_PASSWORD: ' + wp_config.DB_PASSWORD + '\nWP_HOME: ' + wp_config.WP_HOME );
				/**
				 * Create database
				 */
				var shellCommand = '/Applications/MAMP/Library/bin/mysql -u'+wp_config.DB_USER+' -p'+wp_config.DB_PASSWORD+' -e "CREATE DATABASE '+wp_config.DB_NAME+' DEFAULT CHARACTER SET '+wp_config.DB_CHARSET+' DEFAULt COLLATE '+wp_config.DB_COLLATE+'"';
				gulp.src('')
					.pipe(shell([shellCommand]))
					.on('end', function(){
						/**
						 * Run composer install
						 */
						composer();
					});
				console.log('\n\x1b[32m%s\x1b[0m', 'Database created!');

			});
	}
});
