# CDTD: Command Line Interface

## Installation

```bash
npm install --global cdtd
```

## Usage

### Validate

```bash
cdtd validate <path-to-schema-file> <path-to-html-document> <path-to-html-document2> ...
```

if document is valid, this command exits without error.
otherwise returns failed query along with selected item (if applicable)

### Generate HTML & CSS

```bash
cdtd genhtml <path-to-schema-file> >> <path-to-new-HTML-document>
```

```bash
cdtd gencss <path-to-schema-file> >> <path-to-new-CSS-document>
```
