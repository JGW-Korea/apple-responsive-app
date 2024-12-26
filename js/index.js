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
