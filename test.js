const {execSync} = require('child_process')
const a = execSync('npm show vue versions').toString().replaceAll('\'', '\"');

console.log(JSON.parse(a))
