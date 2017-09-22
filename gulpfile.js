/**Created by Loki.Luo on 2016/7/25 **/

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    htmlmin = require('gulp-htmlmin'),
    imageop = require('gulp-image-optimization'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    rev = require('gulp-rev'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    revCollector = require('gulp-rev-collector'),
    server = require('gulp-devserver'),
    source = require('vinyl-source-stream'),
    buffer2 = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps');
    sequence = require('gulp-sequence');
    sync = require('browser-sync');
    //pump = require('pump');
var destPath = './gulp-dist';
var temPath = './gulp-tem';

var htmlOption = {
    removeComments:true,
    collapseWhitespace:true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
};
gulp.task('htmlmin',function(){
    return gulp.src(["app/*.html","app/**/**/*.html","app/**/**/*.html"])
            .pipe(htmlmin(htmlOption))
            .pipe(gulp.dest(destPath));
});

gulp.task('css',function(){
    return gulp.src(["app/lib/sass-css/*.css","!app/lib/sass-css/*.min.css","app/component/*/*.scss"])
            
            .pipe(sass().on('error', sass.logError))
            //.pipe(gulp.dest(destPath));

            .pipe(concatCss('main.css'))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(gulp.dest(temPath))

            .pipe(cssmin())
            .pipe(rename({suffix:'.min'}))
            
            .pipe(rev())
            //.pipe(gulp.dest(destPath))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(destPath+'/main'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(destPath))
            
});

gulp.task("js",function(){
    return gulp.src([
            "app/module/*.js",
            "app/*.js",
            "app/server/*.js",
            "app/directive/*.js",
            "app/component/*/*.js"
            ])

            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(concat("main.js"))
            .pipe(gulp.dest(temPath))

            .pipe(uglify({mangle   : true}))
            .pipe(rename({suffix:'.min'}))
            .pipe(rev())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(destPath+'/main'))

            .pipe(rev.manifest(destPath+'/rev-manifest.json',{base: process.cwd()+destPath,merge: true}))
            .pipe(gulp.dest(destPath))
            
});

gulp.task('revCollector',function(){
    return gulp.src([destPath+'/rev-manifest.json','app/index.html'])
         .pipe(revCollector())
         .pipe(htmlmin(htmlOption))
         .pipe(gulp.dest(destPath));
});

gulp.task('lint', function() {
  return gulp.src(['app/*.js','app/*/*.js','app/*/*/*.js','!app/lib'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean',function(){
    return gulp.src([destPath+'/*',"!"+destPath+"/lib","!"+destPath+"/images","!"+destPath+"/test-data"])
          .pipe(clean({force:true}))
});

gulp.task('copyjs',function(){
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        ])
        .pipe(gulp.dest(destPath+'/lib/javascript'))
});
gulp.task('copycss',function(){
    return gulp.src([
        './app/lib/sass-css/*.min.css'
        ])
        .pipe(gulp.dest(destPath+'/lib/css'))
});
gulp.task('copyfont',function(){
    return gulp.src([
        './app/lib/font/*.*'
        ])
        .pipe(gulp.dest(destPath+'/lib/font'))
});
// gulp.task('copyimg',function(){
//     return gulp.src([
//         './app/images/*.*'
//         ])
//         .pipe(gulp.dest(destPath+'/images'))
// });
gulp.task('copyimg',function(){
    return gulp.src([
        './app/images/*'
        ])
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(destPath+'/images'))
});
gulp.task('copydata',function(){
    return gulp.src([
        './app/test-data/*.*'
        ])
        .pipe(gulp.dest(destPath+'/test-data'))
});

gulp.task("watch",function(){
    sync({
        server: {
            baseDir: "./"
        },
        open: false,
        port:8088
    });
    gulp.watch('app/**/*.*',['default',sync.reload])
});

gulp.task('copy', function(callback) {
    sequence('copyjs','copycss','copyfont','copyimg','copydata')(callback)
});

gulp.task('default', function(callback) {
    sequence('clean',['htmlmin','css','js'],'revCollector')(callback)
});
/**Created by Loki.Luo on 2016/7/25 **/

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    htmlmin = require('gulp-htmlmin'),
    imageop = require('gulp-image-optimization'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    rev = require('gulp-rev'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    revCollector = require('gulp-rev-collector'),
    server = require('gulp-devserver'),
    source = require('vinyl-source-stream'),
    buffer2 = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps');
    sequence = require('gulp-sequence');
    sync = require('browser-sync');
    //pump = require('pump');
var destPath = './gulp-dist';
var temPath = './gulp-tem';

var htmlOption = {
    removeComments:true,
    collapseWhitespace:true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
};
gulp.task('htmlmin',function(){
    return gulp.src(["app/*.html","app/**/**/*.html","app/**/**/*.html"])
            .pipe(htmlmin(htmlOption))
            .pipe(gulp.dest(destPath));
});

gulp.task('css',function(){
    return gulp.src(["app/lib/sass-css/*.css","!app/lib/sass-css/*.min.css","app/component/*/*.scss"])
            
            .pipe(sass().on('error', sass.logError))
            //.pipe(gulp.dest(destPath));

            .pipe(concatCss('main.css'))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(gulp.dest(temPath))

            .pipe(cssmin())
            .pipe(rename({suffix:'.min'}))
            
            .pipe(rev())
            //.pipe(gulp.dest(destPath))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(destPath+'/main'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(destPath))
            
});

gulp.task("js",function(){
    return gulp.src([
            "app/module/*.js",
            "app/*.js",
            "app/server/*.js",
            "app/directive/*.js",
            "app/component/*/*.js"
            ])

            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(concat("main.js"))
            .pipe(gulp.dest(temPath))

            .pipe(uglify({mangle   : true}))
            .pipe(rename({suffix:'.min'}))
            .pipe(rev())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(destPath+'/main'))

            .pipe(rev.manifest(destPath+'/rev-manifest.json',{base: process.cwd()+destPath,merge: true}))
            .pipe(gulp.dest(destPath))
            
});

gulp.task('revCollector',function(){
    return gulp.src([destPath+'/rev-manifest.json','app/index.html'])
         .pipe(revCollector())
         .pipe(htmlmin(htmlOption))
         .pipe(gulp.dest(destPath));
});

gulp.task('lint', function() {
  return gulp.src(['app/*.js','app/*/*.js','app/*/*/*.js','!app/lib'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean',function(){
    return gulp.src([destPath+'/*',"!"+destPath+"/lib","!"+destPath+"/images","!"+destPath+"/test-data"])
          .pipe(clean({force:true}))
});

gulp.task('copyjs',function(){
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        ])
        .pipe(gulp.dest(destPath+'/lib/javascript'))
});
gulp.task('copycss',function(){
    return gulp.src([
        './app/lib/sass-css/*.min.css'
        ])
        .pipe(gulp.dest(destPath+'/lib/css'))
});
gulp.task('copyfont',function(){
    return gulp.src([
        './app/lib/font/*.*'
        ])
        .pipe(gulp.dest(destPath+'/lib/font'))
});
// gulp.task('copyimg',function(){
//     return gulp.src([
//         './app/images/*.*'
//         ])
//         .pipe(gulp.dest(destPath+'/images'))
// });
gulp.task('copyimg',function(){
    return gulp.src([
        './app/images/*'
        ])
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(destPath+'/images'))
});
gulp.task('copydata',function(){
    return gulp.src([
        './app/test-data/*.*'
        ])
        .pipe(gulp.dest(destPath+'/test-data'))
});

gulp.task("watch",function(){
    sync({
        server: {
            baseDir: "./"
        },
        open: false,
        port:8088
    });
    gulp.watch('app/**/*.*',['default',sync.reload])
});

gulp.task('copy', function(callback) {
    sequence('copyjs','copycss','copyfont','copyimg','copydata')(callback)
});

gulp.task('default', function(callback) {
    sequence('clean',['htmlmin','css','js'],'revCollector')(callback)
});
