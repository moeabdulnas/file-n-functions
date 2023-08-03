const fs = require("fs");

const cliPath = "bin/cli.js";

fs.chmod(cliPath, 0o755, (err) => {
  if (err) throw err;
  console.log(`Set execute permissions for ${cliPath}`);
});
