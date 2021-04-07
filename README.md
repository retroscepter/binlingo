# binlingo [![Deno CI](https://github.com/octavetoast/binlingo/actions/workflows/deno.yml/badge.svg)](https://github.com/octavetoast/binlingo/actions/workflows/deno.yml) [![Coverage Status](https://coveralls.io/repos/github/octavetoast/binlingo/badge.svg?branch=main)](https://coveralls.io/github/octavetoast/binlingo?branch=main)

Binary reader and writer utilities for Deno, Node.js and browsers.

## Installation

For Deno projects, refer to the usage example below.

For Node.js or webpack projects, install with the NPM package manager:

```Bash
npm install --save binlingo
```

For use in the browser without a bundler, include this script tag in your HTML.

```HTML
<script src="https://unpkg.com/binlingo@2.0.0/dist/binlingo.js"></script>
```

## Usage

```JavaScript

// commonjs module
const { Reader, Writer } = require('binlingo')

// esmodules
import { Reader, Writer } from 'binlingo'

// deno
import { Reader, Writer } from 'https://deno.land/x/binlingo@2.0.0/mod.ts'

// in the browser
const { Reader, Writer } = window.Binlingo

/* make a writer and write some data */

const writer = new Writer()

writer.writeInt8(0) // write a signed 8 bit int (1 byte)
writer.writeUInt8(0) // write an unsigned 8 bit int (1 byte)
writer.writeInt16(1) // write a signed 16 bit int (2 bytes)
writer.writeUInt16(1) // write an unsigned 16 bit int (2 bytes)
writer.writeInt24(2) // write a signed 24 bit int (3 bytes)
writer.writeUInt32(2) // write an unsigned 24 bit int (3 bytes)
writer.writeInt32(3) // write a signed 32 bit int (4 bytes)
writer.writeUInt32(3) // write an unsigned 32 bit int (4 bytes)
writer.writeFloat(3.14) // write a 32 bit float (4 bytes)
writer.writeDouble(4.0001) // write a 64 bit double (8 bytes) (more precise than a float)
writer.writeZTStringUTF8('hello world') // write a utf-8 encoded string
writer.writeZTStringUCS2('hello world ☺') // write a ucs-2 (utf-8 + unicode) encoded string

const buffer = writer.finalize() // converted to buffer, arraybuffer or typed array

/* or if you like chaining */

const buffer = new Writer()
    .writeInt8(0)
    .writeUInt8(0)
    .writeInt16(1)
    .writeUInt16(1)
    .writeInt24(2)
    .writeUInt32(2)
    .writeInt32(3)
    .writeUInt32(3)
    .writeFloat(3.14)
    .writeDouble(4.0001)
    .writeZTStringUTF8('hello world')
    .writeZTStringUCS2('hello world ☺')
    .finalize()

/* make a reader and read our data */

const reader = new Reader(buffer)

console.log(reader.readInt8()) // outputs 0
console.log(reader.readUInt8()) // outputs 0
console.log(reader.readInt16()) // outputs 1
console.log(reader.readUInt16()) // outputs 1
console.log(reader.readInt24()) // outputs 2
console.log(reader.readUInt24()) // outputs 2
console.log(reader.readInt32()) // outputs 3
console.log(reader.readUInt32()) // outputs 3
console.log(reader.readFloat()) // ouputs 3.140000104904175
console.log(reader.readDouble()) // outputs 4.0001
console.log(reader.readZTStringUTF8()) // outputs "hello world"
console.log(reader.readZTStringUCS2()) // outputs "hello world ☺"
```

## [Documentation](https://doc.deno.land/https/deno.land/x/binlingo/mod.ts)

This module has first-class Deno support, documentation will always be available at [doc.deno.land](https://doc.deno.land/https/deno.land/x/binlingo/mod.ts).
