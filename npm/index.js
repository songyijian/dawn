// @ts-check

// !!! Sharing the dependencies of caz
module.paths = require.main.paths;

const path = require("path");
const chalk = require("chalk");
const { name, version } = require("./package.json");

/** @type {import('caz').Template} */
module.exports = {
  name,
  version,
  metadata: {
    // TODO: predefined template metadata
    year: new Date().getFullYear(),
  },
  prompts: [
    // TODO: custom template prompts
    {
      name: "name",
      type: "text",
      message: "npm项目名称",
    },
    {
      name: "moduleName",
      type: "text",
      message: "iife导出包名",
      initial: "",
    },
    {
      name: "description",
      type: "text",
      message: "项目说明",
      initial: "Awesome npm apps.",
    },
    {
      name: "githubUrl",
      type: "text",
      message: "github url",
      initial: "",
    },
    {
      name: "install",
      type: "confirm",
      message: "安装依赖项",
      initial: true,
    },
    {
      name: "pm",
      type: (prev) =>
        process.env.NODE_ENV === "test" || prev ? "select" : null,
      message: "Package manager",
      hint: " ",
      choices: [
        { title: "npm", value: "npm" },
        { title: "yarn", value: "yarn" },
        { title: "pnpm", value: "pnpm" },
      ],
    },
  ],
  helpers: {
    // TODO: custom template helpers
    upper: (input) => input.toUpperCase(),
  },
  // TODO: enable install by npm / yarn
  install: "npm",
  // TODO: enable git init
  init: true,
  complete: "\nHappy hacking :)\n",
};
