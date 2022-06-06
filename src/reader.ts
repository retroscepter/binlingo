/**
 * Represents a Binary Reader.
 */
export class Reader {
    /**
     * Buffer the Reader is reading the data from.
     *
     * @private
     *
     * @type {ArrayBuffer}
     */
    private data: ArrayBuffer

    /**
     * Current DataView.
     *
     * @private
     *
     * @type {DataView}
     */
    private view: DataView

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
     * @param {ArrayBuffer} data ArrayBuffer to read from
     * @param {number} [offset] Position in the ArrayBuffer to start from
     */
    constructor(data: ArrayBuffer, offset?: number) {
        this.data = data
        this.offset = offset || 0
        this.view = new DataView(this.data)
    }

    /**
     * Byte length of the current ArrayBuffer.
     *
     * @public
     *
     * @returns {number}
     */
    public get length(): number {
        return this.view.byteLength
    }

    /**
     * Read the unsigned 8 bit integer from the current position in the Buffer.
     *
     * @returns {number}
     */
    readUint8(): number {
        const value = this.view.getUint8(this.offset)
        this.offset++
        return value
    }

    /**
     * Read the signed 8 bit integer from the current position in the Buffer.
     *
     * @returns {number}
     */
    readInt8(): number {
        const value = this.view.getInt8(this.offset)
        this.offset++
        return value
    }

    /**
     * Read the unsigned 16 bit integer from the current position in the Buffer.
     *
     * @returns {number}
     */
    readUint16(): number {
        const value = this.view.getUint16(this.offset, true)
        this.offset += 2
        return value
    }

    /**
     * Read the signed 16 bit integer from the current position in the Buffer.
     *
     * @returns {number}
     */
    readInt16(): number {
        const value = this.view.getInt16(this.offset, true)
        this.offset += 2
        return value
    }

    /**
     * Read the unsigned 24 bit integer from the current position in the Buffer.
     *
     * @returns {number}
     */
    readUint24(): number {
        let value = 0
        value = this.view.getInt8(this.offset + 2) << 16
        value |= this.view.getInt8(this.offset + 1) << 8
        value |= this.view.getInt8(this.offset)
        this.offset += 3
        return value
    }

    /**
     * Read the signed 24 bit integer from the current position in the Buffer.
     *
     * @returns {number}
     */
    readInt24(): number {
        const value = this.readUint24()
        const negate = value & 0x800000
        if (!negate) return value
        return (0xffffff - value + 1) * -1
    }

    /**
     * Read the unsigned 32 bit integer from the current position in the Buffer.
     *
     * @returns {number}
     */
    readUint32(): number {
        const value = this.view.getUint32(this.offset, true)
        this.offset += 4
        return value
    }

    /**
     * Read the signed 32 bit integer from the current position in the Buffer.
     *
     * @returns {number}
     */
    readInt32(): number {
        const value = this.view.getInt32(this.offset, true)
        this.offset += 4
        return value
    }

    /**
     * Read the 32 bit float from the current position in the Buffer.
     *
     * @returns {number}
     */
    readFloat(): number {
        const value = this.view.getFloat32(this.offset, true)
        this.offset += 4
        return value
    }

    /**
     * Read the 64 bit double from the current position in the Buffer.
     *
     * @returns {number}
     */
    readDouble(): number {
        const value = this.view.getFloat64(this.offset, true)
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
    skip(count: number): void {
        this.offset += count
    }

    /**
     * Read the UCS-2 encoded string from the current position in the Buffer.
     *
     * @deprecated
     * @returns {string}
     */
    readZTStringUCS2(): string {
        return this.readZTStringUTF8()
    }

    /**
     * Read the UTF-8 encoded string from the current position in the Buffer.
     *
     * @returns {string}
     */
    readZTStringUTF8(): string {
        let string = ''
        let byte: number

        while ((byte = this.readUint8()) !== 0)
            string += String.fromCharCode(byte)

        return decodeURIComponent(escape(string))
    }
}
