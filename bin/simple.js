#!/usr/bin/env node
import { program } from "commander";
import {runAdd} from "../src/commands/add.js"
import { runGitInteractive } from "../src/commands/git.js"; 
  
    program
  .command("git")
  .description("Enter SimpleGit interactive mode")
  .action(runGitInteractive);
program.parse(process.argv)