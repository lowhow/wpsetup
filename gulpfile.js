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
	return content.replace( /define\( 'DB_NAME'(.*);/g, 'define( \'DB_NAME\', \''+wp_config.DB_NAME+'\' );' )
		.replace( /define\( 'DB_USER'(.*);/g, 'define( \'DB_USER\', \''+wp_config.DB_USER+'\' );' )
		.replace( /define\( 'DB_PASSWORD'(.*);/g, 'define( \'DB_PASSWORD\', \''+wp_config.DB_PASSWORD+'\' );' )
		.replace( /define\( 'WP_HOME'(.*)/g, 'define( \'WP_HOME\', \''+wp_config.WP_HOME+'\' ); \/\/ no trailing slash please.' )
		.replace( /define\( 'DB_CHARSET'(.*);/g, 'define( \'DB_CHARSET\', \''+wp_config.DB_CHARSET+'\' );' )
		.replace( /define\( 'DB_COLLATE'(.*);/g, 'define( \'DB_COLLATE\', \''+wp_config.DB_COLLATE+'\' );' );
}

gulp.task('composer', function(){
	composer();
});

gulp.task('default', function(){
	gulp.src('')
		.pipe( prompt.prompt([{
			type: 'input',
			name: 'DB_NAME',
			message: 'Enter DB_NAME: ',
			validate: function( DB_NAME ){
	            if( DB_NAME === '' ){
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
	            if( DB_PASSWORD === '' ){
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
	            if( WP_HOME === '' ){
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
			.pipe( gulp.dest('./') );
		}))
		.on('end', function(){
			console.log( 'DB_NAME: ' + wp_config.DB_NAME + '\nDB_PASSWORD: ' + wp_config.DB_PASSWORD + '\nWP_HOME: ' + wp_config.WP_HOME );
			/**
			 * Create database
			 */
			var shellCommand = '/Applications/MAMP/Library/bin/mysql -u'+wp_config.DB_USER+' -p'+wp_config.DB_PASSWORD+' -e "CREATE DATABASE '+wp_config.DB_NAME+' DEFAULT CHARACTER SET '+wp_config.DB_CHARSET+' DEFAULt COLLATE '+wp_config.DB_COLLATE+'"';

			gulp.src('')
				.pipe(shell([shellCommand]));
			console.log('\n\x1b[32m%s\x1b[0m', 'Database created!');
			console.log('Ready to run " gulp composer "');
		});
});
