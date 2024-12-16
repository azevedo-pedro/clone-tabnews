const nextJest = require("next/jest");
require("dotenv").config({
  path: ".env.development",
});

const createNextConfig = nextJest({
  dir: ".",
});

const jestConfig = createNextConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 6000,
});
module.exports = jestConfig;
