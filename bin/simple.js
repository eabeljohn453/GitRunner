#!/usr/bin/env node

import { program } from "commander"; 
import { runGitInteractive } from "../src/commands/git.js";
import { runAdd } from "../src/commands/add.js";  
import { handleBranchMenu } from "../src/commands/branch.js";
 
program
  .command("add")
  .description("Auto add → commit → push")
  .action(runAdd);
 
program
  .command("git")
  .description("Enter interactive Git mode")
  .action(runGitInteractive);
 
program
  .command("branch")
  .description("Open branch manager")
  .action(handleBranchMenu);
 
program.parse(process.argv);
