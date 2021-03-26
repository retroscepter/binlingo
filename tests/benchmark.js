const Benchmark = require('benchmark')
const { Writer, DynWriter } = require('../lib')

const INT8_COUNT = 3000
const WRITER_LABEL = 'Writer#finalize (setup and finalize)'
const DYNWRITER_LABEL = 'DynWriter#finalize (setup and finalize)'

console.time(WRITER_LABEL)

const writer = new Writer(0, INT8_COUNT)

for (let i = 0; i < INT8_COUNT; i++) {
    const int = Math.floor(Math.random() * 256)
    writer.writeInt8(int)
}

writer.finalize()

console.timeEnd(WRITER_LABEL)
console.time(DYNWRITER_LABEL)

const dynWriter = new DynWriter(0)

for (let i = 0; i < INT8_COUNT; i++) {
    const int = Math.floor(Math.random() * 256)
    dynWriter.writeInt8(int)
}

dynWriter.finalize()

console.timeEnd(DYNWRITER_LABEL)

new Benchmark.Suite()
    .add('Writer#finalize', function () {
        writer.finalize()
    })
    .add('DynWriter#finalize', function () {
        dynWriter.finalize()
    })
    .on('cycle', function (event) {
        console.log(String(event.target))
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    .run({ async: true })
