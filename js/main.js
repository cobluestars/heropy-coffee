/**
 * 검색창 제어
 */
// 검색창 요소(.search) 찾기.
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');
// 검색창 요소를 클릭하면 실행.
searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});
// 검색창 요소 내부 실제 input 요소에 포커스되면 실행.
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행.
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});


/**
 * 페이지 스크롤에 따른 요소 제어
 */
// 페이지 스크롤에 영향을 받는 요소들을 검색!
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
// 페이지에 스크롤 이벤트를 추가!
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌)
window.addEventListener('scroll', function () {
  // 페이지 스크롤 위치가 500px이 넘으면.
  if (window.scrollY > 500) {
    // Badge 요소 숨기기!
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 상단으로 이동 버튼 보이기!
    gsap.to(toTopEl, .6, {
      opacity: 1,
      x: 0
    });

  // 페이지 스크롤 위치가 500px이 넘지 않으면.
  } else {
    // Badge 요소 보이기!
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 상단으로 이동 버튼 숨기기!
    gsap.to(toTopEl, .6, {
      opacity: 0,
      x: 100
    });
  }
});
toTopEl.addEventListener('click', function () {
  gsap.to(window, .6, {
    scrollTo: 0
  });
});


/**
 * 순서대로 나타나는 기능
 */
// 나타날 요소(.fade-in)들을 찾기
const fadeEls = document.querySelectorAll('.visual .fade-in');
// 요소들을 하나씩 반복해서 처리!
fadeEls.forEach(function (fadeEl, index) {
  // 각 요소들을 순서대로(delay) 보여지게 함!
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 1, // 배열의 인덱스는 0부터 시작하므로 (index+1).
                            // * 1: .7보다 약간 느리게 보여줌.
    opacity: 1
  });
});

/* 5.4 추가. 이미지가 나타나는 순서를 반대로 하는 reverse 기능을 추가.*/

/*
function reverse() {
  const fadeEls = document.querySelectorAll('.visual .fade-in');
  const fadeElsArray = Array.from(fadeEls);
  const totalElements = fadeElsArray.length;

  // 우선 이미지 요소들을 모두 사라지게 한다.
  gsap.set(fadeElsArray, { opacity: 0 });

  //순서 반대로 하여 요소들 보이기.
  fadeElsArray.forEach(function (fadeEl, index) {
    const reverseIndex = totalElements - 1 - index; 
    
    //이미지 요소는 총 5개이고, 배열의 인덱스는 0, 1, 2, 3, 4이다. 이를 응용하여
    //(5 - 1 - 0) = 4, (5 - 1 - 1) = 3, (5 - 1 - 2) = 2,
    //(5 - 1 - 3) = 1, (5 - 1 - 4) = 0의 방법으로
    //각 요소들의 순서를 뒤집을 수 있다.

    gsap.to(fadeEl, 1, {
      delay: (reverseIndex + 1) * 1,
      opacity: 1
    });
  });
}
*/

/*
위 함수에 if - else 구문을 추가하여, 버튼 클릭시 이미지 요소들이 나타나는 순서를 뒤집고,
다시 한 번 버튼 클릭시 이미지 요소들이 나타나는 순서를 다시 뒤집어 
원래대로 나타내는 함수를 구현하면 다음과 같다.
5.5 */
/*
let isReversed = false; // isReversed 변수로 현재 순서가 반대인지, 원래대로인지를 알아낸다.

function reverse() {
  const fadeEls = document.querySelectorAll('.visual .fade-in');
  const fadeElsArray = Array.from(fadeEls);
  const totalElements = fadeElsArray.length;

  gsap.set(fadeElsArray, { opacity: 0 });

  fadeElsArray.forEach(function (fadeEl, index) {
    let reverseIndex;
      if (isReversed) {                             // isReversed가 true인 경우,
      reverseIndex = totalElements - 1 - index;     // 각 요소들의 순서는 96-99행의 방법으로 뒤집힌다.
    } else {                                        // isReversed가 false인 경우,
      reverseIndex = index;                         // 각 요소들은 순서대로 출력된다.
    }

    gsap.to(fadeEl, 1, {
      delay: (reverseIndex + 1) * 1,
      opacity: 1
    });
  });

  isReversed = !isReversed; //변수 isReversed 값을 true or false로 뒤집는다.
}
*/

/*
그러나 위의 함수의 경우,
페이지가 로딩되면서 나타나는 이미지 순서가 isReversed = false 기준이 아니라,
버튼이 처음으로 눌린 직후의 이미지 순서가 isReversed = false 기준이 된다.

페이지가 로딩되면서 나타나는 이미지 순서를  isReversed = false 기준으로,
버튼을 누르면 그 반대 순서로 이미지가 나타나게 하는 (isReversed = true이게 하는)
방법은 다음과 같다.
*/


let isReversed = false;

document.addEventListener('DOMContentLoaded', function () {
  FirstImage();
});


/*
DOMContentLoaded 이벤트 핸들러에 등록된 FirstImage()함수는 페이지가 로딩될 때 호출된다.
FirstImage()함수는 페이지가 로딩되면서 나타나는 이미지 순서를, isReversed = false 기준으로 결정한다.
*/


function FirstImage() {
  const fadeEls = document.querySelectorAll('.visual .fade-in');
  const fadeElsArray = Array.from(fadeEls);

  gsap.set(fadeElsArray, { opacity: 0 });

  fadeElsArray.forEach(function (fadeEl, index) {
    gsap.to(fadeEl, 1, {
      delay: (index + 1) * 1,
      opacity: 1
    });
  });
}

function reverse() {
  const fadeEls = document.querySelectorAll('.visual .fade-in');
  const fadeElsArray = Array.from(fadeEls);
  const totalElements = fadeElsArray.length;

  gsap.set(fadeElsArray, { opacity: 0 });

  fadeElsArray.forEach(function (fadeEl, index) {
    let targetIndex;
    if (!isReversed) {
      reverseIndex = totalElements - 1 - index;
    } else {
      reverseIndex = index;
    }
    gsap.to(fadeEl, 1, {
      delay: (reverseIndex + 1) * 1,
      opacity: 1
    });
  });

  isReversed = !isReversed;
}


/**
 * 슬라이드 요소 관리
 */
new Swiper('.notice .swiper', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
});
new Swiper('.promotion .swiper', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드 바뀜
  },
  loop: true, // 반복 재생 여부
  slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  pagination: { // 페이지 번호 사용
    el: '.promotion .swiper-pagination', // 페이지 번호 요소
    clickable: true // 사용자의 페이지 번호 제어 여부
  },
  navigation: { // 슬라이드 이전/다음 버튼 사용
    prevEl: '.promotion .swiper-button-prev', // 이전 버튼 요소
    nextEl: '.promotion .swiper-button-next' // 다음 버튼 요소
  }
});
new Swiper('.awards .swiper', {
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  navigation: { // 슬라이드 이전/다음 버튼 사용
    prevEl: '.awards .swiper-button-prev', // 이전 버튼 요소
    nextEl: '.awards .swiper-button-next' // 다음 버튼 요소
  }
});


/**
 * Promotion 슬라이드 토글 기능
 */
// 슬라이드 영역 요소 검색!
const promotionEl = document.querySelector('section.promotion');
// 슬라이드 영역를 토글하는 버튼 검색!
const promotionToggleBtn = document.querySelector('.toggle-promotion');

// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener('click', function () {
  if (promotionEl.classList.contains('hide')) {
    promotionEl.classList.remove('hide');
  } else {
    promotionEl.classList.add('hide');
  }
});


/**
 * 4차 수정 사항 - footer에 위치한 버튼 클릭 시 '준비 중입니다.' 알림창이 나옴.
 */
function ready(){
  alert("준비 중입니다.");
}

/**
 * footer에 위치한 세 버튼 중에 아무 버튼이나 클릭할 때, 세 버튼이 사라짐.
   그 대신 '히든 버튼'이 드러남. 
   '히든 버튼'을 클릭 시, '히든 버튼'은 사라지고 다시 세 버튼이 드러남.
 */

const button1 = document.getElementById("fadebutton1");
const button2 = document.getElementById("fadebutton2");
const button3 = document.getElementById("fadebutton3");
const hiddenbutton = document.getElementById("hiddenbutton");

window.onload = function() {
  hiddenbutton.style.display = "none"; //웹페이지 로딩 시 '히든 버튼'을 숨기는 기능을 한다.
};

function fade() { //세 버튼이 사라지고 히든 버튼을 드러나게 하는 함수 fade
  button1.style.display = "none";   // display 속성을 none으로 -> 보이지 않게 된다.
  button2.style.display = "none";
  button3.style.display = "none";
  hiddenbutton.style.display = "block"; // display 속성을 block으로 -> 보인다.
}

function display() { //히든 버튼이 사라지고 세 버튼이 드러나게 하는 함수 display
  hiddenbutton.style.display = "none";
  button1.style.display = "block";
  button2.style.display = "block";
  button3.style.display = "block";
}

button1.addEventListener("click", fade); //이벤트 핸들러로 클릭 시 함수 실행.
button2.addEventListener("click", fade);
button3.addEventListener("click", fade);
hiddenbutton.addEventListener("click", display);