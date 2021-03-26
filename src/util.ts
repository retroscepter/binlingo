export function readFloat(
    dest: number[],
    offset: number,
    le: boolean,
    mantissa: number,
    bytes: number
) {
    let e, m
    const eLen = bytes * 8 - mantissa - 1
    const eMax = (1 << eLen) - 1
    const eBias = eMax >> 1
    let bits = -7
    let i = le ? bytes - 1 : 0
    const d = le ? -1 : 1
    let s = dest[offset + i]

    i += d

    e = s & ((1 << -bits) - 1)
    s >>= -bits
    bits += eLen

    while (bits > 0) {
        e = e * 256 + dest[offset + i]
        i += d
        bits -= 8
    }

    m = e & ((1 << -bits) - 1)
    e >>= -bits
    bits += mantissa

    while (bits > 0) {
        m = m * 256 + dest[offset + i]
        i += d
        bits -= 8
    }

    if (e === 0) {
        e = 1 - eBias
    } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity
    } else {
        m = m + Math.pow(2, mantissa)
        e = e - eBias
    }

    return (s ? -1 : 1) * m * Math.pow(2, e - mantissa)
}

export function writeFloat(
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
