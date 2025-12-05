#!/usr/bin/env node
import { program } from "commander";
import {runAdd} from "../src/commands/add.js"
// import {runPR} from "../src/commands/pr.js"
// import {runMerge} from "../src/commands/merge.js"
// import {runConflict} from "../src/commands/conflict.js"
program
    .command("add")
    .description("Auto git add and push")
    .action(runAdd)
// program
//     .command("pr")
//     .description("create pull request")
//     .action(runPR)
// program
//     .command("merge")
//     .description("Merge pull request or continue merge")
//     .action(runMerge)
// program
//     .command("conflict")
//     .description("show the conflict files in vscode")
//     .action(runConflict)
program.parse(process.argv)