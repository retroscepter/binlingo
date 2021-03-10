# binlingo [![Build Status](https://travis-ci.com/octavetoast/binlingo.svg?branch=main)](https://travis-ci.com/octavetoast/binlingo) [![view on npm](http://img.shields.io/npm/v/binlingo.svg)](https://www.npmjs.org/package/binlingo)

Binary readers and writers made easy in JavaScript.

## Installation

For Node.js or webpack projects, install with the NPM package manager:

```Bash
npm install --save binlingo
```

For use in the browser without a bundler, include this script tag in your HTML.
```HTML
<script src="https://unpkg.com/binlingo@1.2.1/dist/binlingo.js"></script>
```

## Usage

```JavaScript

// commonjs module
const { Reader, Writer } = require('binlingo')

// esmodules
import { Reader, Writer } from 'binlingo'

// in the browser
const { Reader, Writer } = window.Binlingo

/* make a writer and write some data */

const writer = new Writer()

writer.writeInt8(0) // write a signed 8 bit int (1 byte)
writer.writeUInt8(0) // write an unsigned 8 bit int (1 byte)
writer.writeInt16(1) // write a signed 16 bit int (2 bytes)
writer.writeUInt16(1) // write an unsigned 16 bit int (2 bytes)
writer.writeInt24(2) // write a signed 24 bit int (3 bytes)
writer.writeUInt24(2) // write an unsigned 24 bit int (3 bytes)
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
    .writeUInt24(2)
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

Want to play around with it before installing? Check out the [RunKit
notebook](https://runkit.com/octavetoast/binlingo-example) (Node.js environment) and the
[CodePen](https://codepen.io/octavetoast/pen/OJboyxy) (browser environment).

For detailed documentation on each of these methods, check the API documention below.

# API

## Classes

<dl>
<dt><a href="#Reader">Reader</a></dt>
<dd><p>Represents a Binary Reader.</p>
</dd>
<dt><a href="#Writer">Writer</a></dt>
<dd><p>Represents a Binary Writer.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#BYTE_LENGTH">BYTE_LENGTH</a> : <code>number</code></dt>
<dd><p>Default byte length of each ArrayBuffer.</p>
</dd>
</dl>

<a name="Reader"></a>

## Reader
Represents a Binary Reader.

**Kind**: global class  

* [Reader](#Reader)
    * [new Reader(data, [offset])](#new_Reader_new)
    * [.length](#Reader+length) ⇒ <code>number</code>
    * [.readUInt8()](#Reader+readUInt8) ⇒ <code>number</code>
    * [.readInt8()](#Reader+readInt8) ⇒ <code>number</code>
    * [.readUInt16()](#Reader+readUInt16) ⇒ <code>number</code>
    * [.readInt16()](#Reader+readInt16) ⇒ <code>number</code>
    * ~~[.readUInt24()](#Reader+readUInt24) ⇒ <code>number</code>~~
    * ~~[.readInt24()](#Reader+readInt24) ⇒ <code>number</code>~~
    * [.readUInt32()](#Reader+readUInt32) ⇒ <code>number</code>
    * [.readInt32()](#Reader+readInt32) ⇒ <code>number</code>
    * [.readFloat()](#Reader+readFloat) ⇒ <code>number</code>
    * [.readDouble()](#Reader+readDouble) ⇒ <code>number</code>
    * [.skip(count)](#Reader+skip) ⇒ <code>void</code>
    * [.readZTStringUCS2()](#Reader+readZTStringUCS2) ⇒ <code>string</code>
    * [.readZTStringUTF8()](#Reader+readZTStringUTF8) ⇒ <code>string</code>

<a name="new_Reader_new"></a>

### new Reader(data, [offset])
Create a Binary Reader.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>ArrayBuffer</code> | ArrayBuffer to read from |
| [offset] | <code>number</code> | Position in the ArrayBuffer to start from |

<a name="Reader+length"></a>

### reader.length ⇒ <code>number</code>
Byte length of the current ArrayBuffer.

**Kind**: instance property of [<code>Reader</code>](#Reader)  
**Access**: public  
<a name="Reader+readUInt8"></a>

### reader.readUInt8() ⇒ <code>number</code>
Read the unsigned 8 bit integer from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readInt8"></a>

### reader.readInt8() ⇒ <code>number</code>
Read the signed 8 bit integer from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readUInt16"></a>

### reader.readUInt16() ⇒ <code>number</code>
Read the unsigned 16 bit integer from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readInt16"></a>

### reader.readInt16() ⇒ <code>number</code>
Read the signed 16 bit integer from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readUInt24"></a>

### ~~reader.readUInt24() ⇒ <code>number</code>~~
***Deprecated***

Read the unsigned 24 bit integer from the current position in the Buffer.
Actually read an unsigned 32 bit integer because `DataView` doesn't natively support 24 bits, not recommended.
Use `Reader.readUInt32()`.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readInt24"></a>

### ~~reader.readInt24() ⇒ <code>number</code>~~
***Deprecated***

Read the signed 24 bit integer from the current position in the Buffer.
Actually reads a signed 32 bit integer because `DataView` doesn't natively support 24 bits, not recommended.
Use `Reader.readInt32()`.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readUInt32"></a>

### reader.readUInt32() ⇒ <code>number</code>
Read the unsigned 32 bit integer from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readInt32"></a>

### reader.readInt32() ⇒ <code>number</code>
Read the signed 32 bit integer from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readFloat"></a>

### reader.readFloat() ⇒ <code>number</code>
Read the 32 bit float from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readDouble"></a>

### reader.readDouble() ⇒ <code>number</code>
Read the 64 bit double from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+skip"></a>

### reader.skip(count) ⇒ <code>void</code>
Skip bytes in the current Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | Number of bytes to skip |

<a name="Reader+readZTStringUCS2"></a>

### reader.readZTStringUCS2() ⇒ <code>string</code>
Read the UCS-2 encoded string from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readZTStringUTF8"></a>

### reader.readZTStringUTF8() ⇒ <code>string</code>
Read the UTF-8 encoded string from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Writer"></a>

## Writer
Represents a Binary Writer.

**Kind**: global class  

* [Writer](#Writer)
    * [new Writer([offset], [byteLength])](#new_Writer_new)
    * [.writeUInt8(value)](#Writer+writeUInt8) ⇒ [<code>Writer</code>](#Writer)
    * [.writeInt8(value)](#Writer+writeInt8) ⇒ [<code>Writer</code>](#Writer)
    * [.writeUInt16(value)](#Writer+writeUInt16) ⇒ [<code>Writer</code>](#Writer)
    * [.writeInt16(value)](#Writer+writeInt16) ⇒ [<code>Writer</code>](#Writer)
    * ~~[.writeUInt24(value)](#Writer+writeUInt24) ⇒ [<code>Writer</code>](#Writer)~~
    * ~~[.writeInt24(value)](#Writer+writeInt24) ⇒ [<code>Writer</code>](#Writer)~~
    * [.writeUInt32(value)](#Writer+writeUInt32) ⇒ [<code>Writer</code>](#Writer)
    * [.writeInt32(value)](#Writer+writeInt32) ⇒ [<code>Writer</code>](#Writer)
    * [.writeFloat(value)](#Writer+writeFloat) ⇒ [<code>Writer</code>](#Writer)
    * [.writeDouble(value)](#Writer+writeDouble) ⇒ [<code>Writer</code>](#Writer)
    * [.writeZTStringUCS2(string)](#Writer+writeZTStringUCS2) ⇒ [<code>Writer</code>](#Writer)
    * [.writeZTStringUTF8(string)](#Writer+writeZTStringUTF8) ⇒ [<code>Writer</code>](#Writer)
    * ~~[.writeBytes(buffer)](#Writer+writeBytes) ⇒ [<code>Writer</code>](#Writer)~~
    * [.finalize()](#Writer+finalize) ⇒ <code>ArrayBuffer</code>

<a name="new_Writer_new"></a>

### new Writer([offset], [byteLength])
Create a Binary Writer.


| Param | Type | Description |
| --- | --- | --- |
| [offset] | <code>number</code> | Position in the Buffer to start from |
| [byteLength] | <code>number</code> | Bytes of memory to allocate (defaults to 1048576) |

<a name="Writer+writeUInt8"></a>

### writer.writeUInt8(value) ⇒ [<code>Writer</code>](#Writer)
Write an unsigned 8 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeInt8"></a>

### writer.writeInt8(value) ⇒ [<code>Writer</code>](#Writer)
Write a signed 8 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeUInt16"></a>

### writer.writeUInt16(value) ⇒ [<code>Writer</code>](#Writer)
Write an unsigned 16 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeInt16"></a>

### writer.writeInt16(value) ⇒ [<code>Writer</code>](#Writer)
Write a signed 16 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeUInt24"></a>

### ~~writer.writeUInt24(value) ⇒ [<code>Writer</code>](#Writer)~~
***Deprecated***

Write an unsigned 24 bit integer to the current position in the Buffer.
Actually writes an unsigned 32 bit integer because `DataView` doesn't natively support 24 bits, not recommended.
Use `Writer.writeUInt32()`.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeInt24"></a>

### ~~writer.writeInt24(value) ⇒ [<code>Writer</code>](#Writer)~~
***Deprecated***

Write a signed 24 bit integer to the current position in the Buffer.
Actually writes a signed 32 bit integer because `DataView` doesn't natively support 24 bits, not recommended.
Use `Writer.writeInt32()`.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeUInt32"></a>

### writer.writeUInt32(value) ⇒ [<code>Writer</code>](#Writer)
Write an unsigned 32 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeInt32"></a>

### writer.writeInt32(value) ⇒ [<code>Writer</code>](#Writer)
Write a signed 32 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeFloat"></a>

### writer.writeFloat(value) ⇒ [<code>Writer</code>](#Writer)
Write a 32 bit float to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeDouble"></a>

### writer.writeDouble(value) ⇒ [<code>Writer</code>](#Writer)
Write a 64 bit double to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value |

<a name="Writer+writeZTStringUCS2"></a>

### writer.writeZTStringUCS2(string) ⇒ [<code>Writer</code>](#Writer)
Write a UCS-2 encoded string to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | Value |

<a name="Writer+writeZTStringUTF8"></a>

### writer.writeZTStringUTF8(string) ⇒ [<code>Writer</code>](#Writer)
Write a UTF-8 encoded string to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | Value |

<a name="Writer+writeBytes"></a>

### ~~writer.writeBytes(buffer) ⇒ [<code>Writer</code>](#Writer)~~
***Deprecated***

Copy data to the current position in the Buffer from another Buffer.
This method does nothing and is only here for backwards compatibility.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>ArrayBuffer</code> | Buffer to copy from |

<a name="Writer+finalize"></a>

### writer.finalize() ⇒ <code>ArrayBuffer</code>
Return the current ArrayBuffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  
<a name="BYTE_LENGTH"></a>

## BYTE\_LENGTH : <code>number</code>
Default byte length of each ArrayBuffer.

**Kind**: global variable  
