"use strict";
import readline from "readline";
import { textBuffer, undoBuffer } from "./index.js";
export function standardSetup() {
  // Standard program setup
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  // Terminal - reset settings to default
  process.stdout.write("\u001bc");

  // ANSI - set cursor to home position
  process.stdout.write("\u001b[H");
}
export function standardExit() {
  //Terminal - reset settings to default
  process.stdout.write("\u001bc");

  console.log(textBuffer);
  console.log(undoBuffer);
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
