setInterval(initExtension, 3000);

async function initExtension() {
  const mainLogos = document.querySelectorAll("svg");
  Array.from(mainLogos).forEach((log) => {
    log.parentNode.replaceChild(randomDerp(), log);
  });
  let mainText = document.querySelector(".c7e7df4d");
  if (mainText != null) {
    mainText.textContent = mainText.textContent.replace("DeepSeek", "DerpSearch");
    mainText.prepend(randomDerp());
  }
  const catchPhrase = document.querySelector(".a8d0e1d3");
  catchPhrase? catchPhrase.textContent = shuffleString(catchPhrase.textContent) : null;
}

function delayMS(d) {
  return new Promise((r) => {
    setTimeout(r, d);
  });
}

function shuffleString(s) {
  let out = [];
  let N = s.length;
  s = Array.from(s);
  for (let i = 0; i < N; i++) {
    let k = randInt(s.length);
    out.push(s[k]);
    s.splice(k, 1);
  }
  return out.join("");
}

function randomDerp() {
  const derpIMG = new Image();
  derpIMG.src = browser.runtime.getURL(`icons/derp${randInt(7) + 1}.png`);
  derpIMG.className = "derp";
  return derpIMG;
}

//return a random int in [0,N[
function randInt(N) {
  if (N < 0) {
    return 0;
  }
  return Math.floor(Math.random() * (N - 1));
}
