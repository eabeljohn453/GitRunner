import inquirer from "inquirer";
import chalk from "chalk";
import { exec } from "child_process"
const run = (cmd) =>
    new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(stderr.trim())
            resolve(stdout.trim())
        })
    })
async function getConflictFiles() {
    const status = await run("git status --porcelain");
    return status
        .split("\n")
        .filter((line) => line.startsWith("UU"))
        .map((line) => line.subString(3).trim())
}
export async function runMerge() {
    try {
        const currentBranch = await run("git branch --show-current")
        await run("git fetch --all")
        const allBranches = (await run("git ls-remote --heads origin"))
            .split("\n")
            .map((line) => line.split("refs/heads/")[1])
            .filter((b) => b && b.trim() !== currentBranch);

        if (allBranches.length === 0) {
            console.log(chalk.red("❌ No other branches to merge."));
            return;
        }
        const { mergeBranch } = await inquirer.prompt([
            {
                type: "list",
                name: "mergeBranch",
                message: `select a branch to merge from  ${currentBranch}`,
                choices: allBranches,
            },
        ])
        console.log(chalk.blue(`Merging '${currentBranch}' into '${mergeBranch}'...`));
        try {
            await run(`git merge origin/${mergeBranch}`)
            console.log(chalk.green("✔ Merge completed successfully!"));
            return;
        }
        catch (err) {
            console.log(chalk.red("⚠ Merge conflict detected!"));
        }
        let conflictFiles = await getConflictFiles()
        if (conflictFiles.length === 0) {
            console.log(chalk.yellow("⚠ Merge failed but no conflict files detected."));
            return;
        }
        console.log(chalk.magenta("Conflict files:"));
        conflictFiles.forEach((f) => console.log(" - " + f));
        console.log("");
        console.log(chalk.cyan("Opening conflict files in VS Code one by one..."));
        console.log(chalk.gray("Fix each conflict, save the file, then press ENTER to open next."));
        for (const file of conflictFiles) {
            console.log(chalk.yellow(`\nopening: ${file}`))
            await run(`code --merge ${file}`)
            await inquirer.prompt([
                {
                    type: "input",
                    name: "next",
                    message: "Press ENTER after fixing this file..."
                }

            ])
        }
        console.log(chalk.green("✔ All conflicts resolved!"));
        await run("git add .");
        await run(`git commit -m "Merged  ${currentBranch} into ${mergeBranch} (auto-resolved)"`);
        console.log(chalk.green("🎉 Merge successful and committed!"));
    } catch (err) {
        console.log(chalk.red("❌ Error:"), err);
    }
}