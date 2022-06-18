#!/usr/bin/env node
import yargs from "yargs";
import { readFileSync } from "node:fs";
import { createQueries } from "../create-queries.mjs";
import { invalidate } from "../run-queries.mjs";
import { hideBin } from "yargs/helpers";
import genHTML from "./gen-HTML.mjs";
import genCSS from "./gen-CSS.mjs";
import CDTD_NEGATIVE_QUERY from "../negate.mjs";
import collapseSelectors from "./collapse-selectors.mjs";
import render from "./render.mjs";
import clipboard from "clipboardy";

import * as keyBuffers from "./key-buffers.mjs";

yargs(hideBin(process.argv))
  .command(
    "validate [files..]",
    "validate HTML files",
    (yargs) => {
      return yargs.positional("files", {
        describe: "HTML files to validate",
      });
    },
    ({ files, schema: schemas, negate }) => {
      if (negate) {
        for (const schema of schemas) {
          const textCDTD = readFileSync(schema, "utf8");
          const queries = [...createQueries(textCDTD.split("\n"))];
          for (const file of files) {
            const textHTML = readFileSync(file, "utf8");
            const invalid = invalidate(textHTML, queries);
            if (invalid) {
              process.exit(0);
              return;
            }
          }
        }
        console.log("\x1b[31m" + "valid" + "\x1b[0m");
        process.exit(1);
        return;
      } else {
        for (const schema of schemas) {
          const textCDTD = readFileSync(schema, "utf8");
          const queries = [...createQueries(textCDTD.split("\n"))];
          for (const file of files) {
            const textHTML = readFileSync(file, "utf8");
            const invalid = invalidate(textHTML, queries);
            if (invalid) {
              console.log(
                "\x1b[31m" +
                  [`${schema}:${file}`].concat(invalid).join("\n") +
                  "\x1b[0m"
              );
              process.exit(1);
              return;
            }
          }
        }
      }
      process.exit(0);
      return;
    }
  )
  .option("schema", {
    alias: "s",
    type: "array",
    description: "CDTD schema file",
  })
  .option("negate", {
    alias: "n",
    type: "boolean",
    description: "Ensure file is invalid",
    defalut: false,
  })
  .command(
    "gen <schemaFile> [strategy]",
    "generate HTML or CSS from schema",
    (yargs) => {
      return yargs
        .positional("schemaFile", {
          describe: "Schema from which to generate HTML",
        })
        .positional("strategy", {
          type: "string",
          description: "Strategy to pick query to generate html",
        });
    },
    async ({ schemaFile, fileType }) => {
      const textCDTD = readFileSync(schemaFile, "utf8");
      const queries = [...createQueries(textCDTD.split("\n"))]
        .filter(([n]) => n !== CDTD_NEGATIVE_QUERY)
        .map(collapseSelectors);
      const cart = [];
      let cartselection = 0;
      let entryselection = 0;
      let entries;
      switch (fileType) {
        case "html":
          entries = genHTML(queries);
          break;
        default:
        case "css":
          entries = genCSS(queries);
          break;
      }
      process.stdin.setRawMode(true);
      process.stdin.resume();
      let copied;
      render(
        { cart, cartselection, entries, entryselection },
        process.stdout,
        fileType
      );
      for await (const output of process.stdin) {
        if (output.equals(keyBuffers.CTRL_C)) {
          process.stdout.write("^C");
          process.stdout.write("\n");
          process.exit();
          return;
        } else if (
          output.equals(keyBuffers.ENTER) ||
          output.equals(keyBuffers.Q)
        ) {
          process.exit();
          return;
        } else if (output.equals(keyBuffers.C)) {
          if (cart.length) {
            clipboard.writeSync(cart.join("\n"));
            copied = true;
          }
        } else if (output.equals(keyBuffers.SHIFT_C)) {
          if (cart.length) {
            clipboard.writeSync(cart.join("\n"));
            process.stdout.write("\x1b[2m" + "copied!" + "\x1b[0m");
            process.stdout.write("\n");
          }
          process.exit();
          return;
        } else if (
          output.equals(keyBuffers.ARROW_UP) ||
          output.equals(keyBuffers.K)
        ) {
          cartselection--;
          if (cartselection < 0) {
            cartselection = cart.length - 1;
          }
        } else if (
          output.equals(keyBuffers.ARROW_DOWN) ||
          output.equals(keyBuffers.J)
        ) {
          cartselection++;
          if (cartselection >= cart.length) {
            cartselection = 0;
          }
        } else if (
          output.equals(keyBuffers.ARROW_LEFT) ||
          output.equals(keyBuffers.H)
        ) {
          entryselection--;
          if (entryselection < 0) {
            entryselection = entries.length - 1;
          }
        } else if (
          output.equals(keyBuffers.ARROW_RIGHT) ||
          output.equals(keyBuffers.L)
        ) {
          entryselection++;
          if (entryselection === entries.length) {
            entryselection = 0;
          }
        } else if (
          output.equals(keyBuffers.SPACE) ||
          output.equals(keyBuffers.A)
        ) {
          cart.push(entries[entryselection][1]);
          cartselection = cart.length - 1;
        } else if (
          output.equals(keyBuffers.ESCAPE) ||
          output.equals(keyBuffers.S)
        ) {
          cart.splice(cartselection, 1);
          if (cartselection === cart.length) {
            cartselection--;
          }
        }
        render(
          { cart, cartselection, entries, entryselection, copied },
          process.stdout,
          fileType
        );
        copied = false;
      }
    }
  )
  .option("file-type", {
    type: "string",
    alias: "f",
    default: "html",
    description: "Type of file to generate",
  })
  .parse();
