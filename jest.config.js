const nextJest = require("next/jest");
require("dotenv").config({
  path: ".env.development",
});

const createNextConfig = nextJest({
  dir: ".",
});

const jestConfig = createNextConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});
module.exports = jestConfig;
