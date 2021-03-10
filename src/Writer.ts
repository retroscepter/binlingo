import { BYTE_LENGTH } from './constants'

/**
 * Represents a Binary Writer.
 */
export class Writer {
    /**
     * Current ArrayBuffer.
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
     * Current position in the DataView.
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
     * @param {number} [byteLength] Bytes of memory to allocate (defaults to 1048576)
     */
    constructor(offset?: number, byteLength?: number) {
        this.data = new ArrayBuffer(byteLength || BYTE_LENGTH)
        this.view = new DataView(this.data)
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
        this.view.setUint8(this.offset, value)
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
        this.view.setInt8(this.offset, value)
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
        this.view.setUint16(this.offset, value, true)
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
        this.view.setInt16(this.offset, value, true)
        this.offset += 2
        return this
    }

    /**
     * Write an unsigned 24 bit integer to the current position in the Buffer.
     * Actually writes an unsigned 32 bit integer because `DataView` doesn't natively support 24 bits, not recommended.
     * Use `Writer.writeUInt32()`.
     *
     * @deprecated
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeUInt24(value: number): Writer {
        return this.writeUInt32(value)
    }

    /**
     * Write a signed 24 bit integer to the current position in the Buffer.
     * Actually writes a signed 32 bit integer because `DataView` doesn't natively support 24 bits, not recommended.
     * Use `Writer.writeInt32()`.
     *
     * @deprecated
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeInt24(value: number): Writer {
        return this.writeInt32(value)
    }

    /**
     * Write an unsigned 32 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {Writer}
     */
    writeUInt32(value: number): Writer {
        this.view.setUint32(this.offset, value, true)
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
        this.view.setInt32(this.offset, value, true)
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
        this.view.setFloat32(this.offset, value, true)
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
        this.view.setFloat64(this.offset, value, true)
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
            for (const char of string) {
                const code = char.charCodeAt(0)
                this.writeUInt16(code)
            }
        }
        this.writeUInt16(0)
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
            for (const char of string) {
                const code = char.charCodeAt(0)
                this.writeUInt8(code)
            }
        }
        this.writeUInt8(0)
        return this
    }

    /**
     * Copy data to the current position in the Buffer from another Buffer.
     * This method does nothing and is only here for backwards compatibility.
     *
     * @deprecated
     *
     * @param {ArrayBuffer} buffer Buffer to copy from
     *
     * @returns {Writer}
     */
    writeBytes(buffer: ArrayBuffer): Writer {
        return this
    }

    /**
     * Return the current ArrayBuffer.
     *
     * @returns {ArrayBuffer}
     */
    finalize(): ArrayBuffer {
        return this.data.slice(0, this.offset)
    }
}
