import init, { set_panic_hook, Slime } from '../pkg_mob/slime.js'

init().then(() => {
  set_panic_hook()

  const canvas = document.getElementById('drawing')
  const ctx = canvas.getContext('2d')

  canvas.setAttribute('width', Slime.width())
  canvas.setAttribute('height', Slime.height())

  const slime = Slime.new(5000)

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
