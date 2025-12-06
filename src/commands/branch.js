import inquirer from "inquirer";
import { exec } from "child_process"
import chalk from "chalk";

const run = (cmd) =>
    new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(stderr.trim())
            resolve(stdout.trim())
        })
    })


export async function handleBranchMenu() {
    while (true) {
        const { option } = await inquirer.prompt([{
            type: "list",
            name: "option",
            message: "Branch options: ",
            choices: [
                "Show current branch",
                "List branches",
                "Switch branch",
                "Pull branch",
                "Create new branch",
                "Delete branch",
                "Back"
            ]
        }])
        switch (option) {
            case "Show current branch":
                console.log("Current branch:", await run("git branch --show-current"));
                break;
            case "List branches":
                console.log(await run("git branch -a"))
                break;

            case "Switch branch":
                const branches = (await run("git for-each-ref --format=%(refname:short) refs/heads"))
                    .split("\n")
                    .map(b => b.trim())
                    .filter(b => b.length > 0);

                const { targetBranch } = await inquirer.prompt([
                    {
                        type: "list",
                        name: "targetBranch",
                        message: "Select branch:",
                        choices: branches
                    }
                ]);
                await run(`git checkout ${targetBranch}`); 
                break;

            case "Pull branch":
                const current = await run("git branch --show-current");
                console.log(current)
                console.log(await run(`git pull origin ${current}`));
                break;

            case "Create new branch":
                const { newBranch } = await inquirer.prompt([
                    { type: "input", name: "newBranch", message: "Enter new branch name:" }
                ]);
                await run(`git checkout -b ${newBranch}`);
                console.log("✔ Created and switched to", newBranch);
                await run(`git push --set-upstream origin ${newBranch}`)
                break;

            case "Delete branch":
                const allBranches = (await run("git for-each-ref --format=%(refname:short) refs/heads")).split("\n");
                const currentBranch = await run("git branch --show-current");
                const { delBranch } = await inquirer.prompt([
                    {
                        type: "list",
                        name: "delBranch",
                        message: "Select branch to delete:",
                        choices: allBranches.filter(b => b !== "main")
                    }
                ]); 
                if (delBranch === currentBranch) {
                    console.log(chalk.yellow(`⚠ You are currently on '${currentBranch}'. Switching to main before deleting...`));

                    try {
                        await run("git checkout main");
                        console.log(chalk.green("✔ Switched to main"));
                    } catch (err) {
                        console.log(chalk.red("❌ Could not switch to main. You may not have main branch."));
                        break;
                    }
                }
 
                try {
                    await run(`git branch -d ${delBranch}`);
                    console.log(chalk.green(`✔ Deleted branch '${delBranch}'`));
                } catch (err) {
                    console.log(chalk.red("❌ Failed to delete branch:"), err);
                }

                break;

            case "Back":
                return;

        }
    }
}