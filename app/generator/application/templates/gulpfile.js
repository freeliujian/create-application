const { src, pipe, dest, parallel } = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');

const path = {
  dest: {
    es: 'es',
    dist: 'dist',
    lib: 'lib',
  },
  typescript: ['src/**/*.{ts,tsx}', '!src/.umi/**/*.{ts,tsx,js,jsx}'],
  style: ['src/**/*.less'],
};

const compileScript = () => {
  return src(path.typescript)
    .pipe(
      babel({
        presets: ['@babel/env', '@babel/preset-react'],
        plugins: ['@babel/transform-runtime'],
      }),
    )
    .pipe(dest(path.dest.es));
};

const copyLess = () => {
  return  src(path.style)
  .pipe(dest(path.dest.lib))
  .pipe(dest(path.dest.es));

};

const less2css = () => {
  return src(path.style)
    .pipe(less({ javascriptEnabled: true }))
    .pipe(dest(path.dest.es));
};

const build = parallel(compileScript, less2css, copyLess);

exports.build = build;

exports.default = build;
