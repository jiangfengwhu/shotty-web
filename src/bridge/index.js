
function setupWKWebViewJavascriptBridge(callback) {
    if (window.WKWebViewJavascriptBridge) { return callback(WKWebViewJavascriptBridge); }
    if (window.WKWVJBCallbacks) { return window.WKWVJBCallbacks.push(callback); }
    window.WKWVJBCallbacks = [callback];
    window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
  }

let jsBridge;

function initJsBridge() {
    setupWKWebViewJavascriptBridge((bridge) => {
      jsBridge = bridge;
    });
  }

  export { initJsBridge, jsBridge };