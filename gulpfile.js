var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var ElixirTypescript = require('elixir-typescript');
var shell = require('gulp-shell');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
Elixir.config.sourcemaps = false;


Elixir.extend('reload', function (message) {

    new Elixir.Task('reload', function () {
        return (
            gulp
                .src('')
                .pipe(shell('echo ' + 'dummy reloader'))
        )
    }).watch('public/**/*.html');

});

var paths = {
    jquery: "vendor/jquery",
    bootstrap: "vendor/bootstrap",
    angular: "vendor/angular",
    angularSanitize: "vendor/angular-sanitize",
    angularUiRouter: "vendor/angular-ui-router"
}

Elixir(function (mix) {

    mix.less("app.less");

    //mix.styles([
    //    paths.bootstrap + "/dist/css/bootstrap.css"
    //], 'public/css/vendor.css', 'resources');

    mix.scripts([
        paths.jquery + "/dist/jquery.js",
        paths.bootstrap + "/dist/js/bootstrap.js",
        paths.angular + "/angular.js",
        paths.angularSanitize + "/angular-sanitize.js",
        paths.angularUiRouter + "/release/angular-ui-router.js"
    ], 'public/js/vendor.js', 'resources')

    mix.typescript('front/app.ts', null, {outFile: 'out.js'});
    mix.typescript('back/app.ts', 'app.js', {module: 'commonjs'});

    mix.reload("reload");

    mix.browserSync({proxy: '192.168.11.10:8888'});
});