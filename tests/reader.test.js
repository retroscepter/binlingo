const { Writer, Reader } = require('../lib')

const writer = new Writer()

writer.writeUInt8(0)
writer.writeInt8(0)
writer.writeUInt16(1)
writer.writeInt16(1)
writer.writeUInt24(2)
writer.writeInt24(2)
writer.writeUInt32(3)
writer.writeInt32(3)
writer.writeFloat(3.14)
writer.writeDouble(4.0001)
writer.writeZTStringUCS2('test')
writer.writeZTStringUTF8('test')

const buffer = writer.finalize()
const reader = new Reader(buffer)

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
