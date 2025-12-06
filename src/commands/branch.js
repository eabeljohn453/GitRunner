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
    switch(option){
        case "Show current branch":
      console.log("Current branch:", await run("git branch --show-current"));
      break;
      case "List Branches":
        console.log(await run("git branch"))
        break;
      
    case "Switch branch":
      const branches = (await run("git branch --format='%(refname:short)'")).split("\n");
      const { targetBranch } = await inquirer.prompt([
        {
          type: "list",
          name: "targetBranch",
          message: "Select branch:",
          choices: branches
        }
      ]);
      await run(`git checkout ${targetBranch}`);
      console.log("✔ Switched to", targetBranch);
      break;

    case "Pull branch":
      const current = await run("git branch --show-current");
      console.log(await run(`git pull origin ${current}`));
      break;

    case "Create new branch":
      const { newBranch } = await inquirer.prompt([
        { type: "input", name: "newBranch", message: "Enter new branch name:" }
      ]);
      await run(`git checkout -b ${newBranch}`);
      console.log("✔ Created and switched to", newBranch);
      break;

    case "Delete branch":
      const allBranches = (await run("git branch --format='%(refname:short)'")).split("\n");
      const { delBranch } = await inquirer.prompt([
        {
          type: "list",
          name: "delBranch",
          message: "Select branch to delete:",
          choices: allBranches.filter(b => b !== "main")
        }
      ]);
      await run(`git branch -d ${delBranch}`);
      console.log("✔ Deleted", delBranch);
      break;

    case "Back":
      return;
  
    }
}