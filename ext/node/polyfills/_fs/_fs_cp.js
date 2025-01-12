// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

// deno-lint-ignore-file prefer-primordials

import { core } from "ext:core/mod.js";
const {
  op_node_cp,
  op_node_cp_sync,
} = core.ensureFastOps();

import {
  getValidatedPath,
  validateCpOptions,
} from "ext:deno_node/internal/fs/utils.mjs";
import { promisify } from "ext:deno_node/internal/util.mjs";

export function cpSync(src, dest, options) {
  validateCpOptions(options);
  const srcPath = getValidatedPath(src, "src");
  const destPath = getValidatedPath(dest, "dest");

  op_node_cp_sync(srcPath, destPath);
}

export function cp(src, dest, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  validateCpOptions(options);
  const srcPath = getValidatedPath(src, "src");
  const destPath = getValidatedPath(dest, "dest");

  op_node_cp(
    srcPath,
    destPath,
  ).then(
    (res) => callback(null, res),
    (err) => callback(err, null),
  );
}

export const cpPromise = promisify(cp);
