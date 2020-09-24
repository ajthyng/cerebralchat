type HandlerFn = (result: any) => void

const _handlers = new Map<string, Set<Function>>()

const Subject = {
  subscribe (event: string, handler: HandlerFn) {
    if (!_handlers.has(event)) _handlers.set(event, new Set())
    _handlers.set(event, _handlers.get(event)?.add(handler) as Set<Function>)
  },
  unsubscribe (event: string, handler: HandlerFn) {
    if (!_handlers.has(event)) return
    const eventHandlers = _handlers.get(event)
    if (eventHandlers) {
      eventHandlers.delete(handler)
    }
  },
  next (event: string, ...args: any) {
    if (!_handlers.has(event)) return
    const eventHandlers = _handlers.get(event)
    if (eventHandlers) {
      for (const handler of eventHandlers) {
        handler(...args)
      }
    }
  }
}

Object.freeze(Subject)

export { Subject }
