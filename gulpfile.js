// Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

// Funçao para compilar o SASS e adicionar os prefixos
function compilaSass() {
  return gulp
    .src('src/css/scss/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }),
    )
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
}

// Tarefa de gulp para a função de SASS
gulp.task('sass', function (done) {
  compilaSass();
  done();
});

// tarefa para minificar CSS
function tarefaCSS(){
  return gulp
      .src([
      './node_modules/bootstrap/dist/css/bootstrap.css', 
      './vendor/owl/css/owl.css',
      './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
      './src/css/style.css'])
      .pipe(concat('libs.css'))
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/css'))
}
gulp.task('cssminify', tarefaCSS);


// Função para juntar o JS
function gulpJS() {
  return gulp
    .src([
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap/dist/js/bootstrap.js',
      './vendor/owl/js/owl.js',
      './src/js/custom.js'])
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
}

gulp.task('mainjs', gulpJS);

// Função para Otimizar imagens
function gulpimages(){
  return gulp
  .src('./src/images/*')
  .pipe(imagemin())
	.pipe(gulp.dest('dist/images'))

}

gulp.task('imagesminify', gulpimages);


// Função para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);

// Função de watch do Gulp
function watch() {
  gulp.watch('./src/css/scss/*.scss', compilaSass);
  gulp.watch('./src/js/main/*.js', gulpJS);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

// Inicia a tarefa de watch
gulp.task('watch', watch);

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task(
  'default',
  gulp.parallel('watch', 'browser-sync', 'sass', 'cssminify', 'mainjs','imagesminify'),
);
