import { useEventListener } from "@vueuse/core"
import { computed, onMounted, ref, Ref } from "vue"
import { isMobile } from "."

function useDrag(
  el: Ref<HTMLElement>,
  option?: {
    initialValue?: {
      right: number
      bottom: number
    }
  }
) {
  let diffLeft = 0
  let diffTop = 0
  const stopClick = ref(false)
  const right = ref(option?.initialValue?.right || 0)
  const bottom = ref(option?.initialValue?.bottom || 0)
  const availHeight = document.documentElement.clientHeight
  const availWidth = document.documentElement.clientWidth

  if (isMobile()) {
    useEventListener(el, "touchstart", handleDown)
  } else {
    useEventListener(el, "pointerdown", handleDown)
  }
  onMounted(() => {
    option?.initialValue &&
      resetPostion(option?.initialValue.right, option?.initialValue.bottom)
  })

  function setGrabbingCursor() {
    el.value.style.cursor = "grabbing"
  }

  function handleDown(event: TouchEvent | PointerEvent) {
    if (event instanceof PointerEvent) {
      diffLeft = event.x - el.value.offsetLeft
      diffTop = event.y - el.value.offsetTop
      window.addEventListener("pointermove", handleMove)
      window.addEventListener("pointerup", handleUp)
      el.value.addEventListener("mousemove", setGrabbingCursor, {
        passive: true,
      })
    } else {
      diffLeft = event.touches[0].clientX - el.value.offsetLeft
      diffTop = event.touches[0].clientY - el.value.offsetTop
      el.value.addEventListener("touchmove", handleMove)
      el.value.addEventListener("touchend", handleUp)
    }
  }

  function handleUp(event: TouchEvent | PointerEvent) {
    if (event instanceof PointerEvent) {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
      el.value.removeEventListener("mousemove", setGrabbingCursor)
    } else {
      el.value.removeEventListener("touchmove", handleMove)
      el.value.removeEventListener("touchend", handleUp)
    }
    el.value.style.cursor = "default"
    setTimeout(() => {
      stopClick.value = false
    }, 1)
  }

  function handleMove(event: TouchEvent | PointerEvent) {
    event.preventDefault()
    let offsetLeft: number = 0
    let offsetTop: number = 0

    if (event instanceof PointerEvent) {
      stopClick.value = true
      offsetLeft = event.x
      offsetTop = event.y
    } else {
      offsetLeft = event.touches[0].clientX
      offsetTop = event.touches[0].clientY
    }

    offsetLeft = offsetLeft - diffLeft
    offsetTop = offsetTop - diffTop
    setPosition(offsetLeft, offsetTop)
  }

  function resetPostion(offsetRight: number, offsetBottom: number) {
    offsetRight = Math.max(0, offsetRight)
    offsetRight = Math.min(offsetRight, availWidth - el.value.clientWidth)
    offsetBottom = Math.max(0, offsetBottom)
    offsetBottom = Math.min(offsetBottom, availHeight - el.value.clientHeight)
    right.value = offsetRight
    bottom.value = offsetBottom
  }

  function setPosition(offsetLeft: number, offsetTop: number) {
    let offsetRight = availWidth - (offsetLeft + el.value.clientWidth)
    let offsetBottom = availHeight - (offsetTop + el.value.clientHeight)
    resetPostion(offsetRight, offsetBottom)
  }

  return {
    stopClick,
    right,
    bottom,
    style: computed(() => `bottom:${bottom.value}px;right:${right.value}px;`),
  }
}

export { useDrag }
