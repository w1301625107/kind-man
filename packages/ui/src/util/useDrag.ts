import { useEventListener, MaybeRef, useElementBounding } from "@vueuse/core"

import { clamp, toRefs } from "@vueuse/shared"

import { computed, onMounted, ref, Ref, unref } from "vue"
import { isMobile } from "."

type Position = {
  right: number
  bottom: number
}

function useDrag(
  el: MaybeRef<HTMLElement>,
  option: {
    initialValue?: MaybeRef<Position>
  } = {}
) {
  let diffLeft = 0
  let diffTop = 0
  let target: HTMLElement
  const stopClick = ref(false)
  const cursor: Ref<"default" | "grabbing"> = ref("default")
  const position: Ref<Position> = ref(
    option.initialValue ?? {
      right: 0,
      bottom: 0,
    }
  )
  const { width, height } = useElementBounding(el)
  // const { left, right, top, bottom } = useElementBounding(
  //   document.documentElement
  // )

  const availHeight = ref(document.documentElement.clientHeight)
  const availWidth = ref(document.documentElement.clientWidth)

  onMounted(() => {
    target = unref(el)
    if (isMobile()) {
      useEventListener(target, "touchstart", handleDown)
    } else {
      useEventListener(target, "pointerdown", handleDown)
    }
    clampPostion(position.value.right, position.value.bottom)
  })

  function setGrabbingCursor() {
    cursor.value = "grabbing"
  }

  function handleDown(event: TouchEvent | PointerEvent) {
    if (event instanceof PointerEvent) {
      diffLeft = event.x - target.offsetLeft
      diffTop = event.y - target.offsetTop
      window.addEventListener("pointermove", handleMove)
      window.addEventListener("pointerup", handleUp)
      target.addEventListener("mousemove", setGrabbingCursor, {
        passive: true,
      })
    } else {
      diffLeft = event.touches[0].clientX - target.offsetLeft
      diffTop = event.touches[0].clientY - target.offsetTop
      target.addEventListener("touchmove", handleMove)
      target.addEventListener("touchend", handleUp)
    }
  }

  function handleUp(event: TouchEvent | PointerEvent) {
    if (event instanceof PointerEvent) {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
      target.removeEventListener("mousemove", setGrabbingCursor)
    } else {
      target.removeEventListener("touchmove", handleMove)
      target.removeEventListener("touchend", handleUp)
    }
    cursor.value = "default"
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

  function clampPostion(offsetRight: number, offsetBottom: number) {
    position.value.right = clamp(offsetRight, 0, availWidth.value - width.value)
    position.value.bottom = clamp(
      offsetBottom,
      0,
      availHeight.value - height.value
    )
  }

  function setPosition(offsetLeft: number, offsetTop: number) {
    let offsetRight = availWidth.value - (offsetLeft + width.value)
    let offsetBottom = availHeight.value - (offsetTop + height.value)
    clampPostion(offsetRight, offsetBottom)
  }

  return {
    ...toRefs(position),
    // top: computed(() => {
    //   return availHeight.value - position.value.bottom - height.value
    // }),
    // left: computed(() => {
    //   return availWidth.value - position.value.right - width.value
    // }),
    stopClick,
    style: computed(
      () =>
        `bottom:${position.value.bottom}px;right:${position.value.right}px;cursor:${cursor.value}`
    ),
  }
}

export { useDrag }
