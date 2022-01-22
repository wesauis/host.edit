const exec = require("./common/exec");
const copy = require("./common/copy");
const { mkdir } = require("fs/promises");

const r = { recursive: true };

(async () => {
  await exec("next build renderer");
  await exec("next export renderer");

  await mkdir("./build/renderer/out", r);
  // /out is needed for routing to work properly
  await copy("./renderer/out", "./build/renderer/out");
})();
