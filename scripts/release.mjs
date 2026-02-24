import { spawnSync } from "node:child_process";

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const message = process.env.npm_config_msg || process.argv.slice(2).join(" ") || "chore: update site";

run("npm", ["run", "check"]);
run("git", ["add", "."]);

const status = spawnSync("git", ["status", "--porcelain"], { encoding: "utf8", shell: true });
if ((status.stdout || "").trim().length === 0) {
  console.log("No changes to commit. Skipping git commit/push.");
  process.exit(0);
}

run("git", ["commit", "-m", message]);
run("git", ["push", "origin", "main"]);

