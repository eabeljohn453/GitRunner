# 🚀 git-autotool

A smart and interactive **Git Automation CLI Tool** that removes repetitive Git steps.  
Commit, push, switch/create/delete branches, resolve conflicts, and create Pull Requests — all from one simple terminal tool.

---

## ⭐ Features

- ⚡ Add → Commit → Push automatically  
- 🌿 Create, switch, delete branches interactively  
- 🔁 Merge branches with conflict resolution workflow  
- 🧠 Auto-open conflict files in VS Code  
- 🔃 Pull updates safely  
- 🔀 Create Pull Requests using GitHub CLI token (automatic)  
- 🧭 Interactive Git mode with multi-command support  
- 🎛️ Built with **Inquirer.js**, **Chalk**, **Commander.js**  
- 🧩 No manual token typing (auto-detects GitHub CLI login)

---

## 📦 Installation

Install globally:

```bash
npm install -g git-autotool
```

Verify install:

```bash
auto --help
```

---

## 🛠️ Usage

Start interactive mode:

```bash
auto git
```

Or run individual commands:

```bash
auto add
auto branch
auto pr
auto merge
```

---

## 🧭 Interactive Commands

Inside `auto git`, type:

| Command   | Description                                   |
|-----------|-----------------------------------------------|
| `add`     | Auto add → commit → push                      |
| `branch`  | Branch manager (create, delete, switch, pull) |
| `pr`      | Create Pull Request (auto-auth via gh)        |
| `merge`   | Merge branch with conflict inspector          |
| `exit`    | Exit interactive mode                         |

---

## 🔐 GitHub Authentication (No Token Required)

git-autotool uses **GitHub CLI** to authenticate automatically.

If not installed, the tool:

1. Detects that `gh` is missing  
2. Offers two options:
   - Open GitHub CLI download page  
   - Auto-install via Winget  
   
First-time setup:

```
gh auth login
```

After that, PR creation works automatically.

---

## 📁 Project Structure

```
git-autotool/
│
├── bin/
│   └── simple.js                # CLI entry file
│
├── src/
│   ├── commands/
│   │   ├── add.js               # Add → Commit → Push
│   │   ├── branch.js            # Branch manager
│   │   ├── pr.js                # Pull Request generator
│   │   ├── merge.js             # Branch merge & conflict resolver
|   |   ├── git.js               # All the functionality to be done
│
├── package.json
└── README.md
```

---

## 🧪 Example Workflow

### 1️⃣ Add, Commit & Push

```bash
auto add
```

### 2️⃣ Create a Pull Request

```bash
auto pr
```

```
✔ Pull Request Created!
🔗 https://github.com/user/repo/pull/23
```

### 3️⃣ Merge Branches

```bash
auto merge
```

Handles:

- Conflict detection  
- Opens conflict files in VS Code  
- Step-by-step fix → Enter → next file  
- Auto commit after resolve  

---

## 🐞 Bug Reporting

Submit issues:  
👉 https://github.com/eabeljohn453/git-autotool/issues

Include:

- Steps to reproduce  
- Actual & expected behavior  
- Node version + OS  

---

## 📜 License

MIT License  
© 2025 **Eabel John**
