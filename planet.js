const { parse } = require('csv-parse');
const fs = require('fs')

const planetWithWater = []

function isPlanetWithWater(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_period'] > 300 && planet['koi_period'] < 600
    && planet['koi_teq'] > 0 && planet['koi_teq'] < 45
}

fs.createReadStream('keplar_data.csv').pipe(parse({
    comment: '#',
    columns: true,
    
}))
.on('data', (data)=> {
    if (isPlanetWithWater(data)) {
        planetWithWater.push(data)
    }
}).on('error', (err) => {
    console.log(err)
}).on('end', () => {
    console.log(`${planetWithWater.length} planets with water found`)
})