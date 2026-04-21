
const cta1 = document.querySelector(".frame1-cta");
const cover = document.querySelector(".cover");
const bg = document.querySelector(".bg");
const sun = document.querySelector(".sun");
const product = document.querySelector(".real-img");
const catfishClick = document.querySelector("#catfishClick")
let step = 0;
const turb = document.getElementById("turb");
let t = 0,active=true;

function animateHeat() {
    if(!active)return;    
    t += 0.00005;
    turb.setAttribute("baseFrequency",`0.005 ${0.01+t}`);
    requestAnimationFrame(animateHeat);
}
function handleClickthrough() {
  myFT.clickTag();
}
function setCollapseFull(){
    console.log("run msg full")
    setTimeout(() => {
        window.top.postMessage({
            source: "kult",
            type: "text",
            value: "collapse_full",
        }, "*");
    }, 600);
}
function setCollapseCatfish(){
    console.log("run msg catfish")
    setTimeout(() => {
        window.top.postMessage({
            source: "kult",
            type: "text",
            value: "collapse_catfish",
        }, "*");
    }, 600);
}
function handleCollapseFull() {
  const collapse = gsap.timeline({onComplete:setCollapseFull, delay: 1.5 });
  collapse
    .to(".bg", { y: "110vh", duration: 0.5, ease: "power2.out" })
    .to(".cloud", { y: "130vh", duration: 0.5, ease: "power2.out" }, "<")
    .to(".heat, .heat-svg", { y: "130vh", duration: 0.5, ease: "power2.out" }, "<")
    .to(".stage", { y: "150vh", duration: 0.5, ease: "power2.out" }, "<")
    .to("#catfish", { y: 0, duration: 0.5, ease: "power2.out" })
    .set('.bg, .cloud, .stage',{opacity:0})    
    document.body.removeEventListener("click", handleClickthrough);
    catfishClick.addEventListener("click", handleClickthrough);
}

function playFrame2() {
  const mm = gsap.matchMedia();
  mm.add({ isMobile: "(max-width: 767px)", isTablet: "(min-width: 768px) and (max-width: 1024px)", isDesktop: "(min-width: 1025px)" }, (context) => {
    const { isMobile, isTablet, isDesktop } = context.conditions;
    const productX = isMobile ? -20 : isTablet ? -30 : "-8vw";
    const textY = isMobile ? 8 : isTablet ? 10 : "45vw";
    const tl = gsap.timeline({ onComplete: handleCollapseFull });
    tl.to(".frame1-text", { opacity: 0, duration: 0.5, ease: "power2.out" })
      .to(".frame1-cta", { opacity: 0, duration: 0.5, ease: "power2.out" },'<')
      .to(".real-img", { x: productX, duration: 0.6, ease: "power2.out" })
      .to(".frame2-text1", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(".frame2-text2", { opacity: 1, duration: 0.5, ease: "power2.out" });
  });
  document.body.addEventListener("click", handleClickthrough);
}

const ORANGE_IMAGES = ['./orange.png', './orangeslice.png'];
function createEl(tag, css) {
    const el = document.createElement(tag);
    el.style.cssText = css + ';pointer-events:none;z-index:9999;position:fixed;';
    document.body.appendChild(el);
    return el;
}
function animateOut(el, props) {
    gsap.to(el, { ...props, onComplete: () => el.remove() });
}
function spawnOranges(x, y) {
    const count =10;
    for (let i = 0; i < count; i++) {
        const size = 45 + Math.random() * 16;
        const img  = createEl('img', `
            left:${x - size / 2}px; top:${y - size / 2}px;
            width:${size}px; height:${size}px;
            object-fit:contain;
        `);
        img.src = ORANGE_IMAGES[Math.floor(Math.random() * ORANGE_IMAGES.length)];
        const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
        const dist  = 55 + Math.random() * 85;
        animateOut(img, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist - 15,
            rotation: (Math.random() - 0.5) * 600,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    }
}
function triggerEffect(x, y) {
    spawnOranges(x, y);
}
const steps = [
    { clip: 15, bgOpacity: 0.8,  sunOpacity: 0.8,  heatOpacity: 0.2 },
    { clip: 27, bgOpacity: 0.83,  sunOpacity: 0.7,  heatOpacity: 0.1 },
    { clip: 34, bgOpacity: 0.72,  sunOpacity: 0.6,  heatOpacity: 0.08},
    { clip: 41, bgOpacity: 0.6,  sunOpacity: 0.5,  heatOpacity: 0.06},
    { clip: 49, bgOpacity: 0.54,  sunOpacity: 0.4,  heatOpacity: 0.04},
    { clip: 56, bgOpacity: 0.46, sunOpacity: 0.35, heatOpacity: 0.02 },
    { clip: 63, bgOpacity: 0.4,  sunOpacity: 0.3,  heatOpacity: 0.01 },
    { clip: 69, bgOpacity: 0.35, sunOpacity: 0.25, heatOpacity: 0.005},
    { clip: 76, bgOpacity: 0.28,  sunOpacity: 0.2,  heatOpacity: 0},
    { clip: 87, bgOpacity: 0.20, sunOpacity: 0.15, heatOpacity: 0},
    { clip: 95, bgOpacity: 0.15, sunOpacity: 0.12, heatOpacity: 0},
    { clip: 100, bgOpacity: 0.14, sunOpacity: 0.11, heatOpacity: 0},
];
const TOTAL_STEPS = steps.length;
let idleTimer = null;
const IDLE_TIMEOUT = 3000; // 3 seconds
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
    const { clip, bgOpacity, sunOpacity, heatOpacity } = steps[step];
    step++;
    cover.style.clipPath = `inset(0% 0% ${clip}% 0%)`;
    bg.style.opacity = bgOpacity;
    sun.style.opacity = sunOpacity;
    gsap.set('.heat', { opacity: heatOpacity });
    gsap.set('.heat-svg', { opacity: heatOpacity });

    if (step < TOTAL_STEPS) {
        // Stagger each auto-step by 120ms for a smooth sweep effect
        setTimeout(autoCompleteSteps, 120);
    } else {
        setTimeout(playFrame2, 500);
    }
}
function handleReveal(e) {
    if (step >= TOTAL_STEPS) return;
    clearIdleTimer();
    const { clip, bgOpacity, sunOpacity, heatOpacity } = steps[step];
    step++;
    cover.style.clipPath = `inset(0% 0% ${clip}% 0%)`;
    bg.style.opacity = bgOpacity;
    sun.style.opacity = sunOpacity;
    gsap.set('.heat', { opacity: heatOpacity });
    gsap.set('.heat-svg', { opacity: heatOpacity });
    if (step === TOTAL_STEPS) {
        document.body.removeEventListener("click", handleReveal);
        setTimeout(playFrame2, 500);
    }
    // else {
    //      startIdleTimer();
    // }
    handleSplash();
}
function playSunflare(){
    gsap.to(".sun-screen-layer",{duration:1.5,opacity:0.6,ease:"sine.inOut",repeat:10,yoyo:true});
}
function closeCatfish(){
    setCollapseCatfish();
    gsap.to('#catfish',{y:300, duration:0.8,ease:'power2.out'})
    gsap.set('#catfish',{display:'none',delay:1})
}
myFT.on("expand", function(){});
myFT.contract = function(){};

function frame1Start() {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.to(".sun",{duration:2,ease:"power2.out",motionPath:{path:"#motionPath",align:"#motionPath",alignOrigin:[0.5,0.5]},onComplete:playSunflare});
    gsap.to('.heat',{opacity:1,duration:0.8,ease:'power2.in'})
    const f1Start = gsap.timeline({delay:2, onComplete:function(){
        document.body.addEventListener("click", handleReveal);
        // startIdleTimer();
    }});
    f1Start.to('.reveal-wrap',{opacity:1,duration:0.5,ease:'power2.out'})
    .to('.frame1-text',{opacity:1,duration:0.5,ease:'power2.out'})
    .to('.frame1-cta',{opacity:1,duration:0.5,ease:'power2.out'})
}
const container = document.getElementById('splash-container');
function handleSplash(){
  const rect = container.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  // randomize every click
  const size  = 250 + Math.random() * 160;      // 180–340px
  const rot   = Math.random() * 360;             // random rotation
  const flipX = Math.random() < 0.5 ? -1 : 1;   // horizontal mirror
  const flipY = Math.random() < 0.3 ? -1 : 1;   // occasional vertical flip
  const dur   = 0.55 + Math.random() * 0.35;     // 0.55–0.9s
  const img = document.createElement('img');
  img.src = 'water-splash.png';                   // 👈 replace with your image
  img.className = 'splash';
  img.style.width  = size + 'px';
  img.style.height = size + 'px';
  img.style.left = (cx - size/2 + (Math.random()-0.5)*80) + 'px'
  img.style.top    = Math.random(cy - size / 2) + 'px';
  img.style.setProperty('--t', `rotate(${rot}deg) scale(${flipX}, ${flipY})`);
  img.style.setProperty('--dur', dur + 's');

  container.appendChild(img);
  img.addEventListener('animationend', () => img.remove());
}
window.onload = function () {    
    frame1Start();
    animateHeat();
    document.querySelector('#closeBtn').addEventListener("click", closeCatfish);
    document.body.addEventListener("click", function(e) {
        triggerEffect(e.clientX, e.clientY);
    });
    
}
