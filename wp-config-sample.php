<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'dbname' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'password' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY', 'HC :Q!Mc@x3g@sNW_&b@U1SP#i&*d0+jF|%^o>/#iAJE;W--5XC_uOVv%NDL{ 4W' );
define( 'SECURE_AUTH_KEY', 'A{X)FKC2J-9P4Ux(T-R$%}A+|:.iHTfG{w+[=I#+$R@q*bV}uUTnqbN mKw/%0 X' );
define( 'LOGGED_IN_KEY', '$eh!.a/|rL<&Lg|RU~WSrCb.oM!>;E):`,Esh`zA:FS6(wv/D*QL+zm^F7DD~Z6|' );
define( 'NONCE_KEY', 'fH(HcABy)iy$Mr 3?Zn|,6{7I|jFi=LE]$6Y;IjEecTD^A>9CyH{S?m{PT|KNdA}' );
define( 'AUTH_SALT', 'f>0hq}`1::Stvs9/TeMR5g(Ty?.IK%<C.3^=PtY~!b%L(25yG<x[o*A#Lq,pgDr|' );
define( 'SECURE_AUTH_SALT', 'B0Vs#al[T_VkpR1moyuv}Z6s=Sa7r}/=#+)U_4OMq}$:v]3Wa.<uWo;EQr`y1}Ea' );
define( 'LOGGED_IN_SALT', '.+H;4*ej67R $N[FDVmB`i51d+C_ea=0DTRMc1&Rd.E-M>Z[U?sDMWqt<tSMb[^k' );
define( 'NONCE_SALT', 'C)z--2lk8NGjmk-uZkItg@=N-rD2j6tA5 [Z+x0K1b/7_T&csyJl4ytM9tnw@QRa' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpb_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define( 'WPLANG', '' );

/* Custom WordPress URL. */
define ( 'WP_HOME', 'http://dev.example.com' ); // no trailing slash please.
define ( 'WP_SITEURL', WP_HOME . '/cms' );
define ( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/content' );
define ( 'WP_CONTENT_URL', WP_HOME . '/content' );

/**
 * Never use define ( 'UPLOADS', 'wp-content/uploads' );
 * Defining upload path and url here will always be relative to the WP_SITEURL and ABSPATH,
 * which is not how we want to structure our wp setup.
 **/

/* Specify maximum number of Revisions. */
define( 'WP_POST_REVISIONS', '3' );

/* Updates */
//define( 'DISALLOW_FILE_MODS', true ); // turn on in live site
define( 'DISALLOW_FILE_EDIT', true ); // turn on in live site
define( 'WP_AUTO_UPDATE_CORE', true );
// define( 'FTP_USER', 'username' );
// define( 'FTP_PASS', 'password' );
// define( 'FTP_HOST', 'localhost' );


/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define( 'WP_DEBUG', true ); // turn off in live site

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
