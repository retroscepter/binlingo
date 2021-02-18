
const { Writer, Reader } = require('../lib')

const writer = new Writer()

writer.writeUInt8(255)
writer.writeInt8(127)
writer.writeUInt16(65535)
writer.writeInt16(32767)
writer.writeUInt24(16777215)
writer.writeInt24(8388607)
writer.writeUInt32(4294967295)
writer.writeInt32(2147483647)
writer.writeFloat(999.999)
writer.writeDouble(99999.99999)
writer.writeZTStringUCS2('test')
writer.writeZTStringUTF8('test')

const buffer = writer.finalize()
const reader = new Reader(buffer)

test('read an unsigned 8 bit integer', () => {
    expect(reader.readUInt8()).toBe(255)
})

test('read a signed 8 bit integer', () => {
    expect(reader.readInt8()).toBe(127)
})

test('read an unsigned 16 bit integer', () => {
    expect(reader.readUInt16()).toBe(65535)
})

test('read a signed 16 bit integer', () => {
    expect(reader.readInt16()).toBe(32767)
})

test('read an unsigned 24 bit integer', () => {
    expect(reader.readUInt24()).toBe(16777215)
})

test('read a signed 24 bit integer', () => {
    expect(reader.readInt24()).toBe(8388607)
})

test('read an unsigned 32 bit integer', () => {
    expect(reader.readUInt32()).toBe(4294967295)
})

test('read a signed 32 bit integer', () => {
    expect(reader.readInt32()).toBe(2147483647)
})

test('read a 32 bit float', () => {
    expect(reader.readFloat().toFixed(3)).toBe('999.999')
})

test('read a 64 bit float', () => {
    expect(reader.readDouble()).toBe(99999.99999)
})

test('read a UCS-2 encoded string', () => {
    expect(reader.readZTStringUCS2()).toBe('test')
})

test('read a UTF-8 encoded string', () => {
    expect(reader.readZTStringUTF8()).toBe('test')
})

