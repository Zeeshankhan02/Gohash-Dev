import fs from "fs";
export function ensureTempDirExists() {
  const tempDir = "/tmp"; // always safe on Vercel

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
    console.log("Ensured /tmp folder exists");
  }

  return tempDir;
}
