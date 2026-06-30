const cta1 = document.querySelector(".frame1-cta");
const cover = document.querySelector(".cover");
const productM = document.querySelector(".real-img");
const bg = document.querySelector(".bg");
const sun = document.querySelector(".sun");
const product = document.querySelector(".real-img");
const catfishClick = document.querySelector("#catfishClick");
let step = 0;
const turb = document.getElementById("turb");
let t = 0,  active = true;
const isMobile = window.innerWidth <= 767;
const starTablet = window.innerWidth >= 768 && window.innerWidth <= 1000;
const ASSETS = {
  text1: isMobile  ? "catfish-m-text1.png" : "catfish-text.png",
  text2: isMobile  ? "catfish-m-normal.png" : "normal-text.png",
  text3: isMobile ? "catfish-m-cta.png" : "catfish-text2.png",
  "frame2-text1": isMobile || starTablet ? "frame2-m-text1.png" : "frame2-text1.png",
  "frame2-text2": isMobile || starTablet ? "frame2-m-text2.png" : "frame2-text2.png",
  catfishProdcut: isMobile  ? "catfish-m-product.png" : "catfish-product.png",
};

function handleClickthrough(src) {
  if(src === 'full'){
    setTimeout(() => {
       myFT.clickTag();
    }, 2000);
  }else{
     myFT.clickTag();
  }
 
}
function setCollapseFull() {
  console.log("run msg full");
  setTimeout(() => {
    window.top.postMessage({ source: "kult", type: "text", value: "collapse_full" }, "*");
  }, 600);
}
function setCollapseCatfish() {
  console.log("run msg catfish");
  setTimeout(() => {
    window.top.postMessage({ source: "kult", type: "text", value: "collapse_catfish" }, "*");
  }, 600);
}

function handleCollapseFull(state) {
  const collapse = gsap.timeline({ onComplete: setCollapseFull, delay: state === "user" ? 0.2 : 1.5 });
  collapse.to(".bg", { y: "110vh", duration: 0.5, ease: "power2.out" })
    .to(".bg-white", { y: "110vh", duration: 0.5, ease: "power2.out" }, "<")
    .to(".heat", { y: "110vh", duration: 0.5, ease: "power2.out" },"<")
    .to(".wave", { y: "110vh", duration: 0.5, ease: "power2.out" },"<")
    .to(".cloud", { y: "130vh", duration: 0.5, ease: "power2.out" }, "<")
    .to(".stage", { y: "150vh", duration: 0.5, ease: "power2.out" }, "<")
    .to("#closeBigBtn", { y: "110vh", opacity:0, duration: 0.5, ease: "power2.out" }, "<")
    .to("#catfish", { y: 0, duration: 0.5, ease: "power2.out" })
    .set(".bg, .bg-white, .cloud, .stage,  .wave", { opacity: 0 });
  document.body.removeEventListener("click", ()=>{
    handleClickthrough('full')
  });
  catfishClick.addEventListener("click", handleClickthrough);
}

function playFrame2() {
  const mm = gsap.matchMedia();
  mm.add({ isMobile: "(max-width: 1000px)", isDesktop: "(min-width: 1001px)" }, (context) => {
    const { isMobile, isDesktop } = context.conditions;
    const productX = isMobile ? 0 : "-10vw";
    const productY = isMobile ? "-3vh" : 0;
    const tl = gsap.timeline({ onComplete: handleCollapseFull });
    // const tl = gsap.timeline({});
    tl.to(".frame1-text", { opacity: 0, duration: 0.5, ease: "power2.out" },"<")
      .to(".frame1-cta", { opacity: 0, duration: 0.5, ease: "power2.out" }, "<")
      .to(".real-img", { x: productX, y:productY, duration: 0.6, ease: "power2.out" })
      .to(".frame2-text1", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out"})
      .to(".frame2-text2", { opacity: 1, duration: 0.5, ease: "power2.out" })
  });
  document.body.addEventListener("click",()=>{handleClickthrough('full')});
}

const ORANGE_IMAGES = ["./orange.png", "./orangeslice.png"];
function createEl(tag, css) {
  const el = document.createElement(tag);
  el.style.cssText = css + ";pointer-events:none;z-index:9999;position:fixed;";
  document.body.appendChild(el);
  return el;
}
function animateOut(el, props) {
  gsap.to(el, { ...props, onComplete: () => el.remove() });
}
function spawnOranges(x, y) {
  const count = 10;
  for (let i = 0; i < count; i++) {
    const size = 45 + Math.random() * 16;
    const img = createEl(
      "img",
      `
            left:${x - size / 2}px; top:${y - size / 2}px;
            width:${size}px; height:${size}px;
            object-fit:contain;
        `,
    );
    img.src = ORANGE_IMAGES[Math.floor(Math.random() * ORANGE_IMAGES.length)];
    const angle = ((Math.PI * 2) / count) * i + (Math.random() - 0.5) * 0.5;
    const dist = 55 + Math.random() * 85;
    animateOut(img, { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 15, rotation: (Math.random() - 0.5) * 600, opacity: 0, duration: 0.8, ease: "power2.out" });
  }
}
function triggerEffect(x, y) {
  spawnOranges(x, y);
}
const steps = [
    { clip: 15, bgOpacity: 0.9,  sunOpacity: 0.8,  heatOpacity: 0.2 },
    { clip: 27, bgOpacity: 0.83,  sunOpacity: 0.7,  heatOpacity: 0.1},
    { clip: 34, bgOpacity: 0.77,  sunOpacity: 0.6,  heatOpacity: 0.08},
    { clip: 41, bgOpacity: 0.72,  sunOpacity: 0.5,  heatOpacity: 0.06},
    { clip: 49, bgOpacity: 0.69,  sunOpacity: 0.4,  heatOpacity: 0.04},
    { clip: 56, bgOpacity: 0.63, sunOpacity: 0.35, heatOpacity: 0.02},
    { clip: 63, bgOpacity: 0.59,  sunOpacity: 0.3,  heatOpacity: 0.01 },
    { clip: 69, bgOpacity: 0.53, sunOpacity: 0.25, heatOpacity: 0.005},
    { clip: 76, bgOpacity: 0.48,  sunOpacity: 0.2,  heatOpacity: 0},
    { clip: 87, bgOpacity: 0.41, sunOpacity: 0.15, heatOpacity: 0},
    { clip: 95, bgOpacity: 0.35, sunOpacity: 0.12, heatOpacity: 0},
    { clip: 100, bgOpacity: 0.3, sunOpacity: 0.11, heatOpacity: 0},
];
const TOTAL_STEPS = steps.length;
let idleTimer = null;
const IDLE_TIMEOUT = 2500;
function clearIdleTimer() {
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
}
function startIdleTimer() {
  clearIdleTimer();
  idleTimer = setTimeout(() => {
    document.body.removeEventListener("click", handleReveal);
    autoCompleteSteps();
  }, IDLE_TIMEOUT);
}
function autoCompleteSteps() {
    if (step >= TOTAL_STEPS) return;
    const { clip, bgOpacity, sunOpacity, heatOpacity} = steps[step];
    step++;
    cover.style.clipPath = `inset(0% 0% ${clip}% 0%)`;
    bg.style.opacity = bgOpacity;
    sun.style.opacity = sunOpacity;
    gsap.set('.heat', { opacity: heatOpacity });
    gsap.set('.wave', { opacity: heatOpacity });  
    gsap.set('.sun-screen-layer', { opacity: sunOpacity });   
    if (step < TOTAL_STEPS) {
        // Stagger each auto-step by 120ms for a smooth sweep effect        
        setTimeout(autoCompleteSteps, 80);
    } else {
        setTimeout(playFrame2, 500);
        gsap.to("#closeBigBtn", { opacity: 1, duration: 0.5, ease: "power2.out" },)
        document.querySelector(".wave").style.animation = "unset";
    }
}
function handleReveal(e) {
    if (step >= TOTAL_STEPS) return;
    clearIdleTimer();
    const { clip, bgOpacity, sunOpacity, heatOpacity, bgBlur} = steps[step];
    step++;
    cover.style.clipPath = `inset(0% 0% ${clip}% 0%)`;
    bg.style.opacity = bgOpacity;
    sun.style.opacity = sunOpacity;
    gsap.set('.heat', { opacity: heatOpacity });
    gsap.set('.wave', { opacity: heatOpacity });
    gsap.set('.sun-screen-layer', { opacity: sunOpacity });  
    if (step === TOTAL_STEPS) {
        document.body.removeEventListener("click", handleReveal);
        setTimeout(playFrame2, 500);
        document.querySelector(".wave").style.animation = "unset";
    }
    else {
         startIdleTimer();
    }
    handleSplash();
}
function playSunflare(){
    gsap.to(".sun-screen-layer",{duration:1.5,opacity:0.6,ease:"sine.inOut",repeat:10,yoyo:true});
}
function closeCatfish() {
  setCollapseCatfish();
  gsap.to("#catfish", { y: 300, duration: 0.8, ease: "power2.out" });
  gsap.set("#catfish", { display: "none", delay: 1 });
}
myFT.on("expand", function () {});
myFT.contract = function () {};

function frame1Start() {
  gsap.registerPlugin(MotionPathPlugin);
  if (isMobile) {
    console.log("dno");
    gsap.to(".sun", { duration: 2, ease: "power2.out", motionPath: { path: "#motionPathM", align: "#motionPathM", alignOrigin: [0.5, 0.5]},onComplete:playSunflare});
    
  } else {
    console.log("pc");
    gsap.to(".sun", { duration: 2, ease: "power2.out", motionPath: { path: "#motionPathPc", align: "#motionPathPc", alignOrigin: [0.5, 0.5]},onComplete:playSunflare});
   }

  const f1Start = gsap.timeline({
    delay: 2,
    onComplete: function () {
      document.body.addEventListener("click", handleReveal);
      startIdleTimer();
    },
  });
  f1Start.to('.reveal-wrap',{opacity:1,duration:0.5,ease:'power2.out'})
    .to('.frame1-text',{opacity:1,duration:0.5,ease:'power2.out'})
    .to('.frame1-cta',{opacity:1,duration:0.5,ease:'power2.out'})
}

const container = document.getElementById("splash-container");
function handleSplash() {
  const rect = container.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  // randomize every click
  const size = isMobile ? 220 : 320 + Math.random() * 160; // 180–340px
  const rot = Math.random() * 360; // random rotation
  const flipX = Math.random() < 0.5 ? -1 : 1; // horizontal mirror
  const flipY = Math.random() < 0.3 ? -1 : 1; // occasional vertical flip
  const dur = 0.55 + Math.random() * 0.35; // 0.55–0.9s
  const img = document.createElement("img");
  img.src = "water-splash.png"; // 👈 replace with your image
  img.className = "splash";
  img.style.width = size + "px";
  img.style.height = size + "px";
  img.style.left = (cx - size / 2 + (Math.random() - 0.5) * cx) + "px";
  img.style.top  = (cy - size / 2 + (Math.random() - 0.5) * cy) + "px";
  img.style.setProperty("--t", `rotate(${rot}deg) scale(${flipX}, ${flipY})`);
  img.style.setProperty("--dur", dur + "s");
  container.appendChild(img);
  img.addEventListener("animationend", () => img.remove());
}
window.onload = function () {
  const swaps = Object.entries(ASSETS).map(([cls, src]) => {
    const el = document.querySelector(`.${cls}`);
    if (!el) return Promise.resolve();
    el.src = src;
    if (el.complete) return Promise.resolve();
    return new Promise((resolve) => {
      el.onload = resolve;
      el.onerror = resolve; // don't block on broken images
    });
  });

  Promise.all(swaps).then(() => {
    frame1Start();
    document.querySelector("#closeBtn").addEventListener("click", closeCatfish);
     document.querySelector("#closeBigBtn").addEventListener("click",  () => handleCollapseFull("user"));
    document.body.addEventListener("click", function (e) {
      triggerEffect(e.clientX, e.clientY);
    });
  });
};
