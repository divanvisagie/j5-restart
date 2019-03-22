const usbDetect = require('usb-detection')

const startBoardProgram  = () => {

    const five = require('johnny-five')

    const board = new five.Board()
    board.on('ready', () => {
        const led = new five.Led(13)
        led.blink(500, () => {
            // console.log('blink', Date.now())
        })
        // console.log(five.Board)
    })
    board.on('disconnect', () => {
        console.log('Handling board disconnect')
        delete require.cache[require.resolve('johnny-five')]
    })

}



usbDetect.startMonitoring()


usbDetect.find((err, devices) => { 
    const arduinos = devices.filter(d => d.manufacturer.includes('Arduino'))

    if (arduinos.length > 0) {
        startBoardProgram()
    }
})

usbDetect.on('add', (device) => {
    console.log(`add`, device)

    startBoardProgram()
})

usbDetect.on('remove', (device) => {
    console.log(`remove`, device)
})
