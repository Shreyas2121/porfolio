import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const publicRoot = fileURLToPath(new URL("../public/", import.meta.url));
const files = await readdir(publicRoot, { recursive: true, withFileTypes: true });
const videos = files.filter(file => file.isFile() && /\.(mp4|m4v|webm|mov|avi|mkv|ogv|ogg|mpeg|mpg)$/i.test(file.name));
if (videos.length) {
  throw new Error("Local videos are not supported. Use a YouTube video ID and move these files outside public/:\n" +
    videos.map(file => path.relative(publicRoot, path.join(file.parentPath, file.name))).join("\n"));
}
console.log("YouTube-only media check passed: no local videos in public/.");
