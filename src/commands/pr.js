import inquirer from "inquirer";
import { exec } from "child_process";
import chalk from "chalk";
import { Octokit } from "octokit";
import open from "open";

const run = (cmd) =>
    new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject(stderr.trim());
            else resolve(stdout.trim());
        });
    });

async function ensureGitHubCLI() {
    let ghInstalled = true;

    try {
        await run("gh --version");
    } catch {
        ghInstalled = false;
    }

    if (!ghInstalled) {
        console.log(chalk.red("⚠ GitHub CLI (gh) is not installed!"));

        const { choice } = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Select installation method:",
                choices: [
                    "🔗 Open GitHub CLI Download Page",
                    "⚙️ Auto Install using winget",
                    "❌ Cancel"
                ]
            }
        ]);
        if (choice === "🔗 Open GitHub CLI Download Page") {
            console.log(chalk.blue("Opening download page..."));
            await open("https://cli.github.com/");
            console.log(chalk.green("After installing GitHub CLI, run 'pr' again."));
            return false;
        }

        if (choice === "⚙️ Auto Install using winget") {
            console.log(chalk.yellow("Installing GitHub CLI via winget..."));

            try {
                await run("winget install GitHub.cli -h");
                console.log(chalk.green("✔ GitHub CLI installed successfully!"));
            } catch (err) {
                console.log(chalk.red("❌ Auto installation failed. Install manually."));
                return false;
            }

            console.log(chalk.red("❌ You are not logged into GitHub CLI."));
            console.log(chalk.yellow("please do 'ctrl c' and   run:"));
            console.log(chalk.cyan("   gh auth login  - in terminal"));
            console.log(chalk.green("Then run 'pr' again."));


        }

        return false;
    }

    return true;
}

async function getRepoInfo() {
    const remote = await run("git remote get-url origin");

    const match = remote.match(/github\.com[:/](.+?)\/(.+?)\.git/);

    return {
        owner: match[1],
        repo: match[2],
    };
}

export async function runPR() {
    try {
        const ghReady = await ensureGitHubCLI();
        if (!ghReady) return;

        let authenticated = true;

        try {
            const status = await run("gh auth status");
            if (!status.includes("Logged in")) authenticated = false;
        } catch {
            authenticated = false;
        }

        if (!authenticated) {
            console.log(chalk.red("❌ You are not logged into GitHub CLI."));
            console.log(chalk.yellow("Run: gh auth login"));
            return;
        }

        const token = await run("gh auth token");
        const octokit = new Octokit({ auth: token });

        const headBranch = await run("git branch --show-current");
        await run("git fetch --all");

        const remoteBranches = (await run("git ls-remote --heads origin"))
            .split("\n")
            .map(line => line.split("refs/heads/")[1])
            .filter(b => b && b.trim() !== headBranch);

        const { base } = await inquirer.prompt([
            {
                type: "list",
                name: "base",
                message: "Select base branch for PR:",
                choices: remoteBranches,
            },
        ]);
        const { title, desc } = await inquirer.prompt([
            { type: "input", name: "title", message: "PR Title:" },
            { type: "input", name: "desc", message: "PR Description:" },
        ]);

        const { owner, repo } = await getRepoInfo();

        const pr = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
            owner,
            repo,
            title,
            body: desc,
            head: headBranch,
            base,
        });

        console.log(chalk.green("✔ Pull Request Created Successfully!"));
        console.log(chalk.blue("🔗 " + pr.data.html_url));

        await open(pr.data.html_url);
    } catch (err) {
        console.log(chalk.red("❌ Error creating PR:"), err);
    }
}
