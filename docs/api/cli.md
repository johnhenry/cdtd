# CDTD: Command Line Interface

## Installation

```bash
npm install --global cdtd
```

## Usage

### Validate

If document is valid, this command exits without error.
otherwise returns failed query along with selected item (if applicable)

```bash
cdtd validate --schema <path-to-schema-file> <path-to-html-document
```

#### Negate

Ensure documents DO NOT pass validation with the `--negate` flag

```bash
cdtd validate --schema <path-to-schema-file> <path-to-html-document --negate
```

### Generate HTML & CSS

This opens an interactive prompt to generate HTML from a schema file.

```bash
cdtd gen <path-to-schema-file>
```

#### CSS

Add the `--file-type=css` flag to generate CSS instead of HTML.

```bash
cdtd gen --file-type=css <path-to-schema-file>
```
