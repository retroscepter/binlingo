import { assertEquals } from 'https://deno.land/std@0.91.0/testing/asserts.ts'

import { DynWriter, Reader } from '../mod.ts'

const writer = new DynWriter()
let buffer: ArrayBuffer | null = null
let reader: Reader | null = null

Deno.test('write an unsigned 8 bit integer', () => {
    writer.writeUint8(0)
})

Deno.test('write a signed 8 bit integer', () => {
    writer.writeInt8(0)
})

Deno.test('write an unsigned 16 bit integer', () => {
    writer.writeUint16(1)
})

Deno.test('write a signed 16 bit integer', () => {
    writer.writeInt16(1)
})

Deno.test('write an unsigned 24 bit integer', () => {
    writer.writeUint24(2)
})

Deno.test('write a signed 24 bit integer', () => {
    writer.writeInt24(2)
})

Deno.test('write an unsigned 32 bit integer', () => {
    writer.writeUint32(3)
})

Deno.test('write a signed 32 bit integer', () => {
    writer.writeInt32(3)
})

Deno.test('write a 32 bit float', () => {
    writer.writeFloat(3.14)
})

Deno.test('write a 64 bit float', () => {
    writer.writeDouble(4.0001)
})

Deno.test('write a UCS-2 encoded string', () => {
    writer.writeZTStringUCS2('test')
})

Deno.test('write a UCS-2 encoded string (unicode)', () => {
    writer.writeZTStringUCS2('𝙩𝙚𝙨𝙩')
})

Deno.test('write a UTF-8 encoded string', () => {
    writer.writeZTStringUTF8('test')
})

Deno.test('write a UTF-8 encoded string (unicode)', () => {
    writer.writeZTStringUTF8('𝙩𝙚𝙨𝙩')
})

Deno.test('write to buffer', () => {
    buffer = writer.finalize()
    reader = new Reader(buffer)
})

Deno.test('read an unsigned 8 bit integer', () => {
    assertEquals(reader?.readUint8(), 0)
})

Deno.test('read a signed 8 bit integer', () => {
    assertEquals(reader?.readInt8(), 0)
})

Deno.test('read an unsigned 16 bit integer', () => {
    assertEquals(reader?.readUint16(), 1)
})

Deno.test('read a signed 16 bit integer', () => {
    assertEquals(reader?.readInt16(), 1)
})

Deno.test('read an unsigned 24 bit integer', () => {
    assertEquals(reader?.readUint24(), 2)
})

Deno.test('read a signed 24 bit integer', () => {
    assertEquals(reader?.readInt24(), 2)
})

Deno.test('read an unsigned 32 bit integer', () => {
    assertEquals(reader?.readUint32(), 3)
})

Deno.test('read a signed 32 bit integer', () => {
    assertEquals(reader?.readInt32(), 3)
})

Deno.test('read a 32 bit float', () => {
    assertEquals(reader?.readFloat().toFixed(2), '3.14')
})

Deno.test('read a 64 bit float', () => {
    assertEquals(reader?.readDouble(), 4.0001)
})

Deno.test('read a UCS-2 encoded string', () => {
    assertEquals(reader?.readZTStringUCS2(), 'test')
})

Deno.test('read a UCS-2 encoded string (unicode)', () => {
    assertEquals(reader?.readZTStringUCS2(), '𝙩𝙚𝙨𝙩')
})

Deno.test('read a UTF-8 encoded string', () => {
    assertEquals(reader?.readZTStringUTF8(), 'test')
})

Deno.test('read a UTF-8 encoded string (unicode)', () => {
    assertEquals(reader?.readZTStringUTF8(), '𝙩𝙚𝙨𝙩')
})
