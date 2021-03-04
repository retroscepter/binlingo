
const { Writer, POOL_SIZE } = require('../lib')

const writer = new Writer()

test('write an unsigned 8 bit integer', () => {
    writer.writeUInt8(255)
})

test('write a signed 8 bit integer', () => {
    writer.writeInt8(126)
})

test('write an unsigned 16 bit integer', () => {
    writer.writeUInt16(65535)
})

test('write a signed 16 bit integer', () => {
    writer.writeInt16(32767)
})

test('write an unsigned 24 bit integer', () => {
    writer.writeUInt24(16777215)
})

test('write a signed 24 bit integer', () => {
    writer.writeInt24(8388607)
})

test('write an unsigned 32 bit integer', () => {
    writer.writeUInt32(4294967295)
})

test('write a signed 32 bit integer', () => {
    writer.writeInt32(2147483647)
})

test('write a 32 bit float', () => {
    writer.writeFloat(2147483647.231802830750)
})

test('write a 64 bit float', () => {
    writer.writeDouble(4294967295.210382050384)
})

test('write a UCS-2 encoded string', () => {
    writer.writeZTStringUCS2('test')
})

test('write a UTF-8 encoded string', () => {
    writer.writeZTStringUTF8('test')
})

test('write a buffer', () => {
    writer.writeBytes(Buffer.allocUnsafe(POOL_SIZE))
})

test('finalize', () => {
    writer.finalize()
})

test('chaining', () => {
    const buffer = new Writer()
        .writeInt8(0)
        .writeUInt8(0)
        .writeInt16(0)
        .writeUInt16(0)
        .writeInt24(0)
        .writeUInt24(0)
        .writeInt32(0)
        .writeUInt32(0)
        .writeZTStringUCS2('test')
        .writeZTStringUTF8('test')
        .finalize()
})
