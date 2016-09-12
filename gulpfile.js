var gulp 					= require ('gulp');
var wiredep 			= require('wiredep').stream;
var del 					= require('del');
var gulpif 				= require('gulp-if');
var uglify 				= require('gulp-uglify');
var cleanCSS 			= require('gulp-clean-css');
var autoprefixer 	= require('gulp-autoprefixer');
var useref 				= require('gulp-useref');
var filter 				= require('gulp-filter');
var imagemin 			= require('gulp-imagemin');
var pngquant 			= require('imagemin-pngquant');
var cache 				= require('gulp-cache');
var size 					= require('gulp-size');
var extender 			= require('gulp-html-extend');
var prettify 			= require('gulp-prettify');
var browserSync 	= require('browser-sync');
var reload 				= browserSync.reload;
var sass 					= require('gulp-sass');


/* ======================= App ======================= */


/*
 * Локальный сервер
 */

 gulp.task('server', ['extend'], function() {
    browserSync.init({
        server: {
        	'baseDir': 'app/'
      	}
    });  
});


/*
 * Wiredep
 */

 gulp.task('wiredep', function (){
 	gulp.src('app/html/include/*.html')
 	.pipe(wiredep({
 		ignorePath: /^(\.\.\/)*\.\./
 	}))
 	.pipe(gulp.dest('app/html/include/'));
});


/*
 * Html
 */

gulp.task('extend', function () {
    gulp.src('app/html/page/*')
        .pipe(extender({annotations:false,verbose:false}))
       	.pipe(prettify({indent_size: 2}))
        .pipe(gulp.dest('app/'))
        .pipe(reload({stream: true}));
 
});



/*
 * SASS
 */

gulp.task('sass', function () {
  return gulp.src('app/scss/**/main.scss')
    .pipe(sass({includePaths: require('node-bourbon').includePaths}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css/'))
    .pipe(reload({stream: true}));
});

/*
 * Bootstrap
 */

gulp.task('bootstrap', function () {
  return gulp.src('app/scss/bootstrap.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css/'));
});


/*
 * Js
 */

 gulp.task('js', function () {
  return gulp.src('app/js/*.js')
    .pipe(reload({stream: true}));
});


/*
 * Watch
 */

gulp.task('watch', function(){
	gulp.watch('app/html/**/*.html', ['extend']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/js/**/*.js', ['js']);
	gulp.watch('bower.json', ['wiredep']);	
});


/*
 * Default
 */

 gulp.task('default', ['watch', 'server']);


 
 
 /* ======================= Dist ======================= */
var dist = "dist/";

/*
 *	Удаляем папку dist перед сборкой
 */

 gulp.task('clean', function(){
 	return del.sync(dist);
 	});


/*
 *	Переносим HTML, CSS JS в папку dist
 */

 gulp.task('useref', function(){
 	return gulp.src('app/*.html')
 	.pipe(useref())
 	.pipe(gulpif('*.js', uglify()))
 	.pipe(gulpif('*.css', cleanCSS({compatibility: 'ie8'})))
 	.pipe(gulp.dest(dist));
 	});


/*
 *	Переносим шрифты
 */

 gulp.task('fonts', function (){
 	gulp.src('app/fonts/**/*')
 	.pipe(gulp.dest(dist + 'fonts/'));
 	});


/*
 *	Изображения
 */

 gulp.task('images', function (){
 	gulp.src('app/img/**/*')
 	.pipe(cache(imagemin({      
 		progressive: true,
 		interlaced: true,
 		svgoPlugins: [{removeViewBox: false}],
 		use: [pngquant()]
	})))
 	.pipe(gulp.dest(dist + 'img'));
 	});


/*
 *	Остальные файлы
 */

 gulp.task('extras', function (){
 	gulp.src([
 		'app/*.*',
 		'!app/*.html'
 		])
 	.pipe(gulp.dest(dist))

 	gulp.src([
 		'app/css/main.css'
 		])
 	.pipe(gulp.dest(dist + 'css/'))

 	 	gulp.src([
 		'app/js/main.js'
 		])
 	.pipe(gulp.dest(dist + 'js/'))
 	});


/*
 *	Сборка и вывод размера содержимого папки dist
 */

gulp.task('dist', ['useref', 'fonts', 'images', 'extras'], function(){
 	return gulp.src(dist + "**/*")
 	.pipe(size({'title' : 'build'}));
});


/*
 *	Сборка папки dist
 */

gulp.task('build', ['clean'], function(){
 	gulp.start('dist');
})