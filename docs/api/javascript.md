# CDTD: Javascript Interface

## Installation

```bash
npm install cdtd
```

## Usage

### Validate Function

Returns failed query string if documents are invalid.

Returns undefined otherwise

```javascript
import { invalidate } from "cdtd";
validate(HTMLText);
```

### Error Function

Throws an error for documents are invalid.
Returns undefined otherwise

```javascript
import { error } from "cdtd";
error(HTMLText);
```

### Pass Function

Returns true documents is valid.
Returns false otherwise.

```javascript
import { pass } from "cdtd";
pass(HTMLText, CDTD);
```
