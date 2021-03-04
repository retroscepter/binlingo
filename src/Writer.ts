
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
    constructor (offset?: number) {
        this.data = Buffer.allocUnsafe(POOL_SIZE)
        this.offset = offset || 0
    }

    /**
     * Write an unsigned 8 bit integer to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeUInt8 (value: number): void {
        this.data.writeUInt8(value, this.offset)
        this.offset++
    }

    /**
     * Write a signed 8 bit integer to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeInt8 (value: number): void {
        this.data.writeInt8(value, this.offset)
        this.offset++
    }

    /**
     * Write an unsigned 16 bit integer to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeUInt16 (value: number): void {
        this.data.writeUInt16LE(value, this.offset)
        this.offset += 2
    }

    /**
     * Write a signed 16 bit integer to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeInt16 (value: number): void {
        this.data.writeUInt16LE(value, this.offset)
        this.offset += 2
    }

    /**
     * Write an unsigned 24 bit integer to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeUInt24 (value: number): void {
        this.data.writeUIntLE(value, this.offset, 3)
        this.offset += 3
    }

    /**
     * Write a signed 24 bit integer to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeInt24 (value: number): void {
        this.data.writeUIntLE(value, this.offset, 3)
        this.offset += 3
    }

    /**
     * Write an unsigned 32 bit integer to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeUInt32 (value: number): void {
        this.data.writeUInt32LE(value, this.offset)
        this.offset += 4
    }

    /**
     * Write a signed 32 bit integer to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeInt32 (value: number): void {
        this.data.writeInt32LE(value, this.offset)
        this.offset += 4
    }

    /**
     * Write a 32 bit float to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeFloat (value: number): void {
        this.data.writeFloatLE(value, this.offset)
        this.offset += 4
    }

    /**
     * Write a 64 bit double to the current position in the Buffer.
     * 
     * @param {number} value Value
     * 
     * @returns {void}
     */
    writeDouble (value: number): void {
        this.data.writeDoubleLE(value, this.offset)
        this.offset += 8
    }

    /**
     * Write a UCS-2 encoded string to the current position in the Buffer.
     * 
     * @param {string} string Value
     * 
     * @returns {void}
     */
    writeZTStringUCS2 (string: string): void {
        if (string) {
            const stringBuffer = Buffer.from(string, 'ucs2')
            this.offset += stringBuffer.copy(this.data, this.offset)
        }
        this.data[this.offset++] = 0
        this.data[this.offset++] = 0
    }

    /**
     * Write a UTF-8 encoded string to the current position in the Buffer.
     * 
     * @param {string} string Value
     * 
     * @returns {void}
     */
    writeZTStringUTF8 (string: string): void {
        if (string) {
            const stringBuffer = Buffer.from(string, 'utf8')
            this.offset += stringBuffer.copy(this.data, this.offset)
        }
        this.data[this.offset++] = 0
    }

    /**
     * Copy data to the current position in the Buffer from another Buffer.
     * 
     * @param {buffer} buffer Buffer to copy from
     * 
     * @returns {void}
     */
    writeBytes (buffer: Buffer): void {
        this.offset += buffer.copy(this.data, this.offset, 0, buffer.length)
    }

    /**
     * Return the current Buffer.
     * 
     * @returns {Buffer}
     */
    finalize (): Buffer {
        const buffer = Buffer.allocUnsafe(this.offset)
        this.data.copy(buffer, 0, 0, this.offset)
        return buffer
    }
}
