#!/usr/bin/node
"use strict";

import { standardSetup } from "./program-flow.js";
import { standardExit } from "./program-flow.js";
import { debugMode } from "./program-flow.js";

const debug = false;

function mainProgram() {
  process.stdin.on("keypress", (c, k) => {
    if (c === "\x03") {
      standardExit();
    }
    process.stdout.write(c);
  });
}

standardSetup();
if (debug) {
  debugMode();
} else {
  mainProgram();
}
