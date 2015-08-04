var gulp = require( 'gulp' ),
    eslint = require( 'gulp-eslint' );

gulp.task( 'lint', function() {
    gulp.src( 'lib/*.js' )
        .pipe( eslint() )
        .pipe( eslint.format() );
} );
