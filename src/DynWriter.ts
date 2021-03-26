import { writeFloat } from './util'

/**
 * Represents a Binary Writer and dynamically allocates memory.
 */
export class DynWriter {
    /**
     * Current data.
     *
     * @private
     *
     * @type {number[]}
     */
    private data: number[] = []

    /**
     * Current position in the DataView.
     *
     * @private
     *
     * @type {number}
     */
    private offset: number

    /**
     * Create a Binary Writer than dynamically allocates memory.
     *
     * @param {number} [offset] Position in the Buffer to start from
     */
    constructor(offset?: number) {
        this.offset = offset || 0
    }

    /**
     * Write an unsigned 8 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {DynWriter}
     */
    writeUInt8(value: number): DynWriter {
        this.data[this.offset] = value & 0xff
        this.offset++
        return this
    }

    /**
     * Write a signed 8 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {DynWriter}
     */
    writeInt8(value: number): DynWriter {
        if (value < 0) value = 0xff + value + 1
        this.data[this.offset] = value & 0xff
        this.offset++
        return this
    }

    /**
     * Write an unsigned 16 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {DynWriter}
     */
    writeUInt16(value: number): DynWriter {
        this.data[this.offset] = value & 0xff
        this.data[this.offset + 1] = value >> 8
        this.offset += 2
        return this
    }

    /**
     * Write a signed 16 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {DynWriter}
     */
    writeInt16(value: number): DynWriter {
        this.data[this.offset] = value & 0xff
        this.data[this.offset + 1] = value >> 8
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
     * @returns {DynWriter}
     */
    writeUInt24(value: number): DynWriter {
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
     * @returns {DynWriter}
     */
    writeInt24(value: number): DynWriter {
        return this.writeInt32(value)
    }

    /**
     * Write an unsigned 32 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {DynWriter}
     */
    writeUInt32(value: number): DynWriter {
        this.data[this.offset + 3] = value >> 24
        this.data[this.offset + 2] = value >> 16
        this.data[this.offset + 1] = value >> 8
        this.data[this.offset] = value & 0xff
        this.offset += 4
        return this
    }

    /**
     * Write a signed 32 bit integer to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {DynWriter}
     */
    writeInt32(value: number): DynWriter {
        this.data[this.offset] = value & 0xff
        this.data[this.offset + 1] = value >> 8
        this.data[this.offset + 2] = value >> 16
        this.data[this.offset + 3] = value >> 24
        this.offset += 4
        return this
    }

    /**
     * Write a 32 bit float to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {DynWriter}
     */
    writeFloat(value: number): DynWriter {
        writeFloat(this.data, value, this.offset, true, 23, 4)
        this.offset += 4
        return this
    }

    /**
     * Write a 64 bit double to the current position in the Buffer.
     *
     * @param {number} value Value
     *
     * @returns {DynWriter}
     */
    writeDouble(value: number): DynWriter {
        writeFloat(this.data, value, this.offset, true, 52, 8)
        this.offset += 8
        return this
    }

    /**
     * Write a UCS-2 encoded string to the current position in the Buffer.
     *
     * @param {string} string Value
     *
     * @returns {DynWriter}
     */
    writeZTStringUCS2(string: string): DynWriter {
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
     * @returns {DynWriter}
     */
    writeZTStringUTF8(string: string): DynWriter {
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
     * @returns {DynWriter}
     */
    writeBytes(buffer: ArrayBuffer): DynWriter {
        return this
    }

    /**
     * Return the current ArrayBuffer.
     *
     * @returns {ArrayBuffer}
     */
    finalize(): ArrayBuffer {
        const buffer = new ArrayBuffer(this.data.length)
        const view = new Int8Array(buffer)
        view.set(this.data)
        return buffer
    }
}
