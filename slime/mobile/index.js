import init, { set_panic_hook, Slime } from './pkg/slime.js'

init().then(() => {
  set_panic_hook()

  const canvas = document.getElementById('drawing')
  const ctx = canvas.getContext('2d')

  const WIDTH = Slime.width()
  const HEIGHT = Slime.height()
  canvas.setAttribute('width', WIDTH)
  canvas.setAttribute('height', HEIGHT)

  const slime = Slime.new(20000)
  // const slime = Slime.new(100)

  const forwardMouseEvent = (ev) => {
    canvas.addEventListener(ev, (e) => {
      const slimeX = (e.x / window.innerWidth) * WIDTH
      const slimeY = (e.y / window.innerHeight) * HEIGHT
      slime[ev](slimeX, slimeY)
    })
  }

  forwardMouseEvent('mousedown')
  forwardMouseEvent('mouseup')
  forwardMouseEvent('mousemove')

  let timeoutHandle
  document.addEventListener('mousemove', () => {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
    }

    document.getElementById('help').classList.remove('fade')

    timeoutHandle = setTimeout(() => {
      document.getElementById('help').classList.add('fade')
    }, 2000)
  })

  document.addEventListener('keypress', (e) => {
    switch (e.key) {
      case 'c':
        slime.color()
    }
  })

  // let terminate = false
  let prevTime
  const update = (time) => {
    // if (terminate) {
    //   return
    // }

    // if (time - prevTime > 1000 / 30) {
    // console.log('Below 30fps; time: ', time - prevTime)
    // }

    slime.simulate(time - prevTime, ctx)
    prevTime = time

    window.requestAnimationFrame(update)
  }

  // setTimeout(() => {
  //   terminate = true
  //   console.log('Terminated')
  // }, 500000)

  update()
})
