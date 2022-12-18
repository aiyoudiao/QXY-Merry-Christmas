const runScript = (script) => {
  return new Promise((reslove, rejected) => {
    // 直接 document.head.appendChild(script) 是不会生效的，需要重新创建一个
    const newScript = document.createElement("script");
    // 获取 inline script
    newScript.innerHTML = script.innerHTML;
    // 存在 src 属性的话
    const src = script.getAttribute("src");
    if (src) newScript.setAttribute("src", src);

    // script 加载完成和错误处理
    newScript.onload = () => reslove();
    newScript.onerror = (err) => rejected();
    document.head.appendChild(newScript);
    document.head.removeChild(newScript);
    if (!src) {
      // 如果是 inline script 执行是同步的
      reslove();
    }
  });
};

const browserAction = () => {
  var sUserAgent = navigator.userAgent.toLowerCase();

  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";

  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";

  var bIsMidp = sUserAgent.match(/midp/i) == "midp";

  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";

  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";

  var bIsAndroid = sUserAgent.match(/android/i) == "android";

  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";

  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

  const btn = document.querySelector("#copy-btn");

  if (
    !(
      bIsIpad ||
      bIsIphoneOs ||
      bIsMidp ||
      bIsUc7 ||
      bIsUc ||
      bIsAndroid ||
      bIsCE ||
      bIsWM
    )
  ) {
    //电脑端
    btn.classList.add("pc");
  } else {
    //手机端
    btn.classList.remove("pc");
  }
};

const windowResize = () => {
  const win = window;
  const doc = document;
  const docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function () {
      var clientHeight = docEl.clientHeight;
      if (!clientHeight) return;
      docEl.style.fontSize = 10 * (clientHeight / 604) + "px";
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);

  recalc();
};

export { runScript, browserAction, windowResize };
