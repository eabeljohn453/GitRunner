import inquirer from "inquirer";
import chalk from "chalk";
import { runAdd } from "./add.js";
import { exec } from "child_process"
import { handleBranchMenu } from "./branch.js";


const run = (cmd) =>
    new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(stderr.trim())
            resolve(stdout.trim())
        })
    })


export async function runGitInteractive() {
    console.log(chalk.blue("🔧 SimpleGit Interactive Mode"));
    console.log(chalk.gray("Type 'add', 'branch', or 'exit'"));
    console.log("");
    while(true){
        const {userInput}=await inquirer.prompt([{
            type:"input",
            name:"userInput",
            message:"> ",
        },])
    const cmd=userInput.trim().toLowerCase();
    if(cmd==="exit"||cmd==="quit"){
        console.log(chalk.green("Exiting interactive mode..."));
        break;
    }
    if(cmd==="add"){
        await runAdd()
        continue
    }
     if (cmd === "branch") {
      await handleBranchMenu();
      continue;
    }

    console.log(chalk.red("❌ Unknown command. Try: add, branch, exit"));
  }
}