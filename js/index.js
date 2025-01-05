import ipads from "../assets/data/ipads.js";

// Element 조작 클래스
class ElementOperation {
  constructor(el) {
    this.el = el;
  }

  containsElement(className) {
    return this.el.classList.contains(className);
  }

  showElement(className) {
    this.el.classList.add(className);
  }

  hideElement(className) {
    this.el.classList.remove(className);
  }
}

const basketStarterEl = document.querySelector(
  "header ul.menu > li.basket-starter"
);
const basketEl = basketStarterEl.querySelector(".basket");

const basketOperation = new ElementOperation(basketEl);

window.addEventListener("click", () => {
  basketOperation.hideElement("show");
});

// basket icon 영역 이벤트 핸들링
basketStarterEl.addEventListener("click", (event) => {
  event.stopPropagation();

  // basket 드롭 메뉴 태그에 show 클래스 속성값에 따른 클래스 속성 값 추가 또는 제거
  if (!basketOperation.containsElement("show")) {
    basketOperation.showElement("show");
  } else {
    basketOperation.hideElement("show");
  }
});

basketEl.addEventListener("click", (event) => {
  event.stopPropagation();
});

// 검색창 Script
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];

const searchStarterEl = headerEl.querySelector(".search-starter");
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");

const searchDelayEls = [...searchWrapEl.querySelectorAll(".autocompletes li")];
const searchInputEl = searchWrapEl.querySelector(
  ".textfield > input[type='text']"
);

const headerOperation = new ElementOperation(headerEl);

// Search Icon 이벤트 핸들러
searchStarterEl.addEventListener("click", () => {
  headerOperation.showElement("searching");
  document.documentElement.classList.add("fixed");

  headerMenuEls.reverse().forEach((element, idx) => {
    element.style.transitionDelay = (idx * 0.4) / headerMenuEls.length + "s";
  });

  searchDelayEls.forEach((element, idx) => {
    element.style.transitionDelay = (idx * 0.4) / searchDelayEls.length + "s";
  });

  // Transition을 통해 아직 요소가 나오지 않았기 때문에 setTimeout을 통해 요소가 출력 된 후 포커스하게 만든다.
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
});

searchCloserEl.addEventListener("click", () => {
  headerOperation.hideElement("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.forEach((element, idx) => {
    element.style.transitionDelay = (idx * 0.4) / headerMenuEls.length + "s";
  });

  searchDelayEls.forEach((element, idx) => {
    element.style.transitionDelay = (idx * 0.4) / searchDelayEls.length + "s";
  });

  searchInputEl.value = "";
});

searchShadowEl.addEventListener("click", () => {
  headerOperation.hideElement("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach((element, idx) => {
    element.style.transitionDelay = (idx * 0.4) / headerMenuEls.length + "s";
  });

  searchDelayEls.toReversed().forEach((element, idx) => {
    element.style.transitionDelay = (idx * 0.4) / searchDelayEls.length + "s";
  });

  searchInputEl.value = "";
});

// Sprite Image 애니메이션을 위한 background-position 값 계산
let [x, y] = [0, 0];
let frames = "";

for (let i = 0; i < 60; i++) {
  frames += `${((100 / 60) * i).toFixed(
    2
  )}% { background-position: ${x}px, ${y}px }`;

  // x 좌표 값이 Sprite Image의 마지막 위치에 도달할 경우
  if (x <= -500) {
    x = 0; // x 위치를 0으로 수정
    y -= 100; // y 위치를 100으로 수정
    continue;
  }

  // x 좌표를 계속 움직인다.
  x -= 100;
}

// Product 상품의 요소인 info가 가시성이 true일 때 보여짐 제어
const io = new IntersectionObserver((entries) => {
  // 관찰한 요소가 뷰포트에 노출되었을 경우에 show 클래스 속성 값을 추가한다.
  entries.forEach((entrie) => {
    // 요소가 관찰되지 않을 경우 아무런 조치를 취하지 않는다.
    if (!entrie.isIntersecting) {
      return;
    }

    const { target } = entrie;
    target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");

infoEls.forEach((element) => {
  io.observe(element);
});

// Video Tag - Controller
const videoEl = document.querySelector(".stage video");
const playerBtn = document.querySelector(".stage .controller-player");
const pauseBtn = document.querySelector(".stage .controller-pause");

playerBtn.addEventListener("click", () => {
  videoEl.play();
  playerBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", () => {
  videoEl.pause();
  playerBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// iPad Compare Data -> 요소 생성
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  // #1. item div 태그 생성
  const $itemEl = document.createElement("div");
  $itemEl.classList.add("item");

  // #2. thumbnail div 태그 생성
  const $thimbnail = document.createElement("div");
  $thimbnail.classList.add("thumbnail");

  const $thimbnailImage = document.createElement("img");
  $thimbnailImage.src = ipad.thumbnail;
  $thimbnailImage.alt = ipad.name;

  $thimbnail.appendChild($thimbnailImage);

  // #3. colors ul 태그 생성
  const $colorsUl = document.createElement("ul");
  $colorsUl.classList.add("colors");

  // #3-1. color li 태그 생성
  ipad.colors.forEach((color) => {
    const $colorList = document.createElement("li");
    $colorList.style.backgroundColor = color;

    $colorsUl.appendChild($colorList);
  });

  // #4. header 태그 생성
  const $productHeader = document.createElement("h3");
  $productHeader.classList.add("name");
  $productHeader.textContent = ipad.name;

  // #5. Tagline P 태그 생성
  const $taglineP = document.createElement("p");
  $taglineP.classList.add("tagline");
  $taglineP.innerHTML = ipad.tagline;

  // #6. Price p 태그 생성
  const $priceP = document.createElement("p");
  $priceP.classList.add("price");
  $priceP.textContent = `₩${ipad.price}부터`;

  // #7 버튼 생성
  const $btn = document.createElement("button");
  $btn.classList.add("btn");
  $btn.textContent = "구입하기";

  // #8. hreflink 생성
  const $a = document.createElement("a");
  $a.href = ipad.url;
  $a.textContent = "더 알아보기";
  $a.classList.add("link");

  $itemEl.append(
    $thimbnail,
    $colorsUl,
    $productHeader,
    $taglineP,
    $priceP,
    $btn,
    $a
  );

  itemsEl.appendChild($itemEl);
});
