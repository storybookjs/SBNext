export async function compile(task, opts) {
  await task
    .source(opts.src || 'src/**/*.js')
    .babel()
    .target('dist/');
}

export async function build(task) {
  await task.serial(['compile']);
}

export default async function(task) {
  await task.start('build');
  await task.watch('src/**/*.js', ['compile']);
}

export async function release(task) {
  await task.clear('dist').start('build');
}
