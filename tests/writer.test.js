const { Writer } = require('../lib')

const writer = new Writer()

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
