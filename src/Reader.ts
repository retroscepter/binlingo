
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
        const value = this.data.readUInt8(this.offset)
        this.offset++
        return value
    }

    /**
     * Read the signed 8 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readInt8 (): number {
        const value = this.data.readInt8(this.offset)
        this.offset++
        return value
    }

    /**
     * Read the unsigned 16 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readUInt16 (): number {
        const value = this.data.readUInt16LE(this.offset)
        this.offset += 2
        return value
    }

    /**
     * Read the signed 16 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readInt16 (): number {
        const value = this.data.readInt16LE(this.offset)
        this.offset += 2
        return value
    }

    /**
     * Read the unsigned 24 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readUInt24 (): number {
        const value = this.data.readUIntLE(this.offset, 3)
        this.offset += 3
        return value
    }

    /**
     * Read the signed 24 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readInt24 (): number {
        const value = this.data.readIntLE(this.offset, 3)
        this.offset += 3
        return value
    }

    /**
     * Read the unsigned 32 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readUInt32 (): number {
        const value = this.data.readUInt32LE(this.offset)
        this.offset += 4
        return value
    }

    /**
     * Read the signed 32 bit integer from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readInt32 (): number {
        const value = this.data.readInt32LE(this.offset)
        this.offset += 4
        return value
    }

    /**
     * Read the 32 bit float from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readFloat (): number {
        const value = this.data.readFloatLE(this.offset)
        this.offset += 4
        return value
    }

    /**
     * Read the 64 bit double from the current position in the Buffer.
     * 
     * @returns {number}
     */
    readDouble (): number {
        const value = this.data.readDoubleLE(this.offset)
        this.offset += 8
        return value
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
        return this.data.slice(start, index).toString('utf8')
    }
}
