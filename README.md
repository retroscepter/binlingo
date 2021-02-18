# binlingo [![Build Status](https://travis-ci.com/octavetoast/binlingo.svg?branch=main)](https://travis-ci.com/octavetoast/binlingo) [![view on npm](http://img.shields.io/npm/v/binlingo.svg)](https://www.npmjs.org/package/binlingo)

Binary readers and writers made easy in JavaScript.

## Installation

For Node.js or webpack projects, install with the NPM package manager:

```Bash
npm install --save binlingo
```

## Usage

```JavaScript

const { Reader, Writer } = require('binlingo')
// or
import { Reader, Writer } from 'binlingo'

```

This is a basic example. For detailed documentation on each of these methods, check the API documention below.

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
<dt><a href="#POOL_SIZE">POOL_SIZE</a> : <code>number</code></dt>
<dd><p>Default pool size of each Buffer.</p>
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
    * [.readUInt24()](#Reader+readUInt24) ⇒ <code>number</code>
    * [.readInt24()](#Reader+readInt24) ⇒ <code>number</code>
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
| data | <code>Buffer</code> | Buffer to read from |
| [offset] | <code>number</code> | Position in the Buffer to start from |

<a name="Reader+length"></a>

### reader.length ⇒ <code>number</code>
Length of the current Buffer.

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

### reader.readUInt24() ⇒ <code>number</code>
Read the unsigned 24 bit integer from the current position in the Buffer.

**Kind**: instance method of [<code>Reader</code>](#Reader)  
<a name="Reader+readInt24"></a>

### reader.readInt24() ⇒ <code>number</code>
Read the signed 24 bit integer from the current position in the Buffer.

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
    * [new Writer([offset])](#new_Writer_new)
    * [.writeUInt8(a)](#Writer+writeUInt8) ⇒ <code>void</code>
    * [.writeInt8(a)](#Writer+writeInt8) ⇒ <code>void</code>
    * [.writeUInt16(a)](#Writer+writeUInt16) ⇒ <code>void</code>
    * [.writeInt16(a)](#Writer+writeInt16) ⇒ <code>void</code>
    * [.writeUInt24(a)](#Writer+writeUInt24) ⇒ <code>void</code>
    * [.writeInt24(a)](#Writer+writeInt24) ⇒ <code>void</code>
    * [.writeUInt32(a)](#Writer+writeUInt32) ⇒ <code>void</code>
    * [.writeInt32(a)](#Writer+writeInt32) ⇒ <code>void</code>
    * [.writeFloat(a)](#Writer+writeFloat) ⇒ <code>void</code>
    * [.writeDouble(a)](#Writer+writeDouble) ⇒ <code>void</code>
    * [.writeZTStringUCS2(a)](#Writer+writeZTStringUCS2) ⇒ <code>void</code>
    * [.writeZTStringUTF8(a)](#Writer+writeZTStringUTF8) ⇒ <code>void</code>
    * [.writeBytes(a)](#Writer+writeBytes) ⇒ <code>void</code>
    * [.finalize()](#Writer+finalize) ⇒ <code>Buffer</code>

<a name="new_Writer_new"></a>

### new Writer([offset])
Create a Binary Writer.


| Param | Type | Description |
| --- | --- | --- |
| [offset] | <code>number</code> | Position in the Buffer to start from |

<a name="Writer+writeUInt8"></a>

### writer.writeUInt8(a) ⇒ <code>void</code>
Write an unsigned 8 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeInt8"></a>

### writer.writeInt8(a) ⇒ <code>void</code>
Write a signed 8 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeUInt16"></a>

### writer.writeUInt16(a) ⇒ <code>void</code>
Write an unsigned 16 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeInt16"></a>

### writer.writeInt16(a) ⇒ <code>void</code>
Write a signed 16 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeUInt24"></a>

### writer.writeUInt24(a) ⇒ <code>void</code>
Write an unsigned 24 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeInt24"></a>

### writer.writeInt24(a) ⇒ <code>void</code>
Write a signed 24 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeUInt32"></a>

### writer.writeUInt32(a) ⇒ <code>void</code>
Write an unsigned 32 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeInt32"></a>

### writer.writeInt32(a) ⇒ <code>void</code>
Write a signed 32 bit integer to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeFloat"></a>

### writer.writeFloat(a) ⇒ <code>void</code>
Write a 32 bit float to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeDouble"></a>

### writer.writeDouble(a) ⇒ <code>void</code>
Write a 64 bit double to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | Value |

<a name="Writer+writeZTStringUCS2"></a>

### writer.writeZTStringUCS2(a) ⇒ <code>void</code>
Write a UCS-2 encoded string to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> | Value |

<a name="Writer+writeZTStringUTF8"></a>

### writer.writeZTStringUTF8(a) ⇒ <code>void</code>
Write a UTF-8 encoded string to the current position in the Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> | Value |

<a name="Writer+writeBytes"></a>

### writer.writeBytes(a) ⇒ <code>void</code>
Copy data to the current position in the Buffer from another Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>buffer</code> | Buffer to copy from |

<a name="Writer+finalize"></a>

### writer.finalize() ⇒ <code>Buffer</code>
Return the current Buffer.

**Kind**: instance method of [<code>Writer</code>](#Writer)  
<a name="POOL_SIZE"></a>

## POOL\_SIZE : <code>number</code>
Default pool size of each Buffer.

**Kind**: global variable  
