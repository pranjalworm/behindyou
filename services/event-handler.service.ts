class CustomEventHandler {

  subscribe(eventName: any, cb: any) {

    if (typeof window !== 'undefined') {
      window.addEventListener(eventName, cb);
    }
  }

  emit(eventName: string, payload: any) {

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
    }
  }
}

export class EventHandler {

  private static handler: CustomEventHandler;

  public static getHandler() {

    if (!EventHandler.handler) {
      EventHandler.handler = new CustomEventHandler();
    }

    return EventHandler.handler;
  }
}