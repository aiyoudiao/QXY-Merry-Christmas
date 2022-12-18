import { wrapGrid } from "animate-css-grid";
import { runScript } from "./share/tool";

document.querySelector("head").innerHTML = `
    ${document.querySelector("head").innerHTML}
    <link rel="stylesheet" href="./normalize.min.css">
    <link rel="stylesheet" href="./christmas-lights.css" />
    <link rel="stylesheet" href="./puzzle.css" />

`;
document.querySelector("#app").innerHTML = `

<div id="overlay">
  <ul id="musicList">
    <li class="title">Select Music</li>
    <li>
      <button class="btn" id="btnA" type="button">
      撒野.mp3
      </button>
    </li>
    <li><button class="btn" id="btnB" type="button">
    how to love.mp3
    </button></li>
    <li><button class="btn" id="btnC" type="button">
    its you.mp3
    </button></li>
    <li><button class="btn" id="btnD" type="button">
    love is gone.mp3
    </button></li>
    <li><button class="btn" id="btnE" type="button">
    stay with me.mp3
    </button></li>
    <li class="separator">OR</li>
    <li>
      <input type="file" id="upload" hidden />
      <label for="upload">Upload File</label>
    </li>
  </ul>
</div>

<!-- partial -->
<script src="./three.min.js"></script>
<script src="./EffectComposer.js"></script>
<script src="./RenderPass.js"></script>
<script src="./ShaderPass.js"></script>
<script src="./CopyShader.js"></script>
<script src="./LuminosityHighPassShader.js"></script>
<script src="./UnrealBloomPass.js"></script>
<script  src="./christmas-lights.js"></script>
<div class="puzzle-box" >
  <div class="puzzle">
    <div class="heading">
      <span>
        <sub>★</sub> <sup>☆</sup> <sub>★</sub> <sup>☆</sup> <sub>★</sub> <sup>☆</sup> <sub>★</sub>
      </span>
      <h2 id="xq">Merry Christmas</h2>
      <span>
        <sup>★</sup> <sub>☆</sub> <sup>★</sup> <sub>☆</sub> <sup>★</sup> <sub>☆</sub> <sup>★</sup>
      </span>
    </div>
    <div class="answer"></div>
    <div class="grid">
      <button class="tile tile--1" style="--area:A"></button>
      <button class="tile tile--2" style="--area:B"></button>
      <button class="tile tile--3" style="--area:C"></button>
      <button class="tile tile--4" style="--area:D"></button>
      <button class="tile tile--5" style="--area:E"></button>
      <button class="tile tile--6" style="--area:F"></button>
      <button class="tile tile--7" style="--area:G"></button>
      <button class="tile tile--8" style="--area:H"></button>
      <div class="tile tile--empty" style="--area:I"></div>
    </div>
  </div>
</div>
<script  src="./puzzle.js"></script>
`;

window.addEventListener("load", function () {
  window.wrapGrid = wrapGrid;
  const scripts = document.querySelector("#app").querySelectorAll("script");
  Array.prototype.slice.apply(scripts).reduce((chain, script) => {
    return chain.then(() => runScript(script));
  }, Promise.resolve());

  const transparentList = [".puzzle", ".grid"];
  let hash = window.location.hash;

  if (hash) {
    if (hash.includes("#xq")) {
      document.querySelector("#xq").innerHTML = "XQ Merry Christmas";
    }

    if (!hash.includes("#music")) {
      const musicListEntity = [...document.querySelectorAll("#musicList>li")];
      musicListEntity
        .slice(1, musicListEntity.length - 1)
        .forEach((item) => item.remove());
    }

    if (hash.includes("#transparent")) {
      transparentList.forEach((item) => {
        document.querySelector(item).classList.add("transparent");
      });
    } else {
      document.querySelector(item).classList.remove("transparent");
    }

    if (hash.includes("#my-love")) {
      document.querySelectorAll(".tile,.answer").forEach((item) => {
        item.classList.add("my-love");
      });
    } else {
      document.querySelectorAll(".tile,.answer").forEach((item) => {
        item.classList.remove("my-love");
      });
    }
  }
});
