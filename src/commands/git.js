import inquirer from "inquirer";
import chalk from "chalk";
import { runAdd } from "./add.js";
import { exec } from "child_process"
import { handleBranchMenu } from "./branch.js";
import { runPR } from "./pr.js";
 
export async function runGitInteractive() {

    while (true) {
        console.log(chalk.blue("🔧 SimpleGit Interactive Mode"));
        console.log(chalk.gray("Type 'add', 'branch','pr' or 'exit'"));
        console.log("");
        const { userInput } = await inquirer.prompt([{
            type: "input",
            name: "userInput",
            message: "> ",
        },])
        const cmd = userInput.trim().toLowerCase();
        if (cmd === "exit" || cmd === "quit") {
            console.log(chalk.green("Exiting interactive mode..."));
            break;
        }
        if (cmd === "add") {
            await runAdd()
            continue
        }
        if (cmd === "branch") {
            await handleBranchMenu();
            continue;
        }
       if (cmd === "pr") {
    try {
        await runPR();
    } catch (err) {
        console.log(chalk.red("❌ PR failed:"), err);
    }
    continue; // <-- ALWAYS keep user in interactive mode
}


        console.log(chalk.red("❌ Unknown command. Try: add, branch, exit"));
    }
}
