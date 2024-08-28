"use strict";
import readline from "readline";

export function standardSetup() {
  // Standard program setup
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  // Terminal - clear current screen
  process.stdout.write("\u001bc");

  // ANSI - set inverse/reverse mode
  process.stdout.write("\u001b[7m");
}
export function standardExit() {
  //Terminal - clear current screen
  process.stdout.write("\u001bc");
  //ANSI - reset all styles
  process.stdout.write("\u001b[0m");
  process.exit(0);
}

export function debugMode() {
  process.stdout.write("Press CTRL+C to quit\n");
  process.stdin.on("keypress", (c, k) => {
    if (c === "\x03") {
      standardExit();
    }
    console.log(c, k);
  });
}
