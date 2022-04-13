type Expression = () => void

type Parameters = Expression | [Expression, IntersectionObserverInit?]

export default (el: HTMLElement, parameters: Parameters) => {
  if (!Array.isArray(parameters)) {
    parameters = [parameters]
  }

  const expression = parameters[0]
  const options = parameters[1] ?? {}

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting === false) return

      expression()
    })
  }, options)

  observer.observe(el)

  return {
    destroy() {
      observer.disconnect()
    },
  }
}
