import { appendFile } from "node:fs/promises";
import { input } from "@inquirer/prompts";
import QRCode from "qrcode";

const url = await input({
  message: "Which website should the QR code point to?",
  validate: function (value) {
    if (URL.canParse(value)) {
      const parsedUrl = new URL(value);
      if (["http:", "https:"].includes(parsedUrl.protocol) && parsedUrl.hostname) {
        return true;
      }
    }
    return "Type the whole address, starting with https://";
  },
});

const filename = new URL(url).hostname + ".png";
await QRCode.toFile(filename, url);
console.log("Saved", filename);

const timestamp = new Date().toISOString();
await appendFile("urls.txt", `${timestamp} ${url}\n`);
console.log("Added it to urls.txt");

const picture = await QRCode.toString(url, { type: "terminal", small: true });
console.log(picture);
