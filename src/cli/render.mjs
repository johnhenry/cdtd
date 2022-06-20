import readline from "readline";
// https://gist.github.com/timneutkens/f2933558b8739bbf09104fb27c5c9664
// const clearOutput = (stream) => {
//   const blank = "\n".repeat(stream.rows || 0) + "\n";
//   stream.write(blank);
//   readline.cursorTo(stream, 0, 0);
//   readline.clearScreenDown(stream);
// };
const render = (
  { cart, cartselection, entries, entryselection, flash },
  stream,
  fileType
) => {
  // clearOutput(stream);
  console.clear();
  // render instructions
  stream.write(`generate ${fileType === "html" ? "HTML" : "CSS"} from schema`);
  stream.write("\n");
  stream.write("\n");
  stream.write("←,→,h,l choose query");
  stream.write("\n");

  stream.write("space,a add query to selection");
  stream.write("\n");

  stream.write("↑,↓,k,j choose selection");
  stream.write("\n");

  stream.write("esc,s   remove from selection");
  stream.write("\n");

  stream.write("c       copy secection");
  stream.write("\n");

  stream.write("shift+c copy secection and quit");
  stream.write("\n");

  stream.write("enter,q quit");
  stream.write("\n");

  stream.write("ctrl+c  force quit");
  stream.write("\n");

  // render entries
  const [query, text] = entries[entryselection] || ["", ""];
  stream.write("-".repeat(stream.columns || 1));
  stream.write("\n");
  stream.write(
    `${"\x1b[47m"} ${entryselection + 1}/${entries.length} : ${query}`.padEnd(
      stream.columns
    ) + "\x1b[0m"
  );
  stream.write("\n");
  stream.write("\n");
  stream.write(text);
  stream.write("\n");

  //render cart
  if (cart.length) {
    stream.write(".".repeat(stream.columns));
    stream.write("\n");
    for (let i = 0; i < cart.length; i++) {
      if (i === cartselection) {
        stream.write("\x1b[32m" + cart[i] + "\x1b[0m");
        stream.write("\n");
      } else {
        stream.write(cart[i]);
        stream.write("\n");
      }
    }
  }
  while (flash.length) {
    process.stdout.write(flash.shift());
    process.stdout.write("\n");
  }
};
export default render;
