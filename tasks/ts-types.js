const gulp = require('gulp')
const gutil = require('gulp-util')
const watch = require('gulp-watch') // better than gulp.watch because detects new files
const generateDts = require('dts-generator').default

gulp.task('ts-types', exec)

/*
Waits for scheduler.js to be created/modified before computing,
to avoid competing with and slowing down main build watcher.
*/
gulp.task('ts-types:watch', function() {
  watch('dist/cgm_de_scheduler.js', exec)
})

function exec() {
  gutil.log('Computing TypeScript definitions file...')
  return generateDts({
    project: '.', // where the tsconfig is
    name: '@medical-cloud/cgm_de_fullcalendar-scheduler',
    main: '@medical-cloud/cgm_de_fullcalendar-scheduler/src/main',
    exclude: [
      'node_modules/**/*',
      'cgm_de_fullcalendar/**/*' // don't bake in the core defs
    ],
    out: 'dist/cgm_de_scheduler.d.ts'
  }).then(function() {
    gutil.log('Wrote TypeScript definitions file.')
  })
}
