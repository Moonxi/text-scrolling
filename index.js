;(function () {
  var list = document.querySelector('.list')

  function cloneFirstItem() {
    var firstItem = list.children[0]
    var clone = firstItem.cloneNode(true)
    list.append(clone)
  }
  cloneFirstItem()


  var curIndex = 0 // 目前展示第几项
  var ItemHeight = 30 // 每一项的高度
  setInterval(movetoNextItem, 2000)
  function movetoNextItem() {
    var from = curIndex * ItemHeight // 开始的滚动高度
    curIndex++
    if (curIndex >= list.children.length) {
      curIndex = 0
    }
    var to = curIndex * ItemHeight // 现在的滚动高度
    if (to === 0) {
      list.scollTop = 0
      movetoNextItem()
      return
    }
    var timeID = setInterval(function () {
      from += ItemHeight / 20
      list.scrollTop = from
      if (from >= to) {
        clearInterval(timeID)
      }
    }, 1000 / 60)
  }

  var index = 0
  function scroll() {
    console.log(list.scrollTop)
    var heights = []
    for (var i = 0; i < list.children.length - 1; i++) {
      heights.push(list.children[i].clientHeight)
    }
    if (index === heights.length) {
      list.scrollTo(0, 0)
    }
    if (index < 0) {
      index = index + heights.length
    }
    index = index % heights.length
    list.scrollBy({ top: heights[index], left: 0, behavior: 'smooth' })
    index++
  }

  var duration = 3000
  var timer
  function start() {
    if (timer) {
      return
    }
    timer = setInterval(scroll, duration)
  }
  // start()
  function stop() {
    clearInterval(timer)
    timer = null
  }
})()
