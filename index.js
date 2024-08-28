#!/usr/bin/node
"use strict";
export const textBuffer = [];
export const undoBuffer = [];
import { standardSetup } from "./program-flow.js";
import { standardExit } from "./program-flow.js";
import { debugMode } from "./program-flow.js";

const debug = false;

function mainProgram() {
  // i is a pointer to the current position of the text buffer array
  let i = 0;
  let line = 1;
  let col = 1;

  process.stdin.on("keypress", (c, k) => {
    if (c === "\x03") {
      // CTRL+C pressed - standard exit
      standardExit();
    } else if (c === "\r") {
      // handle carriage return
      (line += 1), (col = 1);
      process.stdout.write(`\u001b[${line};${col}H`);
      textBuffer.push(c);
    } else if (c === "\b") {
      // handle backspace
      (line += 0), (col -= 1);
      process.stdout.write(`\u001b[${line};${col}H`);
      process.stdout.write(` `);
      undoBuffer.push(textBuffer.pop());
      i--;
    } else if (k.sequence === "\x1B[D") {
      // left arrow key press
      (line += 0), (col -= 1);
      process.stdout.write(`\u001b[${line};${col}H`);
    } else if (c === undefined) {
      null;
    } else {
      process.stdout.write(`\u001b[${line};${col}H`);
      process.stdout.write(c);
      (line += 0), (col += 1);

      textBuffer.push(c);
      i++;
    }
  });
}

standardSetup();
if (debug) {
  debugMode();
} else {
  mainProgram();
}
