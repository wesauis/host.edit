const { exec: sysExec } = require("child_process");
const { normalize } = require("path");

function absolute(path) {
  if (path.startsWith(".")) {
    path = `${process.cwd()}/${path.substring(1)}`;
  }

  return normalize(path);
}

module.exports = async function exec(cmd) {
  return new Promise((resolve, reject) => {
    console.info(`$ ${cmd}`);

    cmd = absolute(cmd);

    sysExec(cmd, (error, stdout, stderr) => {
      if (error) reject(error);
      if (stderr) console.error("  ", stderr);
      if (stdout) console.info("  ", stdout);
      resolve();
    });
  });
};
