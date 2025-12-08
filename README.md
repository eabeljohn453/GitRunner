# 🚀 git-autotool

A smart and interactive **Git Automation CLI Tool** that removes repetitive Git steps.  
Commit, push, switch/create/delete branches, and generate Pull Requests — all from one simple terminal tool.

---

## ⭐ Features

- ⚡ Add → Commit → Push automatically  
- 🌿 Create, switch, delete branches interactively  
- 🧠 Auto-push new branches to remote  
- 🔃 Pull updates safely  
- 🔀 Create Pull Requests via GitHub API  
- 🧭 Full interactive Git mode  
- 🎛️ Powered by **Inquirer.js**  
- 🎨 Beautiful CLI with **chalk**  
- 🧩 Built with **Node.js + Commander.js**

---

## 📦 Installation

Install globally:

```bash
npm install -g git-autotool
```

Check:

```bash
auto --help
```

---

## 🛠️ Usage

Run:

```bash
auto
```

or enter interactive mode:

```bash
auto git
```

### Interactive Commands

Inside interactive mode:

| Command   | Description                     |
|-----------|----------------------------------|
| `add`     | Auto add → commit → push         |
| `branch`  | Branch manager UI                |
| `status`  | Show Git status                  |
| `log`     | Show last commits                |
| `exit`    | Exit interactive mode            |

---

## 🔧 Common CLI Commands

| Command         | Description                        |
|-----------------|------------------------------------|
| `auto add`      | Add → commit → push                |
| `auto git`      | Enter interactive Git shell        |
| `auto pr`       | Create Pull Request                |
| `auto merge`    | Merge PR safely                    |
| `auto branch`   | Manage Git branches                |
| `auto init`     | Configure GitHub token             |

---

## 🔑 GitHub Authentication (Required for PR creation)

### 1️⃣ Create a Personal Access Token

GitHub → Settings → Developer settings → Personal access tokens

Enable:

- `repo`
- `workflow`

### 2️⃣ Save the token

**Windows:**

```bash
setx GITHUB_TOKEN "your_token_here"
```

**Mac/Linux:**

```bash
export GITHUB_TOKEN=your_token_here
```

---

## 📁 Project Structure

```
git-autotool/
│
├── bin/
│   └── simple.js                # CLI entry
│
├── src/
│   ├── commands/
│   │   ├── add.js               # Add → Commit → Push
│   │   ├── branch.js            # Branch manager
│   │   ├── pr.js                # Pull Request creator
│   │   ├── merge.js             # Merge handler
│   │   └── conflict.js          # Conflict resolver
│   │
│   ├── helpers/
│   │   ├── git.js               # Git helper utilities
│   │   ├── github.js            # Octokit wrapper
│   │
│   ├── config.js                # Load simple.config.json
│   └── utils.js                 # Utility functions
│
├── simple.config.json           # User config file
├── package.json
└── README.md
```

---

## 🧪 Example Workflow

### 1️⃣ Add, Commit & Push

```bash
auto add
```

After pushing:

```
Do you want to create a Pull Request? (yes/no)
Choose base branch:
> main
  dev
```

---

### 2️⃣ Create PR

```bash
auto pr
```

Output:

```
✔ Pull Request Created!
🔗 https://github.com/user/repo/pull/23
```

---

### 3️⃣ Merge PR

```bash
auto merge
```

Handles:

- conflict detection  
- VS Code conflict open  
- safe merge  
- branch cleanup  

---

## 🐞 Issue Reporting

Submit issues:  
👉 https://github.com/eabeljohn453/git-autotool/issues

Include:

- Steps to reproduce  
- Expected behavior  
- Actual behavior  
- OS + Node version  

---
 

## 📜 License

MIT License  
© 2025 **Eabel John**
