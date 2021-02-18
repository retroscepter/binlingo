
/**
 * Represents a Binary Reader.
 */
export class Reader {
    /**
     * Buffer the Reader is reading the data from.
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
     * Create a Binary Reader.
     * 
     * @param {Buffer} data Buffer to read from
     * @param {number} [offset] Position in the Buffer to start from
     */
    constructor (data: Buffer, offset?: number) {
        this.data = data
        this.offset = offset || 0
    }

    /**
     * Length of the current Buffer.
     * 
     * @public
     * 
     * @returns {number}
     */
    public get length (): number {
        return this.data.length
    }

    /**
     * Read the unsigned 8 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readUInt8 (): number {
        return this.data[this.offset++]
    }

    /**
     * Read the signed 8 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readInt8 (): number {
        const a = this.data[this.offset++]
        return a < 0x7F ? a : -a + 0x7F
    }

    /**
     * Read the unsigned 16 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readUInt16 (): number {
        const a = this.data.readUInt16LE(this.offset)
        this.offset += 2
        return a
    }

    /**
     * Read the signed 16 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readInt16 (): number {
        const a = this.data.readInt16LE(this.offset)
        this.offset += 2
        return a
    }

    /**
     * Read the unsigned 24 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readUInt24 (): number {
        const a = this.data.readUIntLE(this.offset, 3)
        this.offset += 3
        return a
    }

    /**
     * Read the signed 24 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readInt24 (): number {
        const a = this.data.readIntLE(this.offset, 3)
        this.offset += 3
        return a
    }

    /**
     * Read the unsigned 32 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readUInt32 (): number {
        const a = this.data.readUInt32LE(this.offset)
        this.offset += 4
        return a
    }

    /**
     * Read the signed 32 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readInt32 (): number {
        const a = this.data.readInt32LE(this.offset)
        this.offset += 4
        return a
    }

    /**
     * Read the 32 bit float from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readFloat32 (): number {
        const a = this.data.readFloatLE(this.offset)
        this.offset += 4
        return a
    }

    /**
     * Read the 64 bit float from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readFloat64 (): number {
        const a = this.data.readDoubleLE(this.offset)
        this.offset += 8
        return a
    }

    /**
     * Skip bytes in the current Buffer.
     * 
     * @param {number} count Number of bytes to skip
     * 
     * @returns {void}
     */
    skip (count: number): void {
        this.offset += count
    }

    /**
     * Read the UCS-2 encoded string from the current position in the Buffer.
     * 
     * @returns {string}
     */
    readZTStringUCS2 (): string {
        let start = this.offset, index = this.offset
        while (index + 2 < this.length && this.readUInt16() !== 0) index += 2
        return this.data.slice(start, index).toString('ucs2')
    }

    /**
     * Read the UTF-8 encoded string from the current position in the Buffer.
     * 
     * @returns {string}
     */
    readZTStringUTF8 (): string {
        let start = this.offset, index = this.offset
        while (index + 1 < this.length && this.readUInt8() !== 0) index++
        return this.data.slice(start, index).toString('utf-8')
    }
}
