const Benchmark = require('benchmark')
const { Writer, DynWriter } = require('../lib')

const INT8_COUNT = 3000

const suite = new Benchmark.Suite()

const writer = new Writer(0, INT8_COUNT)
const dynWriter = new DynWriter(0)

for (let i = 0; i < INT8_COUNT; i++) {
    const int = Math.floor(Math.random() * 256)
    writer.writeInt8(int)
    dynWriter.writeInt8(int)
}

const writerLabel = 'Writer#finalize (1 run sample)'
const dynWriterLabel = 'DynWriter#finalize (1 run sample)'

console.time(writerLabel)
writer.finalize()
console.timeEnd(writerLabel)

console.time(dynWriterLabel)
dynWriter.finalize()
console.timeEnd(dynWriterLabel)

suite
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
