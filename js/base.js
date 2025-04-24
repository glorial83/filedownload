var ua = window.navigator.userAgent.toLowerCase();
var uv = window.navigator.appVersion.toLowerCase();
var pageLoadTime;
var tmp;

var is_mobile = (function isMobile() {
  "use strict";
  var mobileStrings = [
    "iphone",
    "ipad",
    "android",
    "blackberry",
    "nokia",
    "opera mini",
    "ucbrowser",
    "windows mobile",
    "windows phone",
    "iemobile",
    "mobile safari",
    "bb10; touch",
  ];
  for (var i = mobileStrings.length; i--; ) {
    if (ua.indexOf(mobileStrings[i]) > 0) {
      return true;
    }
  }

  return false;
})();


var is_android = is_mobile && ua.indexOf("android") > 0;
var is_uc_browser = is_mobile && ua.indexOf("ucbrowser") > 0;
var is_ios =
  is_mobile &&
  (ua.indexOf("iphone") > -1 ||
    ua.indexOf("ipad") > -1 ||
    ua.indexOf("ipod") > -1);

var is_old_windows_phone =
  is_mobile &&
  /windows phone 8|iemobile\/9|iemobile\/10|iemobile\/11/i.test(ua);
var is_windowsphone =
  is_old_windows_phone || (is_mobile && ua.indexOf("windows phone") > 0);
var is_huawei =
  is_mobile && (ua.indexOf("huawei") > 0 || ua.indexOf("hmscore") > 0);

if (is_android && !is_huawei) {
  // detect huawei devices by model
  tmp = [
    "ana-al00",
    "ana-nx9",
    "ang-an00",
    "art-l28",
    "brq-an00",
    "cdy-nx9b",
    "dra-lx9",
    "els-n39",
    "els-nx9",
    "jef-nx9",
    "jny-lx2",
    "lio-an00m",
    "lio-l29",
    "lio-n29",
    "med-lx9",
    "noh-an00",
    "noh-lg",
    "noh-nx9",
    "nop-an00",
    "oce-an10",
    "oce-an50",
    "tas-l29",
    "tet-an00",
  ];
  for (var m = tmp.length; m--; ) {
    if (ua.indexOf(tmp[m]) > 0) {
      is_huawei = tmp[m];
      break;
    }
  }
}

try {
  if (typeof localStorage === "undefined" || localStorage === null) {
    throw new Error("SecurityError: DOM Exception 18");
  }

  d = localStorage.d | 0;
  jj = localStorage.jj;
  dd = localStorage.dd;

  // Write test
  localStorage["$!--foo"] = Array(100).join(",");
  delete localStorage["$!--foo"];
} catch (ex) {
  storageQuotaError = ex.code === 22;
  cookiesDisabled =
    (ex.code && ex.code === DOMException.SECURITY_ERR) ||
    ex.message === "SecurityError: DOM Exception 18" ||
    storageQuotaError;

  if (!cookiesDisabled) {
    throw ex;
  }

  // Cookies are disabled, therefore we can't use localStorage.
  // We could either show the user a message about the issue and let him
  // enable cookies, or rather setup a tiny polyfill so that they can use
  // the site even in such case, even though this solution has side effects.
  tmp = Object.create(
    {},
    {
      length: {
        get: function () {
          return Object.keys(this).length;
        },
      },
      key: {
        value: function (pos) {
          return Object.keys(this)[pos];
        },
      },
      removeItem: {
        value: function (key) {
          delete this[key];
        },
      },
      setItem: {
        value: function (key, value) {
          this[key] = String(value);
        },
      },
      getItem: {
        value: function (key) {
          if (this.hasOwnProperty(key)) {
            return this[key];
          }
          return null;
        },
      },
      clear: {
        value: function () {
          var obj = this;
          Object.keys(obj).forEach(function (memb) {
            if (obj.hasOwnProperty(memb)) {
              delete obj[memb];
            }
          });
        },
      },
    }
  );

  try {
    delete window.localStorage;
    Object.defineProperty(window, "localStorage", { value: tmp });
    Object.defineProperty(window, "sessionStorage", { value: tmp });
  } catch (e) {
    if (!is_mobile) {
      throw ex;
    }
  }
  tmp = undefined;

  setTimeout(function () {
    console.warn(
      "Apparently you have Cookies disabled, " +
        "please note this session is temporal, " +
        "it will die once you close/reload the browser/tab."
    );
  }, 4000);
}

window.onload = function () {
  "use strict";

  window.onload = null;
  pageLoadTime = Date.now();

  scriptTest(
    "es6s =" +
      (" BigInt(Math.pow(2, 48)) << 16n === 18446744073709551616n") + // C67 E79 F68 O54 S14
      ' && "\u044b \u0432".match(/\\p{L}+/gu)[1] === "\u0432"' + // C64 E79 F78 O51 S11
      " && (Array.prototype.flatMap !== undefined)" + // C69 E79 F62 O56 S12
      " && (function *(a=1,){yield a})(2).next().value === 2", // C58 E14 F52 O45 S10
    function (error) {
      if (error || !window.es6s) {
        document.location = "update.html";
        return;
      }
      console.log("window.es6s", window.es6s);
      console.log('start!!!!!!!!!!!!!!!!');
      delete window.es6s;
    }
  );
};

function scriptTest(data, callback) {
  "use strict";
  var feat = addScript([data]);
  var load = feat.onload;
  feat.onload = function () {
    if (load) {
      setTimeout(load);
    }
    callback(false);
    this.onload = this.onerror = null;
    this.parentNode.removeChild(this);
    URL.revokeObjectURL(this.src);
  };
  feat.onerror = callback;
}

function addScript(data) {
  "use strict";
  return mCreateElement("script", { type: "text/javascript" }, "head", data);
}

function mCreateElement(aNode, aAttrs, aChildNodes, aTarget, aData) {
  "use strict";

  aNode = document.createElement(aNode);
  if (!aNode) {
    return null;
  }

  if (aAttrs) {
    for (var attr in aAttrs) {
      aNode.setAttribute(attr, "" + aAttrs[attr]);
    }
  }

  if (!Array.isArray(aChildNodes)) {
    aData = aTarget;
    aTarget = aChildNodes;
    aChildNodes = null;
  }

  if (aChildNodes) {
    for (var cn in aChildNodes) {
      if (aChildNodes[cn]) {
        aNode.appendChild(aChildNodes[cn]);
      }
    }
  }

  if (aTarget) {
    if (typeof aTarget === "string") {
      aTarget = document[aTarget] || document.getElementsByTagName(aTarget)[0];
    }
    if (aTarget) {
      aTarget.appendChild(aNode);
    } else if (d) {
      console.error("Invalid target", aNode, aAttrs, aTarget);
    }
  }

  if (aData) {
    aData = mObjectURL(aData, (aAttrs && aAttrs.type) || "text/plain");

    if (!d) {
      aNode.onload = function () {
        setTimeout(function () {
          URL.revokeObjectURL(aData);
        }, 2600);

        aNode.onload = null;
      };
    }

    if (aNode.nodeName === "SCRIPT") {
      aNode.src = aData;
    } else {
      aNode.href = aData;
    }
  }

  return aNode;
}

function mObjectURL(data, type) {
  "use strict";
  return URL.createObjectURL(new Blob(data, { type: type }));
}

function inherits(target, source) {
  "use strict";

  target.prototype = Object.create((source && source.prototype) || source);
  Object.defineProperty(target.prototype, "constructor", {
    value: target,
    enumerable: false,
  });

  Object.defineProperty(target.prototype, "toString", {
    value: function () {
      return "[object " + this.constructor.name + "]";
    },
    writable: true,
    configurable: true,
  });

  if (!target.prototype.valueOf) {
    Object.defineProperty(target.prototype, "valueOf", {
      value: function () {
        return this;
      },
      configurable: true,
    });
  }

  if (source) {
    Object.setPrototypeOf(target, source);
  }
}