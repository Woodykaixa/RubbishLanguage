/**
 * I don't know why my prettier reports error when invoked by lint-staged. So here is another approach.
 */
const exec = require('child_process').exec;
const command = process.argv.slice(2).reduce((cmd, file) => `${cmd} ${file}`, 'prettier --write ');
exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log(err.message);
    console.log(stderr);
  }
});
