const { exec } = require("child_process");

console.log("🚀 Starting Next.js production server...");

exec("npx next start -p 3000", (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error starting the server: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Server warning: ${stderr}`);
    return;
  }
  console.log(stdout);
});
