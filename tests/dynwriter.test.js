const { DynWriter, Reader } = require('../lib')

const writer = new DynWriter()
let buffer = null
let reader = null

test('write an unsigned 8 bit integer', () => {
    writer.writeUInt8(0)
})

test('write a signed 8 bit integer', () => {
    writer.writeInt8(0)
})

test('write an unsigned 16 bit integer', () => {
    writer.writeUInt16(1)
})

test('write a signed 16 bit integer', () => {
    writer.writeInt16(1)
})

test('write an unsigned 24 bit integer (deprecated)', () => {
    writer.writeUInt24(2)
})

test('write a signed 24 bit integer (deprecated)', () => {
    writer.writeInt24(2)
})

test('write an unsigned 32 bit integer', () => {
    writer.writeUInt32(3)
})

test('write a signed 32 bit integer', () => {
    writer.writeInt32(3)
})

test('write a 32 bit float', () => {
    writer.writeFloat(3.14)
})

test('write a 64 bit float', () => {
    writer.writeDouble(4.0001)
})

test('write a UCS-2 encoded string', () => {
    writer.writeZTStringUCS2('test')
})

test('write a UTF-8 encoded string (deprecated)', () => {
    writer.writeZTStringUTF8('test')
})

test('write to buffer', () => {
    buffer = writer.finalize()
    reader = new Reader(buffer)
})

test('read an unsigned 8 bit integer', () => {
    expect(reader.readUInt8()).toBe(0)
})

test('read a signed 8 bit integer', () => {
    expect(reader.readInt8()).toBe(0)
})

test('read an unsigned 16 bit integer', () => {
    expect(reader.readUInt16()).toBe(1)
})

test('read a signed 16 bit integer', () => {
    expect(reader.readInt16()).toBe(1)
})

test('read an unsigned 24 bit integer (deprecated)', () => {
    expect(reader.readUInt24()).toBe(2)
})

test('read a signed 24 bit integer (deprecated)', () => {
    expect(reader.readInt24()).toBe(2)
})

test('read an unsigned 32 bit integer', () => {
    expect(reader.readUInt32()).toBe(3)
})

test('read a signed 32 bit integer', () => {
    expect(reader.readInt32()).toBe(3)
})

test('read a 32 bit float', () => {
    expect(reader.readFloat().toFixed(2)).toBe('3.14')
})

test('read a 64 bit float', () => {
    expect(reader.readDouble()).toBe(4.0001)
})

test('read a UCS-2 encoded string', () => {
    expect(reader.readZTStringUCS2()).toBe('test')
})

test('read a UTF-8 encoded string (deprecated)', () => {
    expect(reader.readZTStringUTF8()).toBe('test')
})
