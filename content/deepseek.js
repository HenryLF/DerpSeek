window.addEventListener("load", initExtension);

async function initExtension() {
  await delayMS(1000);

  document.body.style.backgroundImage =
    browser.runtime.getURL("icons/derp_bck.svg");

  const derpBck = new Image();
  const mainLogo = document.querySelector(".c7e7df4d");
  const catchPhrase = document.querySelector(".a8d0e1d3");
  derpBck.src = browser.runtime.getURL("icons/derp_48.png");
  mainLogo.textContent = mainLogo.textContent.replace("Deep", "Derp");
  mainLogo.insertBefore(derpBck, mainLogo.firstChild);
  catchPhrase.textContent = shuffleString(catchPhrase.textContent);
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
//return a random int in [0,N[
function randInt(N) {
  if (N < 0) {
    return 0;
  }
  return Math.floor(Math.random() * (N - 1));
}
