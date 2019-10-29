var gulp = require('gulp'),
    remoteSrc = require('gulp-remote-src'),
    argv = require('yargs').argv,
    replace = require('gulp-replace'),
    fs = require('fs'),
    prependFile = require('prepend-file'),
    cuiVersion = '3.5.3-1',
    config = { corporateUIVersion: cuiVersion };

gulp.task('fetch-corporate-ui-css', function() {
    cuiVersion = argv.cuiversion || cuiVersion;
    config.corporateUIVersion = cuiVersion;
    return remoteSrc(['corporate-ui.css', 'core.css'], {
        base: 'https://d31jnweo1ynb8u.cloudfront.net/build/global/' + cuiVersion + '/css/'
    })
        .pipe(replace('\'/resources/' , '\'https://static.scania.com/resources/'))
        .pipe(replace('core.css\"', 'core.css?v='+ cuiVersion + '\"' ))
        .pipe(gulp.dest('./css/corporate-ui/'));
});

gulp.task('fetch-font-awesome-pro', function() {

    return remoteSrc('all.min.css', {
        base: 'https://d31jnweo1ynb8u.cloudfront.net/resources/icons/font-awesome/5.3.1/css/'
    })
        .pipe(gulp.dest('./css/font-awesome/'));
});

gulp.task('config', function(done) {
    var content = `window.corparateUiLightConfig=${JSON.stringify(config)};`;
    fs.writeFileSync('config.js', content);
    done();
});

gulp.task('apply-overrides', function (done) {
    var content = `@import url("cui-overrides.css");`;
    prependFile('./css/corporate-ui/corporate-ui.css', content, function(err, result) {
        if(err) console.log('error', err);
    });
    done();
});

gulp.task('default', gulp.series([
    'fetch-corporate-ui-css',
    'config'
]));
