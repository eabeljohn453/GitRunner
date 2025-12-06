# 🚀 git-autotool

A fast and interactive Git automation CLI tool that simplifies your workflow — commit, push, create branches, and even generate Pull Requests using GitHub API.  
Perfect for developers who want to save time and avoid repetitive Git steps.

---

## ⭐ Features

- ⚡ Automates common Git commands  
- 🤖 Add → Commit → Push in one step  
- 🌿 Create and switch branches easily  
- 🔀 Safe merging with guided prompts  
- 📝 Automatically create Pull Requests via GitHub API  
- 🎛️ Interactive menus using **Inquirer**  
- 🎨 Beautiful terminal output using **chalk**  
- 🧩 Built with **Node.js + Commander CLI**

---

## 📦 Installation

Install globally using npm:

```bash
npm install -g git-autotool
```

Check installation:

```bash
auto --help
```

---

## 🛠️ Usage

After installing, run:

```bash
auto
```

The CLI will display interactive options.

### Example Commands

| Command       | Description                          |
|---------------|--------------------------------------|
| `auto init`   | Initialize automation setup          |
| `auto commit` | Add → Commit → Push automatically    |
| `auto branch` | Create or switch branches            |
| `auto pr`     | Create a GitHub Pull Request         |
| `auto merge`  | Merge two branches safely            |

---

## 🔑 GitHub Authentication (for PR creation)

To create Pull Requests, you need a GitHub Personal Access Token.

### 1️⃣ Create a token

Go to:

GitHub → **Settings** → **Developer settings** → **Tokens**

Enable:

- repo  
- workflow  

### 2️⃣ Add token to your environment

**Mac/Linux:**

```bash
export GITHUB_TOKEN=your_token_here
```

**Windows:**

```bash
setx GITHUB_TOKEN "your_token_here"
```

---

## 📁 Project Structure

```plaintext
git-autotool/
 ├── bin/
 │   └── simple.js        # CLI entry
 ├── package.json
 ├── README.md
```

---

## 🧩 Tech Stack

- Node.js (ES modules)  
- Commander.js (CLI framework)  
- Inquirer.js (prompts)  
- Chalk (terminal colors)  
- Octokit (GitHub API)

---

## 🐞 Reporting Issues

Found a bug? Submit it here:

👉 https://github.com/eabeljohn453/GitRunner/issues

Please include:

- Steps to reproduce  
- Screenshots  
- System information  

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo  
2. Create a new branch  
3. Make changes  
4. Submit a Pull Request  

---

## 📜 License

MIT License  
© 2025 **Eabel John**
