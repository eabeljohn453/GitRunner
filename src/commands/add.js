import inquirer from "inquirer";
import {exec} from "child_process"
import chalk from "chalk"; 
import { stderr } from "process";
const run =(cmd)=>
    new Promise((resolve,reject)=>{
        exec(cmd,(err,stdout,stderr)=>{
            if(err){
                reject(stderr.trim())
            }
            resolve(stdout.trim())
        })
    })

export async function runAdd(){
    try{
        const branch=await run("git branch --show-current");
        console.log(chalk.blue(`The current branch is - ${branch}`))
        const {message} = await inquirer.prompt({
            type:"input",
            name:"message",
            message:"Enter the commit message: ",
            validate:(input)=>input.length>0||"commit message cannot be empty!"

     } )
     console.log(chalk.blue("Adding the files"))
     await run("git add .")
     console.log(chalk.blue("commiting the message"))
     try{
        await run(`git commit -m "${message}"`)
        console.log(chalk.green("✔ Commit successful"));
    } catch {
      console.log(chalk.yellow("⚠️ Nothing to commit, skipping commit step"));
    }
    console.log(chalk.yellow("pushing the message"))
    await run("git push")
    
    console.log(chalk.green(`✔ Successfully pushed to "${branch}"`));
   
    if (branch === "main") {
      console.log(chalk.green("✨ You are on main — no pull request needed."));
    } else {
      console.log(chalk.yellow("👉 Run 'simple pr' to create a pull request."));
    }
  } catch (err) {
    console.log(chalk.red("❌ Error:"), err);
  }

}