var gulp = require('gulp');
var Elixir = require('laravel-elixir');
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

var paths = {
    jquery: "vendor/jquery",
    bootstrap: "vendor/bootstrap",
    lodash: "vendor/lodash",
    underscore: "vendor/underscore",
    angular: "vendor/angular",
    angularSanitize: "vendor/angular-sanitize",
    angularBootstrap: "vendor/angular-bootstrap",
    angularUiRouter: "vendor/angular-ui-router",
    angularGoogleMaps: "vendor/angular-google-maps",
    angularSimpleLogger: "vendor/angular-simple-logger",
    angularLocalStorage: "vendor/angular-local-storage",
    fontAwesome: 'vendor/font-awesome',
}

Elixir(function (mix) {

    mix.less("app.less");

    mix.copy('resources/' + paths.fontAwesome + '/fonts', 'public/fonts');

    mix.styles([
        paths.fontAwesome + "/css/font-awesome.min.css"
    ], 'public/css/vendor.css', 'resources');

    mix.scripts([
        paths.jquery + "/dist/jquery.js",
        paths.bootstrap + "/dist/js/bootstrap.js",
        paths.lodash + "/dist/lodash.js",
        paths.underscore + "/underscore.js",
        paths.angular + "/angular.js",
        paths.angularSanitize + "/angular-sanitize.js",
        paths.angularSimpleLogger + "/dist/angular-simple-logger.js",
        paths.angularBootstrap + "/ui-bootstrap-tpls.js",
        paths.angularUiRouter + "/release/angular-ui-router.js",
        paths.angularGoogleMaps + "/dist/angular-google-maps.js",
        paths.angularLocalStorage + "/dist/angular-local-storage.js"
    ], 'public/js/vendor.js', 'resources')
});