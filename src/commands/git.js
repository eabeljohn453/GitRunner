import inquirer from "inquirer";
import chalk from "chalk";
import { runAdd } from "./add.js";
import { handleBranchMenu } from "./branch.js";
import { runPR } from "./pr.js";
import { runMerge } from "./merge.js";

export async function runGitInteractive() {

    console.log(chalk.blue("🔧 SimpleGit Interactive Mode"));
    console.log(chalk.gray("Type 'add', 'branch', 'pr','merge' or 'exit'"));
    console.log("");

    while (true) {
        const { userInput } = await inquirer.prompt([
            {
                type: "input",
                name: "userInput",
                message: "> ",
            }
        ]);

        const cmd = userInput.trim().toLowerCase();

        if (cmd === "exit" || cmd === "quit") {
            console.log(chalk.green("Exiting interactive mode..."));
            return;   // <-- IMPORTANT FIX
        }

        if (cmd === "add") {
            await runAdd();
            continue;
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
            continue;
        }
        if (cmd === "merge") {
            await runMerge();
            continue
        }

        console.log(chalk.red("❌ Unknown command. Try: add, branch, pr,merge,exit"));
    }
}
