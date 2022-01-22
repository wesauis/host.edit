const { cp } = require("fs/promises");

module.exports = async function copy(src, dst) {
  console.log(`$ cp ${src} ${dst}`);
  await cp(src, dst, { recursive: true });
};
