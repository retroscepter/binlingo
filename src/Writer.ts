
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
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeUInt8 (a: number): void {
        this.data.writeUInt8(a, this.offset)
        this.offset++
    }

    /**
     * Write a signed 8 bit integer to the current position in the Buffer.
     * 
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeInt8 (a: number): void {
        this.data.writeInt8(a, this.offset)
        this.offset++
    }

    /**
     * Write an unsigned 16 bit integer to the current position in the Buffer.
     * 
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeUInt16 (a: number): void {
        this.data.writeUInt16LE(a, this.offset)
        this.offset += 2
    }

    /**
     * Write a signed 16 bit integer to the current position in the Buffer.
     * 
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeInt16 (a: number): void {
        this.data.writeUInt16LE(a, this.offset)
        this.offset += 2
    }

    /**
     * Write an unsigned 24 bit integer to the current position in the Buffer.
     * 
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeUInt24 (a: number): void {
        this.data.writeUIntLE(a, this.offset, 3)
        this.offset += 3
    }

    /**
     * Write a signed 24 bit integer to the current position in the Buffer.
     * 
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeInt24 (a: number): void {
        this.data.writeUIntLE(a, this.offset, 3)
        this.offset += 3
    }

    /**
     * Write an unsigned 32 bit integer to the current position in the Buffer.
     * 
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeUInt32 (a: number): void {
        this.data.writeUInt32LE(a, this.offset)
        this.offset += 4
    }

    /**
     * Write a signed 32 bit integer to the current position in the Buffer.
     * 
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeInt32 (a: number): void {
        this.data.writeInt32LE(a, this.offset)
        this.offset += 4
    }

    /**
     * Write a 32 bit float to the current position in the Buffer.
     * 
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeFloat (a: number): void {
        this.data.writeFloatLE(a, this.offset)
        this.offset += 4
    }

    /**
     * Write a 64 bit double to the current position in the Buffer.
     * 
     * @param {number} a Value
     * 
     * @returns {void}
     */
    writeDouble (a: number): void {
        this.data.writeDoubleLE(a, this.offset)
        this.offset += 8
    }

    /**
     * Write a UCS-2 encoded string to the current position in the Buffer.
     * 
     * @param {string} a Value
     * 
     * @returns {void}
     */
    writeZTStringUCS2 (a: string): void {
        if (a) {
            const tbuf = Buffer.from(a, 'ucs2')
            this.offset += tbuf.copy(this.data, this.offset)
        }

        this.data[this.offset++] = 0
        this.data[this.offset++] = 0
    }

    /**
     * Write a UTF-8 encoded string to the current position in the Buffer.
     * 
     * @param {string} a Value
     * 
     * @returns {void}
     */
    writeZTStringUTF8 (a: string): void {
        if (a) {
            const tbuf = Buffer.from(a, 'utf8')
            this.offset += tbuf.copy(this.data, this.offset)
        }

        this.data[this.offset++] = 0
    }

    /**
     * Copy data to the current position in the Buffer from another Buffer.
     * 
     * @param {buffer} a Buffer to copy from
     * 
     * @returns {void}
     */
    writeBytes (a: Buffer): void {
        this.offset += a.copy(this.data, this.offset, 0, a.length)
    }

    /**
     * Return the current Buffer.
     * 
     * @returns {Buffer}
     */
    finalize (): Buffer {
        const a = Buffer.allocUnsafe(this.offset)
        this.data.copy(a, 0, 0, this.offset)
        return a
    }
}
