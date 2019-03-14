// reset rem base size when window onResize;
export function onresize() {
  var html = document.getElementsByTagName("html")[0];
  html.style.fontSize = html.offsetWidth / 750 * 40 + "px";
}
window.onresize = onresize;
window.addEventListener('onbeforeunload', function (event) {
  // 点击回退时再向历史记录插入一条，以便阻止下一次点击回退
  history.pushState("456", "45678", document.URL.split("?")[0]);
});
// onresize();

// append audio
export function appendAudio() {
  const audio = document.createElement("audio");
  audio.id = "audio";
  document.querySelector("body").appendChild(audio);
}

// appendAudio();
// add require to window; it may works in node env;
// try {
//   window.require = require;
// } catch (e) {
//   console.log(`now runing in web env!`)
// }
export default {
  onresize, appendAudio
}
