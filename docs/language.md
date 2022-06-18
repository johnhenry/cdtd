# CDTD: Language

By design, the CDTD language is similar to [nested CSS](https://www.w3.org/TR/css-nesting-1/).

The main difference is that CDTD focuses on properties and lacks selectors.

Internally, a CDTD

## Basic Validation

The following HTML would pass validation

```html
<html>
  <head>
    <title>Hello World</title>
  </head>
  <body class="main">
    <h1>Hello World</h1>
  </body>
</ul>
```

against the following document:

```cdtd
html {
  head{
    title
  }
  body.main {
    *
  }
}
```

while the following would fail because of the missing 'main' class on the 'body' tag.

```html
<html>
  <head>
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</ul>
```

## Ampersand (&)

The ampersand is used to "join" a selector to it's parent.

```crdt
body {
  &.main {
    *
  }
}
```

and

```crdt
body.main {
  *
}
```

are equivalent.

## Numerosity

Use a "--" to add numerosity to a selector.

- <selector> -- n : exactly n elements
- <selector> -- ,n : up to n element
- <selector> -- n, : n or more element
- <selector> -- n,m : at least n and at most m elements

Not passing a selector is equavalent to pasing "-- 1," or "one or more"

### -- n

The following validation only passes if there are exactly 2 li tags in the ul tag.

```cdtd
ul {
  li -- 2
}
```

Pass ✓

```html
<ul>
  <li>one</li>
  <li>two</li>
</ul>
```

Fail ✗

```html
<ul></ul>
```

Fail ✗

```html
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

### -- n,

The following validation passes if there are 3 or more li tags in the ul tag.

```cdtd
ul {
  li -- 3,
}
```

Pass ✓

```html
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

Pass ✓

```html
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
  <li>four</li>
</ul>
```

Fail ✗

```html
<ul>
  <li>one</li>
  <li>two</li>
</ul>
```

### -- ,n

The following validation passes if there are 2 or fewer li tags in the ul tag.

Pass ✓

```html
<ul></ul>
```

Pass ✓

```html
<ul>
  <li>one</li>
</ul>
```

Pass ✓

```html
<ul>
  <li>one</li>
  <li>two</li>
</ul>
```

Fail ✗

```html
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

### -- n,m

The following validation passes if there are between 2 and 4 or more tags in the ul tag.

```cdtd
ul {
  li -- 2,4
}
```

Pass ✓

```html
<ul>
  <li>one</li>
  <li>two</li>
</ul>
```

Pass ✓

```html
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

Pass ✓

```html
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
  <li>four</li>
</ul>
```

Fail ✗

```html
<ul>
  <li>one</li>
</ul>
```

Fail ✗

```html
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
  <li>four</li>
  <li>five</li>
</ul>
```
