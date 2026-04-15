(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter2() {
        EventEmitter2.init.call(this);
      }
      module.exports = EventEmitter2;
      module.exports.once = once;
      EventEmitter2.EventEmitter = EventEmitter2;
      EventEmitter2.prototype._events = void 0;
      EventEmitter2.prototype._eventsCount = 0;
      EventEmitter2.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter2.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter2.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter2.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
      EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter2.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter2.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter2.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter2.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/cross-fetch/dist/browser-ponyfill.js
  var require_browser_ponyfill = __commonJS({
    "node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
      var __global__ = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;
      var __globalThis__ = function() {
        function F() {
          this.fetch = false;
          this.DOMException = __global__.DOMException;
        }
        F.prototype = __global__;
        return new F();
      }();
      (function(globalThis2) {
        var irrelevant = function(exports2) {
          var g = typeof globalThis2 !== "undefined" && globalThis2 || typeof self !== "undefined" && self || // eslint-disable-next-line no-undef
          typeof global !== "undefined" && global || {};
          var support = {
            searchParams: "URLSearchParams" in g,
            iterable: "Symbol" in g && "iterator" in Symbol,
            blob: "FileReader" in g && "Blob" in g && function() {
              try {
                new Blob();
                return true;
              } catch (e) {
                return false;
              }
            }(),
            formData: "FormData" in g,
            arrayBuffer: "ArrayBuffer" in g
          };
          function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
          }
          if (support.arrayBuffer) {
            var viewClasses = [
              "[object Int8Array]",
              "[object Uint8Array]",
              "[object Uint8ClampedArray]",
              "[object Int16Array]",
              "[object Uint16Array]",
              "[object Int32Array]",
              "[object Uint32Array]",
              "[object Float32Array]",
              "[object Float64Array]"
            ];
            var isArrayBufferView = ArrayBuffer.isView || function(obj) {
              return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
            };
          }
          function normalizeName(name) {
            if (typeof name !== "string") {
              name = String(name);
            }
            if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
              throw new TypeError('Invalid character in header field name: "' + name + '"');
            }
            return name.toLowerCase();
          }
          function normalizeValue(value) {
            if (typeof value !== "string") {
              value = String(value);
            }
            return value;
          }
          function iteratorFor(items) {
            var iterator = {
              next: function() {
                var value = items.shift();
                return { done: value === void 0, value };
              }
            };
            if (support.iterable) {
              iterator[Symbol.iterator] = function() {
                return iterator;
              };
            }
            return iterator;
          }
          function Headers2(headers) {
            this.map = {};
            if (headers instanceof Headers2) {
              headers.forEach(function(value, name) {
                this.append(name, value);
              }, this);
            } else if (Array.isArray(headers)) {
              headers.forEach(function(header) {
                if (header.length != 2) {
                  throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + header.length);
                }
                this.append(header[0], header[1]);
              }, this);
            } else if (headers) {
              Object.getOwnPropertyNames(headers).forEach(function(name) {
                this.append(name, headers[name]);
              }, this);
            }
          }
          Headers2.prototype.append = function(name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ", " + value : value;
          };
          Headers2.prototype["delete"] = function(name) {
            delete this.map[normalizeName(name)];
          };
          Headers2.prototype.get = function(name) {
            name = normalizeName(name);
            return this.has(name) ? this.map[name] : null;
          };
          Headers2.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name));
          };
          Headers2.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = normalizeValue(value);
          };
          Headers2.prototype.forEach = function(callback, thisArg) {
            for (var name in this.map) {
              if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this);
              }
            }
          };
          Headers2.prototype.keys = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push(name);
            });
            return iteratorFor(items);
          };
          Headers2.prototype.values = function() {
            var items = [];
            this.forEach(function(value) {
              items.push(value);
            });
            return iteratorFor(items);
          };
          Headers2.prototype.entries = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push([name, value]);
            });
            return iteratorFor(items);
          };
          if (support.iterable) {
            Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
          }
          function consumed(body) {
            if (body._noBody)
              return;
            if (body.bodyUsed) {
              return Promise.reject(new TypeError("Already read"));
            }
            body.bodyUsed = true;
          }
          function fileReaderReady(reader) {
            return new Promise(function(resolve, reject) {
              reader.onload = function() {
                resolve(reader.result);
              };
              reader.onerror = function() {
                reject(reader.error);
              };
            });
          }
          function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob);
            return promise;
          }
          function readBlobAsText(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
            var encoding = match ? match[1] : "utf-8";
            reader.readAsText(blob, encoding);
            return promise;
          }
          function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf);
            var chars = new Array(view.length);
            for (var i = 0; i < view.length; i++) {
              chars[i] = String.fromCharCode(view[i]);
            }
            return chars.join("");
          }
          function bufferClone(buf) {
            if (buf.slice) {
              return buf.slice(0);
            } else {
              var view = new Uint8Array(buf.byteLength);
              view.set(new Uint8Array(buf));
              return view.buffer;
            }
          }
          function Body() {
            this.bodyUsed = false;
            this._initBody = function(body) {
              this.bodyUsed = this.bodyUsed;
              this._bodyInit = body;
              if (!body) {
                this._noBody = true;
                this._bodyText = "";
              } else if (typeof body === "string") {
                this._bodyText = body;
              } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body;
              } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body;
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString();
              } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer);
                this._bodyInit = new Blob([this._bodyArrayBuffer]);
              } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body);
              } else {
                this._bodyText = body = Object.prototype.toString.call(body);
              }
              if (!this.headers.get("content-type")) {
                if (typeof body === "string") {
                  this.headers.set("content-type", "text/plain;charset=UTF-8");
                } else if (this._bodyBlob && this._bodyBlob.type) {
                  this.headers.set("content-type", this._bodyBlob.type);
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                  this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                }
              }
            };
            if (support.blob) {
              this.blob = function() {
                var rejected = consumed(this);
                if (rejected) {
                  return rejected;
                }
                if (this._bodyBlob) {
                  return Promise.resolve(this._bodyBlob);
                } else if (this._bodyArrayBuffer) {
                  return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                } else if (this._bodyFormData) {
                  throw new Error("could not read FormData body as blob");
                } else {
                  return Promise.resolve(new Blob([this._bodyText]));
                }
              };
            }
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                var isConsumed = consumed(this);
                if (isConsumed) {
                  return isConsumed;
                } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
                  return Promise.resolve(
                    this._bodyArrayBuffer.buffer.slice(
                      this._bodyArrayBuffer.byteOffset,
                      this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                    )
                  );
                } else {
                  return Promise.resolve(this._bodyArrayBuffer);
                }
              } else if (support.blob) {
                return this.blob().then(readBlobAsArrayBuffer);
              } else {
                throw new Error("could not read as ArrayBuffer");
              }
            };
            this.text = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as text");
              } else {
                return Promise.resolve(this._bodyText);
              }
            };
            if (support.formData) {
              this.formData = function() {
                return this.text().then(decode);
              };
            }
            this.json = function() {
              return this.text().then(JSON.parse);
            };
            return this;
          }
          var methods = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
          function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
          }
          function Request(input, options) {
            if (!(this instanceof Request)) {
              throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
            }
            options = options || {};
            var body = options.body;
            if (input instanceof Request) {
              if (input.bodyUsed) {
                throw new TypeError("Already read");
              }
              this.url = input.url;
              this.credentials = input.credentials;
              if (!options.headers) {
                this.headers = new Headers2(input.headers);
              }
              this.method = input.method;
              this.mode = input.mode;
              this.signal = input.signal;
              if (!body && input._bodyInit != null) {
                body = input._bodyInit;
                input.bodyUsed = true;
              }
            } else {
              this.url = String(input);
            }
            this.credentials = options.credentials || this.credentials || "same-origin";
            if (options.headers || !this.headers) {
              this.headers = new Headers2(options.headers);
            }
            this.method = normalizeMethod(options.method || this.method || "GET");
            this.mode = options.mode || this.mode || null;
            this.signal = options.signal || this.signal || function() {
              if ("AbortController" in g) {
                var ctrl = new AbortController();
                return ctrl.signal;
              }
            }();
            this.referrer = null;
            if ((this.method === "GET" || this.method === "HEAD") && body) {
              throw new TypeError("Body not allowed for GET or HEAD requests");
            }
            this._initBody(body);
            if (this.method === "GET" || this.method === "HEAD") {
              if (options.cache === "no-store" || options.cache === "no-cache") {
                var reParamSearch = /([?&])_=[^&]*/;
                if (reParamSearch.test(this.url)) {
                  this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
                } else {
                  var reQueryString = /\?/;
                  this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
                }
              }
            }
          }
          Request.prototype.clone = function() {
            return new Request(this, { body: this._bodyInit });
          };
          function decode(body) {
            var form = new FormData();
            body.trim().split("&").forEach(function(bytes) {
              if (bytes) {
                var split = bytes.split("=");
                var name = split.shift().replace(/\+/g, " ");
                var value = split.join("=").replace(/\+/g, " ");
                form.append(decodeURIComponent(name), decodeURIComponent(value));
              }
            });
            return form;
          }
          function parseHeaders(rawHeaders) {
            var headers = new Headers2();
            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
            preProcessedHeaders.split("\r").map(function(header) {
              return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
            }).forEach(function(line) {
              var parts = line.split(":");
              var key = parts.shift().trim();
              if (key) {
                var value = parts.join(":").trim();
                try {
                  headers.append(key, value);
                } catch (error) {
                  console.warn("Response " + error.message);
                }
              }
            });
            return headers;
          }
          Body.call(Request.prototype);
          function Response2(bodyInit, options) {
            if (!(this instanceof Response2)) {
              throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
            }
            if (!options) {
              options = {};
            }
            this.type = "default";
            this.status = options.status === void 0 ? 200 : options.status;
            if (this.status < 200 || this.status > 599) {
              throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
            }
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
            this.headers = new Headers2(options.headers);
            this.url = options.url || "";
            this._initBody(bodyInit);
          }
          Body.call(Response2.prototype);
          Response2.prototype.clone = function() {
            return new Response2(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new Headers2(this.headers),
              url: this.url
            });
          };
          Response2.error = function() {
            var response = new Response2(null, { status: 200, statusText: "" });
            response.ok = false;
            response.status = 0;
            response.type = "error";
            return response;
          };
          var redirectStatuses = [301, 302, 303, 307, 308];
          Response2.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) {
              throw new RangeError("Invalid status code");
            }
            return new Response2(null, { status, headers: { location: url } });
          };
          exports2.DOMException = g.DOMException;
          try {
            new exports2.DOMException();
          } catch (err) {
            exports2.DOMException = function(message, name) {
              this.message = message;
              this.name = name;
              var error = Error(message);
              this.stack = error.stack;
            };
            exports2.DOMException.prototype = Object.create(Error.prototype);
            exports2.DOMException.prototype.constructor = exports2.DOMException;
          }
          function fetch2(input, init) {
            return new Promise(function(resolve, reject) {
              var request = new Request(input, init);
              if (request.signal && request.signal.aborted) {
                return reject(new exports2.DOMException("Aborted", "AbortError"));
              }
              var xhr = new XMLHttpRequest();
              function abortXhr() {
                xhr.abort();
              }
              xhr.onload = function() {
                var options = {
                  statusText: xhr.statusText,
                  headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                };
                if (request.url.indexOf("file://") === 0 && (xhr.status < 200 || xhr.status > 599)) {
                  options.status = 200;
                } else {
                  options.status = xhr.status;
                }
                options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
                var body = "response" in xhr ? xhr.response : xhr.responseText;
                setTimeout(function() {
                  resolve(new Response2(body, options));
                }, 0);
              };
              xhr.onerror = function() {
                setTimeout(function() {
                  reject(new TypeError("Network request failed"));
                }, 0);
              };
              xhr.ontimeout = function() {
                setTimeout(function() {
                  reject(new TypeError("Network request timed out"));
                }, 0);
              };
              xhr.onabort = function() {
                setTimeout(function() {
                  reject(new exports2.DOMException("Aborted", "AbortError"));
                }, 0);
              };
              function fixUrl(url) {
                try {
                  return url === "" && g.location.href ? g.location.href : url;
                } catch (e) {
                  return url;
                }
              }
              xhr.open(request.method, fixUrl(request.url), true);
              if (request.credentials === "include") {
                xhr.withCredentials = true;
              } else if (request.credentials === "omit") {
                xhr.withCredentials = false;
              }
              if ("responseType" in xhr) {
                if (support.blob) {
                  xhr.responseType = "blob";
                } else if (support.arrayBuffer) {
                  xhr.responseType = "arraybuffer";
                }
              }
              if (init && typeof init.headers === "object" && !(init.headers instanceof Headers2 || g.Headers && init.headers instanceof g.Headers)) {
                var names = [];
                Object.getOwnPropertyNames(init.headers).forEach(function(name) {
                  names.push(normalizeName(name));
                  xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
                });
                request.headers.forEach(function(value, name) {
                  if (names.indexOf(name) === -1) {
                    xhr.setRequestHeader(name, value);
                  }
                });
              } else {
                request.headers.forEach(function(value, name) {
                  xhr.setRequestHeader(name, value);
                });
              }
              if (request.signal) {
                request.signal.addEventListener("abort", abortXhr);
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    request.signal.removeEventListener("abort", abortXhr);
                  }
                };
              }
              xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
            });
          }
          fetch2.polyfill = true;
          if (!g.fetch) {
            g.fetch = fetch2;
            g.Headers = Headers2;
            g.Request = Request;
            g.Response = Response2;
          }
          exports2.Headers = Headers2;
          exports2.Request = Request;
          exports2.Response = Response2;
          exports2.fetch = fetch2;
          Object.defineProperty(exports2, "__esModule", { value: true });
          return exports2;
        }({});
      })(__globalThis__);
      __globalThis__.fetch.ponyfill = true;
      delete __globalThis__.fetch.polyfill;
      var ctx = __global__.fetch ? __global__ : __globalThis__;
      exports = ctx.fetch;
      exports.default = ctx.fetch;
      exports.fetch = ctx.fetch;
      exports.Headers = ctx.Headers;
      exports.Request = ctx.Request;
      exports.Response = ctx.Response;
      module.exports = exports;
    }
  });

  // node_modules/deepmerge/dist/cjs.js
  var require_cjs = __commonJS({
    "node_modules/deepmerge/dist/cjs.js"(exports, module) {
      "use strict";
      var isMergeableObject = function isMergeableObject2(value) {
        return isNonNullObject(value) && !isSpecial(value);
      };
      function isNonNullObject(value) {
        return !!value && typeof value === "object";
      }
      function isSpecial(value) {
        var stringValue = Object.prototype.toString.call(value);
        return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
      }
      var canUseSymbol = typeof Symbol === "function" && Symbol.for;
      var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
      function isReactElement(value) {
        return value.$$typeof === REACT_ELEMENT_TYPE;
      }
      function emptyTarget(val) {
        return Array.isArray(val) ? [] : {};
      }
      function cloneUnlessOtherwiseSpecified(value, options) {
        return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
      }
      function defaultArrayMerge(target, source, options) {
        return target.concat(source).map(function(element) {
          return cloneUnlessOtherwiseSpecified(element, options);
        });
      }
      function getMergeFunction(key, options) {
        if (!options.customMerge) {
          return deepmerge;
        }
        var customMerge = options.customMerge(key);
        return typeof customMerge === "function" ? customMerge : deepmerge;
      }
      function getEnumerableOwnPropertySymbols(target) {
        return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
          return Object.propertyIsEnumerable.call(target, symbol);
        }) : [];
      }
      function getKeys(target) {
        return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
      }
      function propertyIsOnObject(object, property) {
        try {
          return property in object;
        } catch (_) {
          return false;
        }
      }
      function propertyIsUnsafe(target, key) {
        return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
      }
      function mergeObject(target, source, options) {
        var destination = {};
        if (options.isMergeableObject(target)) {
          getKeys(target).forEach(function(key) {
            destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
          });
        }
        getKeys(source).forEach(function(key) {
          if (propertyIsUnsafe(target, key)) {
            return;
          }
          if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
            destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
          } else {
            destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
          }
        });
        return destination;
      }
      function deepmerge(target, source, options) {
        options = options || {};
        options.arrayMerge = options.arrayMerge || defaultArrayMerge;
        options.isMergeableObject = options.isMergeableObject || isMergeableObject;
        options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
        var sourceIsArray = Array.isArray(source);
        var targetIsArray = Array.isArray(target);
        var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
        if (!sourceAndTargetTypesMatch) {
          return cloneUnlessOtherwiseSpecified(source, options);
        } else if (sourceIsArray) {
          return options.arrayMerge(target, source, options);
        } else {
          return mergeObject(target, source, options);
        }
      }
      deepmerge.all = function deepmergeAll(array, options) {
        if (!Array.isArray(array)) {
          throw new Error("first argument should be an array");
        }
        return array.reduce(function(prev, next) {
          return deepmerge(prev, next, options);
        }, {});
      };
      var deepmerge_1 = deepmerge;
      module.exports = deepmerge_1;
    }
  });

  // node_modules/ws/browser.js
  var require_browser = __commonJS({
    "node_modules/ws/browser.js"(exports, module) {
      "use strict";
      module.exports = function() {
        throw new Error(
          "ws does not work in the browser. Browser clients must use the native WebSocket object"
        );
      };
    }
  });

  // node_modules/@deepgram/sdk/dist/module/lib/errors.js
  var DeepgramError = class extends Error {
    constructor(message) {
      super(message);
      this.__dgError = true;
      this.name = "DeepgramError";
    }
  };
  function isDeepgramError(error) {
    return typeof error === "object" && error !== null && "__dgError" in error;
  }
  var DeepgramApiError = class extends DeepgramError {
    constructor(message, status) {
      super(message);
      this.name = "DeepgramApiError";
      this.status = status;
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status
      };
    }
  };
  var DeepgramUnknownError = class extends DeepgramError {
    constructor(message, originalError) {
      super(message);
      this.name = "DeepgramUnknownError";
      this.originalError = originalError;
    }
  };
  var DeepgramVersionError = class extends DeepgramError {
    constructor() {
      super(`You are attempting to use an old format for a newer SDK version. Read more here: https://dpgr.am/js-v3`);
      this.name = "DeepgramVersionError";
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/AbstractClient.js
  var import_events = __toESM(require_events());

  // node_modules/@deepgram/sdk/dist/module/lib/helpers.js
  var import_cross_fetch = __toESM(require_browser_ponyfill());
  var import_deepmerge = __toESM(require_cjs());
  function applyDefaults(options = {}, subordinate = {}) {
    return (0, import_deepmerge.default)(subordinate, options);
  }
  function appendSearchParams(searchParams, options) {
    Object.keys(options).forEach((i) => {
      if (Array.isArray(options[i])) {
        const arrayParams = options[i];
        arrayParams.forEach((param) => {
          searchParams.append(i, String(param));
        });
      } else {
        searchParams.append(i, String(options[i]));
      }
    });
  }
  var resolveHeadersConstructor = () => {
    if (typeof Headers === "undefined") {
      return import_cross_fetch.Headers;
    }
    return Headers;
  };
  var isUrlSource = (providedSource) => {
    if (providedSource.url)
      return true;
    return false;
  };
  var isTextSource = (providedSource) => {
    if (providedSource.text)
      return true;
    return false;
  };
  var isFileSource = (providedSource) => {
    if (isReadStreamSource(providedSource) || isBufferSource(providedSource))
      return true;
    return false;
  };
  var isBufferSource = (providedSource) => {
    if (providedSource)
      return true;
    return false;
  };
  var isReadStreamSource = (providedSource) => {
    if (providedSource)
      return true;
    return false;
  };
  var convertProtocolToWs = (url) => {
    const convert = (string) => string.toLowerCase().replace(/^http/, "ws");
    return convert(url);
  };
  var convertLegacyOptions = (optionsArg) => {
    var _a, _b, _c, _d, _e, _f;
    const newOptions = {};
    if (optionsArg._experimentalCustomFetch) {
      newOptions.global = {
        fetch: {
          client: optionsArg._experimentalCustomFetch
        }
      };
    }
    optionsArg = (0, import_deepmerge.default)(optionsArg, newOptions);
    if ((_a = optionsArg.restProxy) === null || _a === void 0 ? void 0 : _a.url) {
      newOptions.global = {
        fetch: {
          options: {
            proxy: {
              url: (_b = optionsArg.restProxy) === null || _b === void 0 ? void 0 : _b.url
            }
          }
        }
      };
    }
    optionsArg = (0, import_deepmerge.default)(optionsArg, newOptions);
    if ((_c = optionsArg.global) === null || _c === void 0 ? void 0 : _c.url) {
      newOptions.global = {
        fetch: {
          options: {
            url: optionsArg.global.url
          }
        },
        websocket: {
          options: {
            url: optionsArg.global.url
          }
        }
      };
    }
    optionsArg = (0, import_deepmerge.default)(optionsArg, newOptions);
    if ((_d = optionsArg.global) === null || _d === void 0 ? void 0 : _d.headers) {
      newOptions.global = {
        fetch: {
          options: {
            headers: (_e = optionsArg.global) === null || _e === void 0 ? void 0 : _e.headers
          }
        },
        websocket: {
          options: {
            _nodeOnlyHeaders: (_f = optionsArg.global) === null || _f === void 0 ? void 0 : _f.headers
          }
        }
      };
    }
    optionsArg = (0, import_deepmerge.default)(optionsArg, newOptions);
    return optionsArg;
  };

  // node_modules/@deepgram/sdk/dist/module/lib/runtime.js
  var NODE_VERSION = typeof process !== "undefined" && process.versions && process.versions.node ? process.versions.node : "unknown";
  var BUN_VERSION = typeof process !== "undefined" && process.versions && process.versions.bun ? process.versions.bun : "unknown";
  var BROWSER_AGENT = typeof window !== "undefined" && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : "unknown";
  var isBrowser = () => BROWSER_AGENT !== "unknown";
  var isNode = () => NODE_VERSION !== "unknown";
  var isBun = () => BUN_VERSION !== "unknown";

  // node_modules/@deepgram/sdk/dist/module/lib/version.js
  var version = "3.13.0";

  // node_modules/@deepgram/sdk/dist/module/lib/constants.js
  var getAgent = () => {
    if (isNode()) {
      return `node/${NODE_VERSION}`;
    } else if (isBun()) {
      return `bun/${BUN_VERSION}`;
    } else if (isBrowser()) {
      return `javascript ${BROWSER_AGENT}`;
    } else {
      return `unknown`;
    }
  };
  var DEFAULT_HEADERS = {
    "Content-Type": `application/json`,
    "X-Client-Info": `@deepgram/sdk; ${isBrowser() ? "browser" : "server"}; v${version}`,
    "User-Agent": `@deepgram/sdk/${version} ${getAgent()}`
  };
  var DEFAULT_URL = "https://api.deepgram.com";
  var DEFAULT_AGENT_URL = "wss://agent.deepgram.com";
  var DEFAULT_GLOBAL_OPTIONS = {
    fetch: { options: { url: DEFAULT_URL, headers: DEFAULT_HEADERS } },
    websocket: {
      options: { url: convertProtocolToWs(DEFAULT_URL), _nodeOnlyHeaders: DEFAULT_HEADERS }
    }
  };
  var DEFAULT_AGENT_OPTIONS = {
    fetch: { options: { url: DEFAULT_URL, headers: DEFAULT_HEADERS } },
    websocket: {
      options: { url: DEFAULT_AGENT_URL, _nodeOnlyHeaders: DEFAULT_HEADERS }
    }
  };
  var DEFAULT_OPTIONS = {
    global: DEFAULT_GLOBAL_OPTIONS,
    agent: DEFAULT_AGENT_OPTIONS
  };
  var SOCKET_STATES;
  (function(SOCKET_STATES2) {
    SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
    SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
    SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
    SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
  })(SOCKET_STATES || (SOCKET_STATES = {}));
  var CONNECTION_STATE;
  (function(CONNECTION_STATE2) {
    CONNECTION_STATE2["Connecting"] = "connecting";
    CONNECTION_STATE2["Open"] = "open";
    CONNECTION_STATE2["Closing"] = "closing";
    CONNECTION_STATE2["Closed"] = "closed";
  })(CONNECTION_STATE || (CONNECTION_STATE = {}));

  // node_modules/@deepgram/sdk/dist/module/packages/AbstractClient.js
  var noop = () => {
  };
  var AbstractClient = class extends import_events.EventEmitter {
    /**
     * Constructs a new instance of the DeepgramClient class with the provided options.
     *
     * @param options - The options to configure the DeepgramClient instance.
     * @param options.key - The Deepgram API key to use for authentication. If not provided, the `DEEPGRAM_API_KEY` environment variable will be used.
     * @param options.global - Global options that apply to all requests made by the DeepgramClient instance.
     * @param options.global.fetch - Options to configure the fetch requests made by the DeepgramClient instance.
     * @param options.global.fetch.options - Additional options to pass to the fetch function, such as `url` and `headers`.
     * @param options.namespace - Options specific to a particular namespace within the DeepgramClient instance.
     */
    constructor(options) {
      super();
      this.factory = void 0;
      this.namespace = "global";
      this.version = "v1";
      this.baseUrl = DEFAULT_URL;
      this.logger = noop;
      let key;
      if (typeof options.key === "function") {
        this.factory = options.key;
        key = this.factory();
      } else {
        key = options.key;
      }
      if (!key) {
        key = process.env.DEEPGRAM_API_KEY;
      }
      if (!key) {
        throw new DeepgramError("A deepgram API key is required.");
      }
      this.key = key;
      options = convertLegacyOptions(options);
      this.options = applyDefaults(options, DEFAULT_OPTIONS);
    }
    /**
     * Sets the version for the current instance of the Deepgram API and returns the instance.
     *
     * @param version - The version to set for the Deepgram API instance. Defaults to "v1" if not provided.
     * @returns The current instance of the AbstractClient with the updated version.
     */
    v(version2 = "v1") {
      this.version = version2;
      return this;
    }
    /**
     * Gets the namespace options for the current instance of the AbstractClient.
     * The namespace options include the default options merged with the global options,
     * and the API key for the current instance.
     *
     * @returns The namespace options for the current instance.
     */
    get namespaceOptions() {
      const defaults = applyDefaults(this.options[this.namespace], this.options.global);
      return Object.assign(Object.assign({}, defaults), { key: this.key });
    }
    /**
     * Generates a URL for an API endpoint with optional query parameters and transcription options.
     *
     * @param endpoint - The API endpoint URL, which may contain placeholders for fields.
     * @param fields - An optional object containing key-value pairs to replace placeholders in the endpoint URL.
     * @param transcriptionOptions - Optional transcription options to include as query parameters in the URL.
     * @returns A URL object representing the constructed API request URL.
     */
    getRequestUrl(endpoint, fields = { version: this.version }, transcriptionOptions) {
      fields.version = this.version;
      endpoint = endpoint.replace(/:(\w+)/g, function(_, key) {
        return fields[key];
      });
      const url = new URL(endpoint, this.baseUrl);
      if (transcriptionOptions) {
        appendSearchParams(url.searchParams, transcriptionOptions);
      }
      return url;
    }
    /**
     * Logs the message.
     *
     * For customized logging, `this.logger` can be overridden.
     */
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/AbstractLiveClient.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var NATIVE_WEBSOCKET_AVAILABLE = typeof WebSocket !== "undefined";
  var AbstractLiveClient = class extends AbstractClient {
    constructor(options) {
      super(options);
      this.conn = null;
      this.sendBuffer = [];
      this.reconnect = noop;
      const { key, websocket: { options: websocketOptions, client } } = this.namespaceOptions;
      if (this.proxy) {
        this.baseUrl = websocketOptions.proxy.url;
      } else {
        this.baseUrl = websocketOptions.url;
      }
      if (client) {
        this.transport = client;
      } else {
        this.transport = null;
      }
      if (websocketOptions._nodeOnlyHeaders) {
        this.headers = websocketOptions._nodeOnlyHeaders;
      } else {
        this.headers = {};
      }
      if (!("Authorization" in this.headers)) {
        this.headers["Authorization"] = `Token ${key}`;
      }
    }
    /**
     * Connects the socket, unless already connected.
     *
     * @protected Can only be called from within the class.
     */
    connect(transcriptionOptions, endpoint) {
      if (this.conn) {
        return;
      }
      this.reconnect = (options = transcriptionOptions) => {
        this.connect(options, endpoint);
      };
      const requestUrl = this.getRequestUrl(endpoint, {}, transcriptionOptions);
      if (this.transport) {
        this.conn = new this.transport(requestUrl, void 0, {
          headers: this.headers
        });
        return;
      }
      if (isBun()) {
        Promise.resolve().then(() => __toESM(require_browser())).then(({ default: WS }) => {
          this.conn = new WS(requestUrl, {
            headers: this.headers
          });
          console.log(`Using WS package`);
          this.setupConnection();
        });
        return;
      }
      if (NATIVE_WEBSOCKET_AVAILABLE) {
        this.conn = new WebSocket(requestUrl, ["token", this.namespaceOptions.key]);
        this.setupConnection();
        return;
      }
      this.conn = new WSWebSocketDummy(requestUrl, void 0, {
        close: () => {
          this.conn = null;
        }
      });
      Promise.resolve().then(() => __toESM(require_browser())).then(({ default: WS }) => {
        this.conn = new WS(requestUrl, void 0, {
          headers: this.headers
        });
        this.setupConnection();
      });
    }
    /**
     * Disconnects the socket from the client.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     */
    disconnect(code, reason) {
      if (this.conn) {
        this.conn.onclose = function() {
        };
        if (code) {
          this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
        } else {
          this.conn.close();
        }
        this.conn = null;
      }
    }
    /**
     * Returns the current connection state of the WebSocket connection.
     *
     * @returns The current connection state of the WebSocket connection.
     */
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return CONNECTION_STATE.Connecting;
        case SOCKET_STATES.open:
          return CONNECTION_STATE.Open;
        case SOCKET_STATES.closing:
          return CONNECTION_STATE.Closing;
        default:
          return CONNECTION_STATE.Closed;
      }
    }
    /**
     * Returns the current ready state of the WebSocket connection.
     *
     * @returns The current ready state of the WebSocket connection.
     */
    getReadyState() {
      var _a, _b;
      return (_b = (_a = this.conn) === null || _a === void 0 ? void 0 : _a.readyState) !== null && _b !== void 0 ? _b : SOCKET_STATES.closed;
    }
    /**
     * Returns `true` is the connection is open.
     */
    isConnected() {
      return this.connectionState() === CONNECTION_STATE.Open;
    }
    /**
     * Sends data to the Deepgram API via websocket connection
     * @param data Audio data to send to Deepgram
     *
     * Conforms to RFC #146 for Node.js - does not send an empty byte.
     * @see https://github.com/deepgram/deepgram-python-sdk/issues/146
     */
    send(data) {
      const callback = () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (data instanceof Blob) {
          if (data.size === 0) {
            this.log("warn", "skipping `send` for zero-byte blob", data);
            return;
          }
          data = yield data.arrayBuffer();
        }
        if (typeof data !== "string") {
          if (!(data === null || data === void 0 ? void 0 : data.byteLength)) {
            this.log("warn", "skipping `send` for zero-byte payload", data);
            return;
          }
        }
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(data);
      });
      if (this.isConnected()) {
        callback();
      } else {
        this.sendBuffer.push(callback);
      }
    }
    /**
     * Determines whether the current instance should proxy requests.
     * @returns {boolean} true if the current instance should proxy requests; otherwise, false
     */
    get proxy() {
      var _a;
      return this.key === "proxy" && !!((_a = this.namespaceOptions.websocket.options.proxy) === null || _a === void 0 ? void 0 : _a.url);
    }
  };
  var WSWebSocketDummy = class {
    constructor(address, _protocols, options) {
      this.binaryType = "arraybuffer";
      this.onclose = () => {
      };
      this.onerror = () => {
      };
      this.onmessage = () => {
      };
      this.onopen = () => {
      };
      this.readyState = SOCKET_STATES.connecting;
      this.send = () => {
      };
      this.url = null;
      this.url = address.toString();
      this.close = options.close;
    }
  };

  // node_modules/@deepgram/sdk/dist/module/lib/fetch.js
  var import_cross_fetch2 = __toESM(require_browser_ponyfill());
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
      _fetch = customFetch;
    } else if (typeof fetch === "undefined") {
      _fetch = import_cross_fetch2.default;
    } else {
      _fetch = fetch;
    }
    return (...args) => _fetch(...args);
  };
  var fetchWithAuth = (apiKey, customFetch) => {
    const fetch2 = resolveFetch(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    return (input, init) => __awaiter2(void 0, void 0, void 0, function* () {
      const headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Token ${apiKey}`);
      }
      return fetch2(input, Object.assign(Object.assign({}, init), { headers }));
    });
  };
  var resolveResponse = () => __awaiter2(void 0, void 0, void 0, function* () {
    if (typeof Response === "undefined") {
      return (yield Promise.resolve().then(() => __toESM(require_browser_ponyfill()))).Response;
    }
    return Response;
  });

  // node_modules/@deepgram/sdk/dist/module/packages/AbstractRestClient.js
  var import_deepmerge2 = __toESM(require_cjs());
  var __awaiter3 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var AbstractRestClient = class extends AbstractClient {
    /**
     * Constructs a new instance of the `AbstractRestClient` class with the provided options.
     *
     * @param options - The client options to use for this instance.
     * @throws {DeepgramError} If the client is being used in a browser and no proxy is provided.
     */
    constructor(options) {
      super(options);
      if (isBrowser() && !this.proxy) {
        throw new DeepgramError("Due to CORS we are unable to support REST-based API calls to our API from the browser. Please consider using a proxy: https://dpgr.am/js-proxy for more information.");
      }
      this.fetch = fetchWithAuth(this.key, this.namespaceOptions.fetch.client);
      if (this.proxy) {
        this.baseUrl = this.namespaceOptions.fetch.options.proxy.url;
      } else {
        this.baseUrl = this.namespaceOptions.fetch.options.url;
      }
    }
    /**
     * Constructs an error message from the provided error object.
     *
     * @param err - The error object to extract the error message from.
     * @returns The constructed error message.
     */
    _getErrorMessage(err) {
      return err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
    }
    /**
     * Handles an error that occurred during a request.
     *
     * @param error - The error that occurred during the request.
     * @param reject - The rejection function to call with the error.
     * @returns A Promise that resolves when the error has been handled.
     */
    _handleError(error, reject) {
      return __awaiter3(this, void 0, void 0, function* () {
        const Res = yield resolveResponse();
        if (error instanceof Res) {
          error.json().then((err) => {
            reject(new DeepgramApiError(this._getErrorMessage(err), error.status || 500));
          }).catch((err) => {
            reject(new DeepgramUnknownError(this._getErrorMessage(err), err));
          });
        } else {
          reject(new DeepgramUnknownError(this._getErrorMessage(error), error));
        }
      });
    }
    /**
     * Constructs the options object to be used for a fetch request.
     *
     * @param method - The HTTP method to use for the request, such as "GET", "POST", "PUT", "PATCH", or "DELETE".
     * @param bodyOrOptions - For "POST", "PUT", and "PATCH" requests, the request body as a string, Buffer, or Readable stream. For "GET" and "DELETE" requests, the fetch options to use.
     * @param options - Additional fetch options to use for the request.
     * @returns The constructed fetch options object.
     */
    _getRequestOptions(method, bodyOrOptions, options) {
      let reqOptions = { method };
      if (method === "GET" || method === "DELETE") {
        reqOptions = Object.assign(Object.assign({}, reqOptions), bodyOrOptions);
      } else {
        reqOptions = Object.assign(Object.assign({ duplex: "half", body: bodyOrOptions }, reqOptions), options);
      }
      return (0, import_deepmerge2.default)(this.namespaceOptions.fetch.options, reqOptions, { clone: false });
    }
    _handleRequest(method, url, bodyOrOptions, options) {
      return __awaiter3(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
          const fetcher = this.fetch;
          fetcher(url, this._getRequestOptions(method, bodyOrOptions, options)).then((result) => {
            if (!result.ok)
              throw result;
            resolve(result);
          }).catch((error) => this._handleError(error, reject));
        });
      });
    }
    /**
     * Handles an HTTP GET request using the provided URL and optional request options.
     *
     * @param url - The URL to send the GET request to.
     * @param options - Additional fetch options to use for the GET request.
     * @returns A Promise that resolves to the Response object for the GET request.
     */
    get(url, options) {
      return __awaiter3(this, void 0, void 0, function* () {
        return this._handleRequest("GET", url, options);
      });
    }
    /**
     * Handles an HTTP POST request using the provided URL, request body, and optional request options.
     *
     * @param url - The URL to send the POST request to.
     * @param body - The request body as a string, Buffer, or Readable stream.
     * @param options - Additional fetch options to use for the POST request.
     * @returns A Promise that resolves to the Response object for the POST request.
     */
    post(url, body, options) {
      return __awaiter3(this, void 0, void 0, function* () {
        return this._handleRequest("POST", url, body, options);
      });
    }
    /**
     * Handles an HTTP PUT request using the provided URL, request body, and optional request options.
     *
     * @param url - The URL to send the PUT request to.
     * @param body - The request body as a string, Buffer, or Readable stream.
     * @param options - Additional fetch options to use for the PUT request.
     * @returns A Promise that resolves to the Response object for the PUT request.
     */
    put(url, body, options) {
      return __awaiter3(this, void 0, void 0, function* () {
        return this._handleRequest("PUT", url, body, options);
      });
    }
    /**
     * Handles an HTTP PATCH request using the provided URL, request body, and optional request options.
     *
     * @param url - The URL to send the PATCH request to.
     * @param body - The request body as a string, Buffer, or Readable stream.
     * @param options - Additional fetch options to use for the PATCH request.
     * @returns A Promise that resolves to the Response object for the PATCH request.
     */
    patch(url, body, options) {
      return __awaiter3(this, void 0, void 0, function* () {
        return this._handleRequest("PATCH", url, body, options);
      });
    }
    /**
     * Handles an HTTP DELETE request using the provided URL and optional request options.
     *
     * @param url - The URL to send the DELETE request to.
     * @param options - Additional fetch options to use for the DELETE request.
     * @returns A Promise that resolves to the Response object for the DELETE request.
     */
    delete(url, options) {
      return __awaiter3(this, void 0, void 0, function* () {
        return this._handleRequest("DELETE", url, options);
      });
    }
    /**
     * Determines whether the current instance should proxy requests.
     * @returns {boolean} true if the current instance should proxy requests; otherwise, false
     */
    get proxy() {
      var _a;
      return this.key === "proxy" && !!((_a = this.namespaceOptions.fetch.options.proxy) === null || _a === void 0 ? void 0 : _a.url);
    }
  };

  // node_modules/@deepgram/sdk/dist/module/lib/enums/AgentEvents.js
  var AgentEvents;
  (function(AgentEvents2) {
    AgentEvents2["Open"] = "Open";
    AgentEvents2["Close"] = "Close";
    AgentEvents2["Error"] = "Error";
    AgentEvents2["Audio"] = "Audio";
    AgentEvents2["Welcome"] = "Welcome";
    AgentEvents2["SettingsApplied"] = "SettingsApplied";
    AgentEvents2["ConversationText"] = "ConversationText";
    AgentEvents2["UserStartedSpeaking"] = "UserStartedSpeaking";
    AgentEvents2["AgentThinking"] = "AgentThinking";
    AgentEvents2["FunctionCallRequest"] = "FunctionCallRequest";
    AgentEvents2["AgentStartedSpeaking"] = "AgentStartedSpeaking";
    AgentEvents2["AgentAudioDone"] = "AgentAudioDone";
    AgentEvents2["InjectionRefused"] = "InjectionRefused";
    AgentEvents2["PromptUpdated"] = "PromptUpdated";
    AgentEvents2["SpeakUpdated"] = "SpeakUpdated";
    AgentEvents2["Unhandled"] = "Unhandled";
  })(AgentEvents || (AgentEvents = {}));

  // node_modules/@deepgram/sdk/dist/module/packages/AgentLiveClient.js
  var AgentLiveClient = class extends AbstractLiveClient {
    constructor(options, endpoint = "/:version/agent/converse") {
      var _a, _b, _c, _d;
      super(options);
      this.namespace = "agent";
      this.baseUrl = (_d = (_c = (_b = (_a = options.agent) === null || _a === void 0 ? void 0 : _a.websocket) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.url) !== null && _d !== void 0 ? _d : DEFAULT_AGENT_URL;
      this.connect({}, endpoint);
    }
    /**
     * Sets up the connection event handlers.
     * This method is responsible for handling the various events that can occur on the WebSocket connection, such as opening, closing, and receiving messages.
     * - When the connection is opened, it emits the `AgentEvents.Open` event.
     * - When the connection is closed, it emits the `AgentEvents.Close` event.
     * - When an error occurs on the connection, it emits the `AgentEvents.Error` event.
     * - When a message is received, it parses the message and emits the appropriate event based on the message type.
     */
    setupConnection() {
      if (this.conn) {
        this.conn.onopen = () => {
          this.emit(AgentEvents.Open, this);
        };
        this.conn.onclose = (event) => {
          this.emit(AgentEvents.Close, event);
        };
        this.conn.onerror = (event) => {
          this.emit(AgentEvents.Error, event);
        };
        this.conn.onmessage = (event) => {
          this.handleMessage(event);
        };
      }
    }
    /**
     * Handles incoming messages from the WebSocket connection.
     * @param event - The MessageEvent object representing the received message.
     */
    handleMessage(event) {
      if (typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          this.handleTextMessage(data);
        } catch (error) {
          this.emit(AgentEvents.Error, {
            event,
            data: event.data,
            message: "Unable to parse `data` as JSON.",
            error
          });
        }
      } else if (event.data instanceof Blob) {
        event.data.arrayBuffer().then((buffer) => {
          this.handleBinaryMessage(Buffer.from(buffer));
        });
      } else if (event.data instanceof ArrayBuffer) {
        this.handleBinaryMessage(Buffer.from(event.data));
      } else if (Buffer.isBuffer(event.data)) {
        this.handleBinaryMessage(event.data);
      } else {
        console.log("Received unknown data type", event.data);
        this.emit(AgentEvents.Error, {
          event,
          message: "Received unknown data type."
        });
      }
    }
    /**
     * Handles binary messages received from the WebSocket connection.
     * @param data - The binary data.
     */
    handleBinaryMessage(data) {
      this.emit(AgentEvents.Audio, data);
    }
    /**
     * Handles text messages received from the WebSocket connection.
     * @param data - The parsed JSON data.
     */
    handleTextMessage(data) {
      if (data.type in AgentEvents) {
        this.emit(data.type, data);
      } else {
        this.emit(AgentEvents.Unhandled, data);
      }
    }
    /**
     * To be called with your model configuration BEFORE sending
     * any audio data.
     * @param options - The SettingsConfiguration object.
     */
    configure(options) {
      var _a, _b, _c;
      if (!((_a = options.agent.listen) === null || _a === void 0 ? void 0 : _a.provider.model.startsWith("nova-3")) && ((_c = (_b = options.agent.listen) === null || _b === void 0 ? void 0 : _b.provider.keyterms) === null || _c === void 0 ? void 0 : _c.length)) {
        throw new DeepgramError("Keyterms are only supported with the Nova 3 models.");
      }
      const string = JSON.stringify(Object.assign({ type: "Settings" }, options));
      this.send(string);
    }
    /**
     * Provide new system prompt to the LLM.
     * @param prompt - The system prompt to provide.
     */
    updatePrompt(prompt) {
      this.send(JSON.stringify({ type: "UpdatePrompt", prompt }));
    }
    /**
     * Change the speak model.
     * @param model - The new model to use.
     */
    updateSpeak(speakConfig) {
      this.send(JSON.stringify({ type: "UpdateSpeak", speak: speakConfig }));
    }
    /**
     * Immediately trigger an agent message. If this message
     * is sent while the user is speaking, or while the server is in the
     * middle of sending audio, then the request will be ignored and an InjectionRefused
     * event will be emitted.
     * @example "Hold on while I look that up for you."
     * @example "Are you still on the line?"
     * @param content - The message to speak.
     */
    injectAgentMessage(content) {
      this.send(JSON.stringify({ type: "InjectAgentMessage", content }));
    }
    /**
     * Respond to a function call request.
     * @param response  - The response to the function call request.
     */
    functionCallResponse(response) {
      this.send(JSON.stringify(Object.assign({ type: "FunctionCallResponse" }, response)));
    }
    /**
     * Send a keepalive to avoid closing the websocket while you
     * are not transmitting audio. This should be sent at least
     * every 8 seconds.
     */
    keepAlive() {
      this.send(JSON.stringify({ type: "KeepAlive" }));
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/AuthRestClient.js
  var __awaiter4 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var AuthRestClient = class extends AbstractRestClient {
    constructor() {
      super(...arguments);
      this.namespace = "auth";
    }
    /**
     * Generates a new temporary token for the Deepgram API.
     * @param endpoint Optional custom endpoint to use for the request. Defaults to ":version/auth/grant".
     * @returns Object containing the result of the request or an error if one occurred. Result will contain access_token and expires_in properties.
     */
    grantToken(endpoint = ":version/auth/grant") {
      return __awaiter4(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint);
          const result = yield this.post(requestUrl, "").then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
  };

  // node_modules/@deepgram/sdk/dist/module/lib/enums/LiveTranscriptionEvents.js
  var LiveTranscriptionEvents;
  (function(LiveTranscriptionEvents2) {
    LiveTranscriptionEvents2["Open"] = "open";
    LiveTranscriptionEvents2["Close"] = "close";
    LiveTranscriptionEvents2["Error"] = "error";
    LiveTranscriptionEvents2["Transcript"] = "Results";
    LiveTranscriptionEvents2["Metadata"] = "Metadata";
    LiveTranscriptionEvents2["UtteranceEnd"] = "UtteranceEnd";
    LiveTranscriptionEvents2["SpeechStarted"] = "SpeechStarted";
    LiveTranscriptionEvents2["Unhandled"] = "Unhandled";
  })(LiveTranscriptionEvents || (LiveTranscriptionEvents = {}));

  // node_modules/@deepgram/sdk/dist/module/lib/enums/LiveTTSEvents.js
  var LiveTTSEvents;
  (function(LiveTTSEvents2) {
    LiveTTSEvents2["Open"] = "Open";
    LiveTTSEvents2["Close"] = "Close";
    LiveTTSEvents2["Error"] = "Error";
    LiveTTSEvents2["Metadata"] = "Metadata";
    LiveTTSEvents2["Flushed"] = "Flushed";
    LiveTTSEvents2["Warning"] = "Warning";
    LiveTTSEvents2["Audio"] = "Audio";
    LiveTTSEvents2["Unhandled"] = "Unhandled";
  })(LiveTTSEvents || (LiveTTSEvents = {}));

  // node_modules/@deepgram/sdk/dist/module/packages/ListenLiveClient.js
  var ListenLiveClient = class extends AbstractLiveClient {
    /**
     * Constructs a new `ListenLiveClient` instance with the provided options.
     *
     * @param options - The `DeepgramClientOptions` to use for the client connection.
     * @param transcriptionOptions - An optional `LiveSchema` object containing additional configuration options for the live transcription.
     * @param endpoint - An optional string representing the WebSocket endpoint to connect to. Defaults to `:version/listen`.
     */
    constructor(options, transcriptionOptions = {}, endpoint = ":version/listen") {
      var _a, _b;
      super(options);
      this.namespace = "listen";
      if (((_a = transcriptionOptions.keyterm) === null || _a === void 0 ? void 0 : _a.length) && !((_b = transcriptionOptions.model) === null || _b === void 0 ? void 0 : _b.startsWith("nova-3"))) {
        throw new DeepgramError("Keyterms are only supported with the Nova 3 models.");
      }
      this.connect(transcriptionOptions, endpoint);
    }
    /**
     * Sets up the connection event handlers.
     * This method is responsible for handling the various events that can occur on the WebSocket connection, such as opening, closing, and receiving messages.
     * - When the connection is opened, it emits the `LiveTranscriptionEvents.Open` event.
     * - When the connection is closed, it emits the `LiveTranscriptionEvents.Close` event.
     * - When an error occurs on the connection, it emits the `LiveTranscriptionEvents.Error` event.
     * - When a message is received, it parses the message and emits the appropriate event based on the message type, such as `LiveTranscriptionEvents.Metadata`, `LiveTranscriptionEvents.Transcript`, `LiveTranscriptionEvents.UtteranceEnd`, and `LiveTranscriptionEvents.SpeechStarted`.
     */
    setupConnection() {
      if (this.conn) {
        this.conn.onopen = () => {
          this.emit(LiveTranscriptionEvents.Open, this);
        };
        this.conn.onclose = (event) => {
          this.emit(LiveTranscriptionEvents.Close, event);
        };
        this.conn.onerror = (event) => {
          this.emit(LiveTranscriptionEvents.Error, event);
        };
        this.conn.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data.toString());
            if (data.type === LiveTranscriptionEvents.Metadata) {
              this.emit(LiveTranscriptionEvents.Metadata, data);
            } else if (data.type === LiveTranscriptionEvents.Transcript) {
              this.emit(LiveTranscriptionEvents.Transcript, data);
            } else if (data.type === LiveTranscriptionEvents.UtteranceEnd) {
              this.emit(LiveTranscriptionEvents.UtteranceEnd, data);
            } else if (data.type === LiveTranscriptionEvents.SpeechStarted) {
              this.emit(LiveTranscriptionEvents.SpeechStarted, data);
            } else {
              this.emit(LiveTranscriptionEvents.Unhandled, data);
            }
          } catch (error) {
            this.emit(LiveTranscriptionEvents.Error, {
              event,
              message: "Unable to parse `data` as JSON.",
              error
            });
          }
        };
      }
    }
    /**
     * Sends additional config to the connected session.
     *
     * @param config - The configuration options to apply to the LiveClient.
     * @param config.numerals - We currently only support numerals.
     */
    configure(config) {
      this.send(JSON.stringify({
        type: "Configure",
        processors: config
      }));
    }
    /**
     * Sends a "KeepAlive" message to the server to maintain the connection.
     */
    keepAlive() {
      this.send(JSON.stringify({
        type: "KeepAlive"
      }));
    }
    /**
     * Sends a "Finalize" message to flush any transcription sitting in the server's buffer.
     */
    finalize() {
      this.send(JSON.stringify({
        type: "Finalize"
      }));
    }
    /**
     * @deprecated Since version 3.4. Will be removed in version 4.0. Use `requestClose` instead.
     */
    finish() {
      this.requestClose();
    }
    /**
     * Requests the server close the connection.
     */
    requestClose() {
      this.send(JSON.stringify({
        type: "CloseStream"
      }));
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/ListenRestClient.js
  var __awaiter5 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ListenRestClient = class extends AbstractRestClient {
    constructor() {
      super(...arguments);
      this.namespace = "listen";
    }
    /**
     * Transcribes audio from a URL synchronously.
     *
     * @param source - The URL source object containing the audio URL to transcribe.
     * @param options - An optional `PrerecordedSchema` object containing additional options for the transcription.
     * @param endpoint - An optional endpoint string to use for the transcription request.
     * @returns A `DeepgramResponse` object containing the transcription result or an error.
     */
    transcribeUrl(source, options, endpoint = ":version/listen") {
      var _a, _b;
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          let body;
          if (isUrlSource(source)) {
            body = JSON.stringify(source);
          } else {
            throw new DeepgramError("Unknown transcription source type");
          }
          if (options !== void 0 && "callback" in options) {
            throw new DeepgramError("Callback cannot be provided as an option to a synchronous transcription. Use `transcribeUrlCallback` or `transcribeFileCallback` instead.");
          }
          if (((_a = options === null || options === void 0 ? void 0 : options.keyterm) === null || _a === void 0 ? void 0 : _a.length) && !((_b = options.model) === null || _b === void 0 ? void 0 : _b.startsWith("nova-3"))) {
            throw new DeepgramError("Keyterms are only supported with the Nova 3 models.");
          }
          const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({}, options));
          const result = yield this.post(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Transcribes audio from a file asynchronously.
     *
     * @param source - The file source object containing the audio file to transcribe.
     * @param options - An optional `PrerecordedSchema` object containing additional options for the transcription.
     * @param endpoint - An optional endpoint string to use for the transcription request.
     * @returns A `DeepgramResponse` object containing the transcription result or an error.
     */
    transcribeFile(source, options, endpoint = ":version/listen") {
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          let body;
          if (isFileSource(source)) {
            body = source;
          } else {
            throw new DeepgramError("Unknown transcription source type");
          }
          if (options !== void 0 && "callback" in options) {
            throw new DeepgramError("Callback cannot be provided as an option to a synchronous transcription. Use `transcribeUrlCallback` or `transcribeFileCallback` instead.");
          }
          const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({}, options));
          const result = yield this.post(requestUrl, body, {
            headers: { "Content-Type": "deepgram/audio+video" }
          }).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Transcribes audio from a URL asynchronously.
     *
     * @param source - The URL source object containing the audio file to transcribe.
     * @param callback - The callback URL to receive the transcription result.
     * @param options - An optional `PrerecordedSchema` object containing additional options for the transcription.
     * @param endpoint - An optional endpoint string to use for the transcription request.
     * @returns A `DeepgramResponse` object containing the transcription result or an error.
     */
    transcribeUrlCallback(source, callback, options, endpoint = ":version/listen") {
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          let body;
          if (isUrlSource(source)) {
            body = JSON.stringify(source);
          } else {
            throw new DeepgramError("Unknown transcription source type");
          }
          const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign(Object.assign({}, options), { callback: callback.toString() }));
          const result = yield this.post(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Transcribes audio from a file asynchronously.
     *
     * @param source - The file source object containing the audio file to transcribe.
     * @param callback - The callback URL to receive the transcription result.
     * @param options - An optional `PrerecordedSchema` object containing additional options for the transcription.
     * @param endpoint - An optional endpoint string to use for the transcription request.
     * @returns A `DeepgramResponse` object containing the transcription result or an error.
     */
    transcribeFileCallback(source, callback, options, endpoint = ":version/listen") {
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          let body;
          if (isFileSource(source)) {
            body = source;
          } else {
            throw new DeepgramError("Unknown transcription source type");
          }
          const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign(Object.assign({}, options), { callback: callback.toString() }));
          const result = yield this.post(requestUrl, body, {
            headers: { "Content-Type": "deepgram/audio+video" }
          }).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/ListenClient.js
  var ListenClient = class extends AbstractClient {
    constructor() {
      super(...arguments);
      this.namespace = "listen";
    }
    /**
     * Returns a `ListenRestClient` instance for interacting with the prerecorded listen API.
     */
    get prerecorded() {
      return new ListenRestClient(this.options);
    }
    /**
     * Returns a `ListenLiveClient` instance for interacting with the live listen API, with the provided transcription options and endpoint.
     * @param {LiveSchema} [transcriptionOptions={}] - The transcription options to use for the live listen API.
     * @param {string} [endpoint=":version/listen"] - The endpoint to use for the live listen API.
     * @returns {ListenLiveClient} - A `ListenLiveClient` instance for interacting with the live listen API.
     */
    live(transcriptionOptions = {}, endpoint = ":version/listen") {
      return new ListenLiveClient(this.options, transcriptionOptions, endpoint);
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/ManageRestClient.js
  var __awaiter6 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ManageRestClient = class extends AbstractRestClient {
    constructor() {
      super(...arguments);
      this.namespace = "manage";
    }
    /**
     * Retrieves the details of the current authentication token.
     *
     * @returns A promise that resolves to an object containing the token details, or an error object if an error occurs.
     * @see https://developers.deepgram.com/docs/authenticating#test-request
     */
    getTokenDetails(endpoint = ":version/auth/token") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint);
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves a list of all projects associated with the authenticated user.
     *
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects".
     * @returns A promise that resolves to an object containing the list of projects, or an error object if an error occurs.
     * @see https://developers.deepgram.com/reference/get-projects
     */
    getProjects(endpoint = ":version/projects") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint);
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the details of a specific project associated with the authenticated user.
     *
     * @param projectId - The ID of the project to retrieve.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId".
     * @returns A promise that resolves to an object containing the project details, or an error object if an error occurs.
     * @see https://developers.deepgram.com/reference/get-project
     */
    getProject(projectId, endpoint = ":version/projects/:projectId") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Updates an existing project associated with the authenticated user.
     *
     * @param projectId - The ID of the project to update.
     * @param options - An object containing the updated project details.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId".
     * @returns A promise that resolves to an object containing the response message, or an error object if an error occurs.
     * @see https://developers.deepgram.com/reference/update-project
     */
    updateProject(projectId, options, endpoint = ":version/projects/:projectId") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
          const body = JSON.stringify(options);
          const result = yield this.patch(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Deletes an existing project associated with the authenticated user.
     *
     * @param projectId - The ID of the project to delete.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId".
     * @returns A promise that resolves to an object containing the response message, or an error object if an error occurs.
     * @see https://developers.deepgram.com/reference/delete-project
     */
    deleteProject(projectId, endpoint = ":version/projects/:projectId") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId });
          yield this.delete(requestUrl);
          return { error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves a list of project keys associated with the specified project.
     *
     * @param projectId - The ID of the project to retrieve the keys for.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/keys".
     * @returns A promise that resolves to an object containing the list of project keys, or an error object if an error occurs.
     * @see https://developers.deepgram.com/reference/list-keys
     */
    getProjectKeys(projectId, endpoint = ":version/projects/:projectId/keys") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves a specific project key associated with the specified project.
     *
     * @param projectId - The ID of the project to retrieve the key for.
     * @param keyId - The ID of the project key to retrieve.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/keys/:keyId".
     * @returns A promise that resolves to an object containing the project key, or an error object if an error occurs.
     * @see https://developers.deepgram.com/reference/get-key
     */
    getProjectKey(projectId, keyId, endpoint = ":version/projects/:projectId/keys/:keyId") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, keyId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Creates a new project key for the specified project.
     *
     * @param projectId - The ID of the project to create the key for.
     * @param options - An object containing the options for creating the project key.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/keys".
     * @returns A promise that resolves to an object containing the created project key, or an error object if an error occurs.
     * @see https://developers.deepgram.com/reference/create-key
     */
    createProjectKey(projectId, options, endpoint = ":version/projects/:projectId/keys") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
          const body = JSON.stringify(options);
          const result = yield this.post(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Deletes the specified project key.
     *
     * @param projectId - The ID of the project the key belongs to.
     * @param keyId - The ID of the key to delete.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/keys/:keyId".
     * @returns A promise that resolves to an object containing a null result and an error object if an error occurs.
     * @see https://developers.deepgram.com/reference/delete-key
     */
    deleteProjectKey(projectId, keyId, endpoint = ":version/projects/:projectId/keys/:keyId") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, keyId });
          yield this.delete(requestUrl);
          return { error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the members of the specified project.
     *
     * @param projectId - The ID of the project to retrieve members for.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/members".
     * @returns A promise that resolves to an object containing the project members and an error object if an error occurs.
     * @see https://developers.deepgram.com/reference/get-members
     */
    getProjectMembers(projectId, endpoint = ":version/projects/:projectId/members") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Removes a member from the specified project.
     *
     * @param projectId - The ID of the project to remove the member from.
     * @param memberId - The ID of the member to remove.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/members/:memberId".
     * @returns A promise that resolves to an object containing a null error if the operation was successful, or an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/remove-member
     */
    removeProjectMember(projectId, memberId, endpoint = ":version/projects/:projectId/members/:memberId") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, memberId });
          yield this.delete(requestUrl);
          return { error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the scopes for the specified project member.
     *
     * @param projectId - The ID of the project to retrieve the member scopes for.
     * @param memberId - The ID of the member to retrieve the scopes for.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/members/:memberId/scopes".
     * @returns A promise that resolves to an object containing the retrieved scopes or an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/get-member-scopes
     */
    getProjectMemberScopes(projectId, memberId, endpoint = ":version/projects/:projectId/members/:memberId/scopes") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, memberId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Updates the scopes for the specified project member.
     *
     * @param projectId - The ID of the project to update the member scopes for.
     * @param memberId - The ID of the member to update the scopes for.
     * @param options - An object containing the new scopes to apply to the member.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/members/:memberId/scopes".
     * @returns A promise that resolves to an object containing the result of the update operation or an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/update-scope
     */
    updateProjectMemberScope(projectId, memberId, options, endpoint = ":version/projects/:projectId/members/:memberId/scopes") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, memberId }, options);
          const body = JSON.stringify(options);
          const result = yield this.put(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the project invites for the specified project.
     *
     * @param projectId - The ID of the project to retrieve the invites for.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/invites".
     * @returns A promise that resolves to an object containing the result of the get operation or an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/list-invites
     */
    getProjectInvites(projectId, endpoint = ":version/projects/:projectId/invites") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Sends a project invite to the specified email addresses.
     *
     * @param projectId - The ID of the project to send the invite for.
     * @param options - An object containing the email addresses to invite and any additional options.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/invites".
     * @returns A promise that resolves to an object containing the result of the post operation or an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/send-invites
     */
    sendProjectInvite(projectId, options, endpoint = ":version/projects/:projectId/invites") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
          const body = JSON.stringify(options);
          const result = yield this.post(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Deletes a project invite for the specified email address.
     *
     * @param projectId - The ID of the project to delete the invite for.
     * @param email - The email address of the invite to delete.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/invites/:email".
     * @returns A promise that resolves to an object containing a null result and an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/delete-invite
     */
    deleteProjectInvite(projectId, email, endpoint = ":version/projects/:projectId/invites/:email") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, email });
          yield this.delete(requestUrl).then((result) => result.json());
          return { error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { error };
          }
          throw error;
        }
      });
    }
    /**
     * Leaves the specified project.
     *
     * @param projectId - The ID of the project to leave.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/leave".
     * @returns A promise that resolves to an object containing a null result and an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/leave-project
     */
    leaveProject(projectId, endpoint = ":version/projects/:projectId/leave") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId });
          const result = yield this.delete(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves a list of usage requests for the specified project.
     *
     * @param projectId - The ID of the project to retrieve usage requests for.
     * @param options - An object containing options to filter the usage requests, such as pagination parameters.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/requests".
     * @returns A promise that resolves to an object containing the list of usage requests and an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/get-all-requests
     */
    getProjectUsageRequests(projectId, options, endpoint = ":version/projects/:projectId/requests") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the details of a specific usage request for the specified project.
     *
     * @param projectId - The ID of the project to retrieve the usage request for.
     * @param requestId - The ID of the usage request to retrieve.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/requests/:requestId".
     * @returns A promise that resolves to an object containing the usage request details and an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/get-request
     */
    getProjectUsageRequest(projectId, requestId, endpoint = ":version/projects/:projectId/requests/:requestId") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, requestId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the usage summary for the specified project.
     *
     * @param projectId - The ID of the project to retrieve the usage summary for.
     * @param options - An object containing optional parameters for the request, such as filters and pagination options.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/usage".
     * @returns A promise that resolves to an object containing the usage summary and an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/get-usage
     */
    getProjectUsageSummary(projectId, options, endpoint = ":version/projects/:projectId/usage") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the usage fields for the specified project.
     *
     * @param projectId - The ID of the project to retrieve the usage fields for.
     * @param options - An object containing optional parameters for the request, such as filters and pagination options.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/usage/fields".
     * @returns A promise that resolves to an object containing the usage fields and an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/get-fields
     */
    getProjectUsageFields(projectId, options, endpoint = ":version/projects/:projectId/usage/fields") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the balances for the specified project.
     *
     * @param projectId - The ID of the project to retrieve the balances for.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/balances".
     * @returns A promise that resolves to an object containing the project balances and an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/get-all-balances
     */
    getProjectBalances(projectId, endpoint = ":version/projects/:projectId/balances") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the balance for the specified project and balance ID.
     *
     * @param projectId - The ID of the project to retrieve the balance for.
     * @param balanceId - The ID of the balance to retrieve.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/projects/:projectId/balances/:balanceId".
     * @returns A promise that resolves to an object containing the project balance and an error object if an error occurred.
     * @see https://developers.deepgram.com/reference/get-balance
     */
    getProjectBalance(projectId, balanceId, endpoint = ":version/projects/:projectId/balances/:balanceId") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, balanceId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves all models for a given project.
     *
     * @param projectId - The ID of the project.
     * @param endpoint - (optional) The endpoint URL for retrieving models. Defaults to ":version/projects/:projectId/models".
     * @returns A promise that resolves to a DeepgramResponse containing the GetModelsResponse.
     * @example
     * ```typescript
     * import { createClient } from "@deepgram/sdk";
     *
     * const deepgram = createClient(DEEPGRAM_API_KEY);
     * const { result: models, error } = deepgram.manage.getAllModels("projectId");
     *
     * if (error) {
     *   console.error(error);
     * } else {
     *   console.log(models);
     * }
     * ```
     */
    getAllModels(projectId, options = {}, endpoint = ":version/projects/:projectId/models") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId }, options);
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves a model from the specified project.
     *
     * @param projectId - The ID of the project.
     * @param modelId - The ID of the model.
     * @param endpoint - (optional) The endpoint URL for the request. Default value is ":version/projects/:projectId/models/:modelId".
     * @returns A promise that resolves to a DeepgramResponse containing the GetModelResponse.
     * @example
     * ```typescript
     * import { createClient } from "@deepgram/sdk";
     *
     * const deepgram = createClient(DEEPGRAM_API_KEY);
     * const { result: model, error } = deepgram.models.getModel("projectId", "modelId");
     *
     * if (error) {
     *   console.error(error);
     * } else {
     *   console.log(model);
     * }
     * ```
     */
    getModel(projectId, modelId, endpoint = ":version/projects/:projectId/models/:modelId") {
      return __awaiter6(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, modelId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/ModelsRestClient.js
  var __awaiter7 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ModelsRestClient = class extends AbstractRestClient {
    constructor() {
      super(...arguments);
      this.namespace = "models";
    }
    /**
     * Retrieves a list of all available models.
     *
     * @param endpoint - (optional) The endpoint to request.
     * @returns A promise that resolves with the response from the Deepgram API.
     * @example
     * ```typescript
     * import { createClient } from "@deepgram/sdk";
     *
     * const deepgram = createClient(DEEPGRAM_API_KEY);
     * const { result: models, error } = deepgram.models.getAll();
     *
     * if (error) {
     *   console.error(error);
     * } else {
     *   console.log(models);
     * }
     * ```
     */
    getAll(endpoint = ":version/models", options = {}) {
      return __awaiter7(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, {}, options);
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves information about a specific model.
     *
     * @param modelId - The UUID of the model to retrieve.
     * @param endpoint - (optional) The endpoint to request.
     * @returns A promise that resolves with the response from the Deepgram API.
     * @example
     * ```typescript
     * import { createClient } from "@deepgram/sdk";
     *
     * const deepgram = createClient(DEEPGRAM_API_KEY);
     * const { result: model, error } = deepgram.models.getModel("modelId");
     *
     * if (error) {
     *   console.error(error);
     * } else {
     *   console.log(model);
     * }
     * ```
     */
    getModel(modelId, endpoint = ":version/models/:modelId") {
      return __awaiter7(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { modelId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/ReadRestClient.js
  var __awaiter8 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ReadRestClient = class extends AbstractRestClient {
    constructor() {
      super(...arguments);
      this.namespace = "read";
    }
    /**
     * Analyzes a URL-based audio source synchronously.
     *
     * @param source - The URL-based audio source to analyze.
     * @param options - Optional analysis options.
     * @param endpoint - The API endpoint to use for the analysis. Defaults to ":version/read".
     * @returns A promise that resolves to the analysis response, or an error if the analysis fails.
     */
    analyzeUrl(source, options, endpoint = ":version/read") {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          let body;
          if (isUrlSource(source)) {
            body = JSON.stringify(source);
          } else {
            throw new DeepgramError("Unknown source type");
          }
          if (options !== void 0 && "callback" in options) {
            throw new DeepgramError("Callback cannot be provided as an option to a synchronous transcription. Use `analyzeUrlCallback` or `analyzeTextCallback` instead.");
          }
          const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({}, options));
          const result = yield this.post(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Analyzes a text-based audio source synchronously.
     *
     * @param source - The text-based audio source to analyze.
     * @param options - Optional analysis options.
     * @param endpoint - The API endpoint to use for the analysis. Defaults to ":version/read".
     * @returns A promise that resolves to the analysis response, or an error if the analysis fails.
     */
    analyzeText(source, options, endpoint = ":version/read") {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          let body;
          if (isTextSource(source)) {
            body = JSON.stringify(source);
          } else {
            throw new DeepgramError("Unknown source type");
          }
          if (options !== void 0 && "callback" in options) {
            throw new DeepgramError("Callback cannot be provided as an option to a synchronous requests. Use `analyzeUrlCallback` or `analyzeTextCallback` instead.");
          }
          const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({}, options));
          const result = yield this.post(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Analyzes a URL-based audio source asynchronously.
     *
     * @param source - The URL-based audio source to analyze.
     * @param callback - The URL to call back with the analysis results.
     * @param options - Optional analysis options.
     * @param endpoint - The API endpoint to use for the analysis. Defaults to ":version/read".
     * @returns A promise that resolves to the analysis response, or an error if the analysis fails.
     */
    analyzeUrlCallback(source, callback, options, endpoint = ":version/read") {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          let body;
          if (isUrlSource(source)) {
            body = JSON.stringify(source);
          } else {
            throw new DeepgramError("Unknown source type");
          }
          const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign(Object.assign({}, options), { callback: callback.toString() }));
          const result = yield this.post(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Analyzes a text-based audio source asynchronously.
     *
     * @param source - The text-based audio source to analyze.
     * @param callback - The URL to call back with the analysis results.
     * @param options - Optional analysis options.
     * @param endpoint - The API endpoint to use for the analysis. Defaults to ":version/read".
     * @returns A promise that resolves to the analysis response, or an error if the analysis fails.
     */
    analyzeTextCallback(source, callback, options, endpoint = ":version/read") {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          let body;
          if (isTextSource(source)) {
            body = JSON.stringify(source);
          } else {
            throw new DeepgramError("Unknown source type");
          }
          const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign(Object.assign({}, options), { callback: callback.toString() }));
          const result = yield this.post(requestUrl, body, {
            headers: { "Content-Type": "deepgram/audio+video" }
          }).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/SelfHostedRestClient.js
  var __awaiter9 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var SelfHostedRestClient = class extends AbstractRestClient {
    constructor() {
      super(...arguments);
      this.namespace = "selfhosted";
    }
    /**
     * Lists the self-hosted credentials for a Deepgram project.
     *
     * @param projectId - The ID of the Deepgram project.
     * @returns A promise that resolves to an object containing the list of self-hosted credentials and any error that occurred.
     * @see https://developers.deepgram.com/reference/list-credentials
     */
    listCredentials(projectId, endpoint = ":version/projects/:projectId/onprem/distribution/credentials") {
      return __awaiter9(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the self-hosted credentials for a specific Deepgram project and credentials ID.
     *
     * @param projectId - The ID of the Deepgram project.
     * @param credentialsId - The ID of the self-hosted credentials to retrieve.
     * @returns A promise that resolves to an object containing the self-hosted credentials and any error that occurred.
     * @see https://developers.deepgram.com/reference/get-credentials
     */
    getCredentials(projectId, credentialsId, endpoint = ":version/projects/:projectId/onprem/distribution/credentials/:credentialsId") {
      return __awaiter9(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, credentialsId });
          const result = yield this.get(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Creates self-hosted credentials for a specific Deepgram project.
     *
     * @param projectId - The ID of the Deepgram project.
     * @param options - The options for creating the self-hosted credentials.
     * @returns A promise that resolves to an object containing the created self-hosted credentials and any error that occurred.
     * @see https://developers.deepgram.com/reference/create-credentials
     */
    createCredentials(projectId, options, endpoint = ":version/projects/:projectId/onprem/distribution/credentials") {
      return __awaiter9(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId });
          const body = JSON.stringify(options);
          const result = yield this.post(requestUrl, body).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Deletes self-hosted credentials for a specific Deepgram project.
     *
     * @param projectId - The ID of the Deepgram project.
     * @param credentialsId - The ID of the self-hosted credentials to delete.
     * @returns A promise that resolves to an object containing a message response and any error that occurred.
     * @see https://developers.deepgram.com/reference/delete-credentials
     */
    deleteCredentials(projectId, credentialsId, endpoint = ":version/projects/:projectId/onprem/distribution/credentials/:credentialsId") {
      return __awaiter9(this, void 0, void 0, function* () {
        try {
          const requestUrl = this.getRequestUrl(endpoint, { projectId, credentialsId });
          const result = yield this.delete(requestUrl).then((result2) => result2.json());
          return { result, error: null };
        } catch (error) {
          if (isDeepgramError(error)) {
            return { result: null, error };
          }
          throw error;
        }
      });
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/SpeakLiveClient.js
  var SpeakLiveClient = class extends AbstractLiveClient {
    /**
     * Constructs a new `SpeakLiveClient` instance with the provided options.
     *
     * @param options - The `DeepgramClientOptions` to use for the client connection.
     * @param speakOptions - An optional `SpeakSchema` object containing additional configuration options for the text-to-speech.
     * @param endpoint - An optional string representing the WebSocket endpoint to connect to. Defaults to `:version/speak`.
     */
    constructor(options, speakOptions = {}, endpoint = ":version/speak") {
      super(options);
      this.namespace = "speak";
      this.connect(speakOptions, endpoint);
    }
    /**
     * Sets up the connection event handlers.
     * This method is responsible for handling the various events that can occur on the WebSocket connection, such as opening, closing, and receiving data.
     * - When the connection is opened, it emits the `LiveTTSEvents.Open` event.
     * - When the connection is closed, it emits the `LiveTTSEvents.Close` event.
     * - When an error occurs on the connection, it emits the `LiveTTSEvents.Error` event.
     * - When a message is received, it parses the message and emits the appropriate event based on the message type, such as `LiveTTSEvents.Metadata`, `LiveTTSEvents.Flushed`, and `LiveTTSEvents.Warning`.
     */
    setupConnection() {
      if (this.conn) {
        this.conn.onopen = () => {
          this.emit(LiveTTSEvents.Open, this);
        };
        this.conn.onclose = (event) => {
          this.emit(LiveTTSEvents.Close, event);
        };
        this.conn.onerror = (event) => {
          this.emit(LiveTTSEvents.Error, event);
        };
        this.conn.onmessage = (event) => {
          this.handleMessage(event);
        };
      }
    }
    /**
     * Handles text messages received from the WebSocket connection.
     * @param data - The parsed JSON data.
     */
    handleTextMessage(data) {
      if (data.type === LiveTTSEvents.Metadata) {
        this.emit(LiveTTSEvents.Metadata, data);
      } else if (data.type === LiveTTSEvents.Flushed) {
        this.emit(LiveTTSEvents.Flushed, data);
      } else if (data.type === LiveTTSEvents.Warning) {
        this.emit(LiveTTSEvents.Warning, data);
      } else {
        this.emit(LiveTTSEvents.Unhandled, data);
      }
    }
    /**
     * Handles binary messages received from the WebSocket connection.
     * @param data - The binary data.
     */
    handleBinaryMessage(data) {
      this.emit(LiveTTSEvents.Audio, data);
    }
    /**
     * Sends a text input message to the server.
     *
     * @param {string} text - The text to convert to speech.
     */
    sendText(text) {
      this.send(JSON.stringify({
        type: "Speak",
        text
      }));
    }
    /**
     * Requests the server flush the current buffer and return generated audio.
     */
    flush() {
      this.send(JSON.stringify({
        type: "Flush"
      }));
    }
    /**
     * Requests the server clear the current buffer.
     */
    clear() {
      this.send(JSON.stringify({
        type: "Clear"
      }));
    }
    /**
     * Requests the server close the connection.
     */
    requestClose() {
      this.send(JSON.stringify({
        type: "Close"
      }));
    }
    /**
     * Handles incoming messages from the WebSocket connection.
     * @param event - The MessageEvent object representing the received message.
     */
    handleMessage(event) {
      if (typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          this.handleTextMessage(data);
        } catch (error) {
          this.emit(LiveTTSEvents.Error, {
            event,
            message: "Unable to parse `data` as JSON.",
            error
          });
        }
      } else if (event.data instanceof Blob) {
        event.data.arrayBuffer().then((buffer) => {
          this.handleBinaryMessage(Buffer.from(buffer));
        });
      } else if (event.data instanceof ArrayBuffer) {
        this.handleBinaryMessage(Buffer.from(event.data));
      } else if (Buffer.isBuffer(event.data)) {
        this.handleBinaryMessage(event.data);
      } else {
        console.log("Received unknown data type", event.data);
        this.emit(LiveTTSEvents.Error, {
          event,
          message: "Received unknown data type."
        });
      }
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/SpeakRestClient.js
  var __awaiter10 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var SpeakRestClient = class extends AbstractRestClient {
    constructor() {
      super(...arguments);
      this.namespace = "speak";
    }
    /**
     * Sends a request to the Deepgram Text-to-Speech API to generate audio from the provided text source.
     *
     * @param source - The text source to be converted to audio.
     * @param options - Optional configuration options for the text-to-speech request.
     * @param endpoint - The API endpoint to use for the request. Defaults to ":version/speak".
     * @returns A promise that resolves to the SpeakRestClient instance, which can be used to retrieve the response headers and body.
     * @throws {DeepgramError} If the text source type is unknown.
     * @throws {DeepgramUnknownError} If the request was made before a previous request completed.
     * @see https://developers.deepgram.com/reference/text-to-speech-api
     */
    request(source, options, endpoint = ":version/speak") {
      return __awaiter10(this, void 0, void 0, function* () {
        let body;
        if (isTextSource(source)) {
          body = JSON.stringify(source);
        } else {
          throw new DeepgramError("Unknown transcription source type");
        }
        const requestUrl = this.getRequestUrl(endpoint, {}, Object.assign({ model: "aura-asteria-en" }, options));
        this.result = yield this.post(requestUrl, body, {
          headers: { Accept: "audio/*", "Content-Type": "application/json" }
        });
        return this;
      });
    }
    /**
     * Retrieves the response body as a readable stream.
     *
     * @returns A promise that resolves to the response body as a readable stream, or `null` if no request has been made yet.
     * @throws {DeepgramUnknownError} If a request has not been made yet.
     */
    getStream() {
      return __awaiter10(this, void 0, void 0, function* () {
        if (!this.result)
          throw new DeepgramUnknownError("Tried to get stream before making request", "");
        return this.result.body;
      });
    }
    /**
     * Retrieves the response headers from the previous request.
     *
     * @returns A promise that resolves to the response headers, or throws a `DeepgramUnknownError` if no request has been made yet.
     */
    getHeaders() {
      return __awaiter10(this, void 0, void 0, function* () {
        if (!this.result)
          throw new DeepgramUnknownError("Tried to get headers before making request", "");
        return this.result.headers;
      });
    }
  };

  // node_modules/@deepgram/sdk/dist/module/packages/SpeakClient.js
  var SpeakClient = class extends AbstractClient {
    constructor() {
      super(...arguments);
      this.namespace = "speak";
    }
    /**
     * Returns a `SpeakRestClient` instance for interacting with the rest speak API.
     */
    request(source, options, endpoint = ":version/speak") {
      const client = new SpeakRestClient(this.options);
      return client.request(source, options, endpoint);
    }
    /**
     * Returns a `SpeakLiveClient` instance for interacting with the live speak API, with the provided TTS options and endpoint.
     * @param {SpeakSchema} [ttsOptions={}] - The TTS options to use for the live speak API.
     * @param {string} [endpoint=":version/speak"] - The endpoint to use for the live speak API.
     * @returns {SpeakLiveClient} - A `SpeakLiveClient` instance for interacting with the live speak API.
     */
    live(ttsOptions = {}, endpoint = ":version/speak") {
      return new SpeakLiveClient(this.options, ttsOptions, endpoint);
    }
  };

  // node_modules/@deepgram/sdk/dist/module/DeepgramClient.js
  var DeepgramClient = class extends AbstractClient {
    /**
     * Returns a new instance of the AuthRestClient, which provides access to the Deepgram API's temporary token endpoints.
     *
     * @returns {AuthRestClient} A new instance of the AuthRestClient.
     * @see https://developers.deepgram.com/reference/token-based-auth-api/grant-token
     */
    get auth() {
      return new AuthRestClient(this.options);
    }
    /**
     * Returns a new instance of the ListenClient, which provides access to the Deepgram API's listening functionality.
     *
     * @returns {ListenClient} A new instance of the ListenClient.
     */
    get listen() {
      return new ListenClient(this.options);
    }
    /**
     * Returns a new instance of the ManageClient, which provides access to the Deepgram API's management functionality.
     *
     * @returns {ManageClient} A new instance of the ManageClient.
     */
    get manage() {
      return new ManageRestClient(this.options);
    }
    /**
     * Returns a new instance of the ModelsRestClient, which provides access to the Deepgram API's model functionality.
     *
     * @returns {ModelsRestClient} A new instance of the ModelsRestClient.
     */
    get models() {
      return new ModelsRestClient(this.options);
    }
    /**
     * Returns a new instance of the SelfHostedRestClient, which provides access to the Deepgram API's self-hosted functionality.
     *
     * @returns {OnPremClient} A new instance of the SelfHostedRestClient named as OnPremClient.
     * @deprecated use selfhosted() instead
     */
    get onprem() {
      return this.selfhosted;
    }
    /**
     * Returns a new instance of the SelfHostedRestClient, which provides access to the Deepgram API's self-hosted functionality.
     *
     * @returns {SelfHostedRestClient} A new instance of the SelfHostedRestClient.
     */
    get selfhosted() {
      return new SelfHostedRestClient(this.options);
    }
    /**
     * Returns a new instance of the ReadClient, which provides access to the Deepgram API's reading functionality.
     *
     * @returns {ReadClient} A new instance of the ReadClient.
     */
    get read() {
      return new ReadRestClient(this.options);
    }
    /**
     * Returns a new instance of the SpeakClient, which provides access to the Deepgram API's speaking functionality.
     *
     * @returns {SpeakClient} A new instance of the SpeakClient.
     */
    get speak() {
      return new SpeakClient(this.options);
    }
    /**
     * Returns a new instance of the AgentLiveClient, which provides access to Deepgram's Voice Agent API.
     *
     * @returns {AgentLiveClient} A new instance of the AgentLiveClient.
     * @beta
     */
    agent(endpoint = "/:version/agent/converse") {
      return new AgentLiveClient(this.options, endpoint);
    }
    /**
     * @deprecated
     * @see https://dpgr.am/js-v3
     */
    get transcription() {
      throw new DeepgramVersionError();
    }
    /**
     * @deprecated
     * @see https://dpgr.am/js-v3
     */
    get projects() {
      throw new DeepgramVersionError();
    }
    /**
     * @deprecated
     * @see https://dpgr.am/js-v3
     */
    get keys() {
      throw new DeepgramVersionError();
    }
    /**
     * @deprecated
     * @see https://dpgr.am/js-v3
     */
    get members() {
      throw new DeepgramVersionError();
    }
    /**
     * @deprecated
     * @see https://dpgr.am/js-v3
     */
    get scopes() {
      throw new DeepgramVersionError();
    }
    /**
     * @deprecated
     * @see https://dpgr.am/js-v3
     */
    get invitation() {
      throw new DeepgramVersionError();
    }
    /**
     * @deprecated
     * @see https://dpgr.am/js-v3
     */
    get usage() {
      throw new DeepgramVersionError();
    }
    /**
     * @deprecated
     * @see https://dpgr.am/js-v3
     */
    get billing() {
      throw new DeepgramVersionError();
    }
  };

  // node_modules/@deepgram/sdk/dist/module/index.js
  function createClient(keyOrOptions, options) {
    let resolvedOptions = {};
    if (typeof keyOrOptions === "string" || typeof keyOrOptions === "function") {
      if (typeof options === "object") {
        resolvedOptions = options;
      }
      resolvedOptions.key = keyOrOptions;
    } else if (typeof keyOrOptions === "object") {
      resolvedOptions = keyOrOptions;
    }
    return new DeepgramClient(resolvedOptions);
  }

  // mic_source.js
  var micStream = null;
  var deviceStream = null;
  var connection = null;
  var isRecording = false;
  var audioContext = null;
  var audioProcessor = null;
  var keepAliveInterval = null;
  var currentApiKey = null;
  var currentCaptureMode = null;
  async function getStreams(captureMode, streamId) {
    const streams = [];
    if (captureMode === "mic" || captureMode === "both") {
      try {
        const mic = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        micStream = mic;
        streams.push(mic);
      } catch (err) {
        console.warn("Mic access failed:", err.message);
        if (captureMode === "mic")
          throw err;
      }
    }
    if (captureMode === "device" || captureMode === "both") {
      try {
        let device;
        if (streamId) {
          device = await navigator.mediaDevices.getUserMedia({
            audio: {
              mandatory: {
                chromeMediaSource: "tab",
                chromeMediaSourceId: streamId
              }
            },
            video: false
          });
        } else {
          device = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            // required to show screen picker
            audio: true
          });
          device.getVideoTracks().forEach((t) => t.stop());
        }
        deviceStream = device;
        if (device.getAudioTracks().length > 0) {
          streams.push(device);
        } else {
          window.parent.postMessage({
            type: "CAPTIONS_ERROR",
            error: 'No system audio captured. Make sure to check "Share system audio" in the screen picker.'
          }, "*");
        }
      } catch (err) {
        if (captureMode === "device")
          throw err;
        console.warn("Device audio failed or was cancelled:", err.message);
        window.parent.postMessage({
          type: "CAPTIONS_ERROR",
          error: "Device audio unavailable, falling back to microphone only."
        }, "*");
      }
    }
    return streams;
  }
  function openDeepgramConnection(apiKey) {
    if (!audioContext || !audioProcessor)
      return;
    const deepgram = createClient(apiKey);
    connection = deepgram.listen.live({
      model: "nova-2",
      smart_format: true,
      encoding: "linear16",
      sample_rate: audioContext.sampleRate,
      channels: 1
    });
    audioProcessor.port.onmessage = (event) => {
      if (isRecording && connection) {
        connection.send(event.data);
      }
    };
    connection.on("open", () => {
      console.log("Deepgram connection opened");
      clearInterval(keepAliveInterval);
      keepAliveInterval = setInterval(() => {
        if (connection) {
          connection.keepAlive();
        }
      }, 8e3);
    });
    connection.on("Results", (data) => {
      const transcript = data.channel?.alternatives[0]?.transcript;
      if (transcript && data.is_final) {
        window.parent.postMessage({ type: "CAPTIONS_RESULT", text: transcript + " " }, "*");
      }
    });
    connection.on("error", (error) => {
      console.error("Deepgram WebSocket error:", error);
      window.parent.postMessage({ type: "CAPTIONS_ERROR", error: "Deepgram connection error. Check your API key." }, "*");
    });
    connection.on("close", () => {
      console.log("Deepgram connection closed");
      clearInterval(keepAliveInterval);
      keepAliveInterval = null;
      connection = null;
      if (isRecording) {
        console.log("Unexpected close, reconnecting in 1.5s...");
        setTimeout(() => {
          if (isRecording) {
            openDeepgramConnection(currentApiKey);
          }
        }, 1500);
      }
    });
  }
  async function startDeepgram(apiKey, captureMode = "both", streamId = null) {
    currentApiKey = apiKey;
    currentCaptureMode = captureMode;
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const streams = await getStreams(captureMode, streamId);
      if (streams.length === 0) {
        window.parent.postMessage({ type: "CAPTIONS_ERROR", error: "No audio streams available. Check permissions." }, "*");
        audioContext.close();
        audioContext = null;
        return;
      }
      isRecording = true;
      await audioContext.audioWorklet.addModule(chrome.runtime.getURL("audio-processor.js"));
      audioProcessor = new AudioWorkletNode(audioContext, "audio-processor", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [1]
      });
      if (streams.length > 1) {
        const merger = audioContext.createChannelMerger(streams.length);
        streams.forEach((stream, i) => {
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(merger, 0, i);
        });
        merger.connect(audioProcessor);
      } else {
        const source = audioContext.createMediaStreamSource(streams[0]);
        source.connect(audioProcessor);
      }
      audioProcessor.connect(audioContext.destination);
      openDeepgramConnection(apiKey);
    } catch (error) {
      console.error("Audio error:", error);
      isRecording = false;
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
      window.parent.postMessage({
        type: "CAPTIONS_ERROR",
        error: error.message || "Audio access denied or cancelled"
      }, "*");
    }
  }
  function stopCaptions() {
    isRecording = false;
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    if (connection) {
      connection.requestClose();
      connection = null;
    }
    if (audioProcessor) {
      audioProcessor.disconnect();
      audioProcessor = null;
    }
    if (audioContext && audioContext.state !== "closed") {
      audioContext.close();
    }
    audioContext = null;
    if (micStream) {
      micStream.getTracks().forEach((track) => track.stop());
      micStream = null;
    }
    if (deviceStream) {
      deviceStream.getTracks().forEach((track) => track.stop());
      deviceStream = null;
    }
    currentApiKey = null;
    currentCaptureMode = null;
  }
  window.addEventListener("message", (event) => {
    if (event.data.type === "START_CAPTIONS") {
      if (!isRecording && event.data.apiKey) {
        startDeepgram(event.data.apiKey, event.data.captureMode || "both", event.data.streamId);
      } else if (!event.data.apiKey) {
        window.parent.postMessage({ type: "CAPTIONS_ERROR", error: "Missing Deepgram API Key" }, "*");
      }
    } else if (event.data.type === "STOP_CAPTIONS") {
      stopCaptions();
    }
  });
})();
