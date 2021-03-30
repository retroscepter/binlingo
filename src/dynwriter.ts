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

function writeFloat(
    dest: number[],
    value: number,
    offset: number,
    le: boolean,
    mantissa: number,
    bytes: number
) {
    let e, m, c
    let eLen = bytes * 8 - mantissa - 1
    const eMax = (1 << eLen) - 1
    const eBias = eMax >> 1
    const rt = mantissa === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0
    let i = le ? 0 : bytes - 1
    const d = le ? 1 : -1
    const s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

    value = Math.abs(value)

    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0
        e = eMax
    } else {
        e = Math.floor(Math.log(value) / Math.LN2)
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--
            c *= 2
        }
        if (e + eBias >= 1) {
            value += rt / c
        } else {
            value += rt * Math.pow(2, 1 - eBias)
        }
        if (value * c >= 2) {
            e++
            c /= 2
        }
        if (e + eBias >= eMax) {
            m = 0
            e = eMax
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mantissa)
            e = e + eBias
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mantissa)
            e = 0
        }
    }

    while (mantissa >= 8) {
        dest[offset + i] = m & 0xff
        i += d
        m /= 256
        mantissa -= 8
    }

    e = (e << mantissa) | m
    eLen += mantissa

    while (eLen > 0) {
        dest[offset + i] = e & 0xff
        i += d
        e /= 256
        eLen -= 8
    }

    dest[offset + i - d] |= s * 128
}
