# CDTD: Javascript Interface

## Installation

```bash
npm install cdtd
```

## Usage

### Validate Function

```javascript
import validate from "cdtd";
//or
import { validate } from "cdtd";
validate(cdtdText, htmlDocument, htmlDocument2, ...);
```

### Error Function

```javascript
import { error } from "cdtd";
error(cdtdText, htmlDocument, htmlDocument2, ...);
```

### Pass Function

```javascript
import { pass } from "cdtd";
pass(cdtdText, htmlDocument, htmlDocument2, ...);
```

### SchemaList & DocList

SchemaList and DocLists allow you
to validate multiple schemas and document
against eachother simultaneously

```javascript
import { SchemaList } from "cdtd";
const schemaList = new SchemaList(
  cdtdText,
  cdtdText2,
  ...
);

try {
  schemaList.validate(htmlDocument, htmlDocument2, ...);
  console.log("pass")
} catch (error) {
  console.log("fail", error);
}
if(schemaList.error(htmlDocument, htmlDocument2, ...)) {
  console.log("fail", error);
} else {
  console.log("pass");
}
console.log(schemaList.pass(htmlDocument, htmlDocument2, ...) ? "pass" : "fail" );
```

```javascript
import { DocList } from "cdtd";
const docList = new DocList(
  htmlText1,
  htmlText2,
  ...
);

try {
  docList.validate(cdtdDocument, cdtdDocument2, ...);
  console.log("pass")
} catch (error) {
  console.log("fail", error);
}
if(docList.error(cdtdDocument, cdtdDocument2, ...)) {
  console.log("fail", error);
} else {
  console.log("pass");
}
console.log(docList.pass(cdtdDocument, cdtdDocument2, ...) ? "pass" : "fail" );
```

### genCSS & genHTML

```javascript
import { genCSS, genHTML } from "cdtd";
const CDTD = ``;
const HTML = genHTML(CDTD);
const CSS = genCSS(CDTD);
console.log({ HTML, CSS });
```
