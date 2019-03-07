var gulp = require('gulp'),
    remoteSrc = require('gulp-remote-src'),
    argv = require('yargs').argv,
    replace = require('gulp-replace'),
    fs = require('fs');

gulp.task('fetch-corporate-ui-css', function() {
    var corporateUIVersion = argv.cuiversion || '3.5.2';

    return remoteSrc(['corporate-ui.css', 'core.css'], {
        base: 'https://d31jnweo1ynb8u.cloudfront.net/build/global/' + corporateUIVersion + '/css/'
    })
        .pipe(replace('\'/resources/' , '\'https://static.scania.com/resources/'))
        .pipe(gulp.dest('./css/corporate-ui/'));
});

gulp.task('fetch-font-awesome-pro', function() {

    return remoteSrc('all.min.css', {
        base: 'https://d31jnweo1ynb8u.cloudfront.net/resources/icons/font-awesome/5.3.1/css/'
    })
        .pipe(gulp.dest('./css/font-awesome/'));
});

gulp.task('default', gulp.series([
    'fetch-corporate-ui-css',
    'fetch-font-awesome-pro'
]));