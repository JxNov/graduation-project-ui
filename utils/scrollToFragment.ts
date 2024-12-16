const blink = (id: string): number | null => {
  const element = document.getElementById(id)

  if (element) {
    let timeout = 0
    const interval = setInterval(() => {
      element.classList.add('ring-1', 'ring-primary')
      element.classList.toggle('bg-muted/50')
      timeout++

      if (timeout >= 5) {
        clearInterval(interval)
      }
    }, 200)

    const cleanup = () => {
      clearInterval(interval)
      element.classList.remove('ring-1', 'ring-primary', 'bg-muted/50')
    }

    return window.setTimeout(cleanup, 3000)
  }

  return null
}

export const scrollToFragment = (id: string): void => {
  const element = document.getElementById(id)
  if (element) {
    // window.scrollTo({
    //   top: element.offsetTop - 67,
    //   behavior: 'smooth'
    // })

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })

    const existingTimeoutId = element.getAttribute('data-timeout-id')
    if (existingTimeoutId) {
      clearTimeout(parseInt(existingTimeoutId))
    }

    if (element.classList.contains('bg-muted/50')) {
      element.classList.remove('bg-muted/50')
    }

    const timeoutId = blink(id)
    if (timeoutId !== null) {
      element.setAttribute('data-timeout-id', timeoutId.toString())
    }
  }
}