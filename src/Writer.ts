import { POOL_SIZE } from './constants'

/**
 * Represents a Binary Writer.
 */
export class Writer {
    /**
     * Current Buffer.
     *
     * @private
     *
     * @type {Buffer}
     */
    private data: Buffer

    /**
     * Current position in the Buffer.
     *
     * @private
     *
     * @type {number}
     */
    private offset: number

    /**
     * Create a Binary Writer.
     *
     * @param {number} [offset] Position in the Buffer to start from
     */
    constructor(offset?: number) {
        this.data = Buffer.allocUnsafe(POOL_SIZE)
        this.offset = offset || 0
    }

    /**
     * Write an unsigned 8 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeUInt8(value: number): Writer {
        this.data.writeUInt8(value, this.offset)
        this.offset++
        return this
    }

    /**
     * Write a signed 8 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeInt8(value: number): Writer {
        this.data.writeInt8(value, this.offset)
        this.offset++
        return this
    }

    /**
     * Write an unsigned 16 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeUInt16(value: number): Writer {
        this.data.writeUInt16LE(value, this.offset)
        this.offset += 2
        return this
    }

    /**
     * Write a signed 16 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeInt16(value: number): Writer {
        this.data.writeUInt16LE(value, this.offset)
        this.offset += 2
        return this
    }

    /**
     * Write an unsigned 24 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeUInt24(value: number): Writer {
        this.data.writeUIntLE(value, this.offset, 3)
        this.offset += 3
        return this
    }

    /**
     * Write a signed 24 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeInt24(value: number): Writer {
        this.data.writeUIntLE(value, this.offset, 3)
        this.offset += 3
        return this
    }

    /**
     * Write an unsigned 32 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeUInt32(value: number): Writer {
        this.data.writeUInt32LE(value, this.offset)
        this.offset += 4
        return this
    }

    /**
     * Write a signed 32 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeInt32(value: number): Writer {
        this.data.writeInt32LE(value, this.offset)
        this.offset += 4
        return this
    }

    /**
     * Write a 32 bit float to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeFloat(value: number): Writer {
        this.data.writeFloatLE(value, this.offset)
        this.offset += 4
        return this
    }

    /**
     * Write a 64 bit double to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeDouble(value: number): Writer {
        this.data.writeDoubleLE(value, this.offset)
        this.offset += 8
        return this
    }

    /**
     * Write a UCS-2 encoded string to the current position in the Buffer.
     *
     * @param {string} string Value
     *
     * @returns {Writer}
     */
    writeZTStringUCS2(string: string): Writer {
        if (string) {
            const stringBuffer = Buffer.from(string, 'ucs2')
            this.offset += stringBuffer.copy(this.data, this.offset)
        }
        this.data[this.offset++] = 0
        this.data[this.offset++] = 0
        return this
    }

    /**
     * Write a UTF-8 encoded string to the current position in the Buffer.
     *
     * @param {string} string Value
     *
     * @returns {Writer}
     */
    writeZTStringUTF8(string: string): Writer {
        if (string) {
            const stringBuffer = Buffer.from(string, 'utf8')
            this.offset += stringBuffer.copy(this.data, this.offset)
        }
        this.data[this.offset++] = 0
        return this
    }

    /**
     * Copy data to the current position in the Buffer from another Buffer.
     *
     * @param {buffer} buffer Buffer to copy from
     *
     * @returns {Writer}
     */
    writeBytes(buffer: Buffer): Writer {
        this.offset += buffer.copy(this.data, this.offset, 0, buffer.length)
        return this
    }

    /**
     * Return the current Buffer.
     *
     * @returns {Buffer}
     */
    finalize(): Buffer {
        const buffer = Buffer.allocUnsafe(this.offset)
        this.data.copy(buffer, 0, 0, this.offset)
        return buffer
    }
}
