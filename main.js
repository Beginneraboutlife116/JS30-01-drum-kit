const keys = document.querySelectorAll('.key')
const introDialog = document.querySelector('.intro-dialog')
const openDialog = document.querySelector('.open-dialog')
const closeDialog = document.querySelector('.intro-dialog__close-button')

// * 處理提供資訊的modal
let focusElementIndex = -1
introDialog.showModal()
openDialog.addEventListener('click', () => {
  introDialog.showModal()
})
closeDialog.addEventListener('click', () => {
  introDialog.close()
  if (focusElementIndex !== -1) {
    keys[focusElementIndex].focus()
    focusElementIndex = -1
  }
})

// * 播放音樂
function playSound(key) {
  const audio = key?.lastElementChild
  if (!audio) return
  audio.currentTime = 0
  audio.play()
  key.classList.add('playing')
}

// * 箭頭上下左右相對應的動作，包括取消focus及focus下一個或上一個
function arrowUpAndArrowLeft(buttonIndex) {
  if (buttonIndex === 0) return
  keys[buttonIndex].blur()
  keys[buttonIndex - 1].focus()
}
function arrowDownAndArrowRight(buttonIndex) {
  if (buttonIndex === keys.length - 1) return
  keys[buttonIndex].blur()
  keys[buttonIndex + 1].focus()
}

// * 在window時，按下提示按鈕的聲音
window.addEventListener('keydown', (event) => {
  const key = document.querySelector(`.key[data-key='${event.code}'`)
  playSound(key)
})


keys.forEach((key, index) => {

  // * 當玩家在focus狀態下開啟introduction的時候，focus被移出的暫存
  key.addEventListener('focusout', event => {
    focusElementIndex = index
  })

  // * 用滑鼠點擊，或者是當button被focus的時候，可以使用enter、space
  key.addEventListener('click', event => {
    const key = event.target.closest('.key')
    playSound(key)
  })

  // * 使用arrow keyboard移動
  key.addEventListener('keyup', event => {
    const keyCode = event.code
    const backward = ['ArrowUp', 'ArrowLeft']
    const forward = ['ArrowDown', 'ArrowRight']
    if (forward.includes(keyCode)) {
      arrowDownAndArrowRight(index)
      return
    }
    if (backward.includes(keyCode)) {
      arrowUpAndArrowLeft(index)
      return
    }
  })

  // * 將.playing樣式取消掉
  key.addEventListener('transitionend', () => {
    key.classList.remove('playing')
  })
})