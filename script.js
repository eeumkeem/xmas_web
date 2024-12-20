

const lyricsContainer = document.getElementById("lyrics");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const popupOverlay = document.getElementById("popup-overlay");
const retryBtn = document.getElementById("retry-btn");

let currentIndex = 0;
let currentSection = 0;

// 배경 음악(징글벨)
const bgMusic = new Audio("assets/music/Jingle-Bells.mp3");
bgMusic.loop = true;

// 효과음
const correctSound = new Audio("assets/sound/correct.mp3");
const wrongSound = new Audio("assets/sound/wrong.mp3");

// 각 줄(장)을 별도의 배열로 구성
const sections = [
  // 1장: "흰눈 사이로 썰매를 타고"
  [
    { char: "ㅎ", text: "흰" },
    { char: "ㄴ", text: "눈" },
    { char: "ㅅ", text: "사" },
    { char: "ㅇ", text: "이" },
    { char: "ㄹ", text: "로" },
    { char: "ㅆ", text: "썰" },
    { char: "ㅁ", text: "매" },
    { char: "ㄹ", text: "를" },
    { char: "ㅌ", text: "타" },
    { char: "ㄱ", text: "고" }
  ],
  // 2장: "달리는 기분 상쾌도 하다"
  [
    { char: "ㄷ", text: "달" },
    { char: "ㄹ", text: "리" },
    { char: "ㄴ", text: "는" },
    { char: "ㄱ", text: "기" },
    { char: "ㅂ", text: "분" },
    { char: "ㅅ", text: "상" },
    { char: "ㅋ", text: "쾌" },
    { char: "ㄷ", text: "도" },
    { char: "ㅎ", text: "하" },
    { char: "ㄷ", text: "다" }
  ],
  // 3장: "종이 울려서 장단 맞추니"
  [
    { char: "ㅈ", text: "종" },
    { char: "ㅇ", text: "이" },
    { char: "ㅇ", text: "울" },
    { char: "ㄹ", text: "려" },
    { char: "ㅅ", text: "서" },
    { char: "ㅈ", text: "장" },
    { char: "ㄷ", text: "단" },
    { char: "ㅁ", text: "맞" },
    { char: "ㅊ", text: "추" },
    { char: "ㄴ", text: "니" }
  ],
  // 4장: "흥겨워서 소리높여 노래 부르자"
  [
    { char: "ㅎ", text: "흥" },
    { char: "ㄱ", text: "겨" },
    { char: "ㅇ", text: "워" },
    { char: "ㅅ", text: "서" },
    { char: "ㅅ", text: "소" },
    { char: "ㄹ", text: "리" },
    { char: "ㄴ", text: "높" },
    { char: "ㅇ", text: "여" },
    { char: "ㄴ", text: "노" },
    { char: "ㄹ", text: "래" },
    { char: "ㅂ", text: "부" },
    { char: "ㄹ", text: "르" },
    { char: "ㅈ", text: "자" }
  ],
  // 5장: "종소리 울려라 종소리 울려"
  [
    { char: "ㅈ", text: "종" },
    { char: "ㅅ", text: "소" },
    { char: "ㄹ", text: "리" },
    { char: "ㅇ", text: "울" },
    { char: "ㄹ", text: "려" },
    { char: "ㄹ", text: "라" },
    { char: "ㅈ", text: "종" },
    { char: "ㅅ", text: "소" },
    { char: "ㄹ", text: "리" },
    { char: "ㅇ", text: "울" },
    { char: "ㄹ", text: "려" }
  ],
  // 6장: "우리 썰매 빨리 달려 종소리 울려라"
  [
    { char: "ㅇ", text: "우" },
    { char: "ㄹ", text: "리" },
    { char: "ㅆ", text: "썰" },
    { char: "ㅁ", text: "매" },
    { char: "ㅃ", text: "빨" },
    { char: "ㄹ", text: "리" },
    { char: "ㄷ", text: "달" },
    { char: "ㄹ", text: "려" },
    { char: "ㅈ", text: "종" },
    { char: "ㅅ", text: "소" },
    { char: "ㄹ", text: "리" },
    { char: "ㅇ", text: "울" },
    { char: "ㄹ", text: "려" },
    { char: "ㄹ", text: "라" }
  ],
  // 7장: "종소리 울려라 종소리 울려" (반복)
  [
    { char: "ㅈ", text: "종" },
    { char: "ㅅ", text: "소" },
    { char: "ㄹ", text: "리" },
    { char: "ㅇ", text: "울" },
    { char: "ㄹ", text: "려" },
    { char: "ㄹ", text: "라" },
    { char: "ㅈ", text: "종" },
    { char: "ㅅ", text: "소" },
    { char: "ㄹ", text: "리" },
    { char: "ㅇ", text: "울" },
    { char: "ㄹ", text: "려" }
  ],
  // 8장: "기쁜 노래 부르면서 빨리 달리자"
  [
    { char: "ㄱ", text: "기" },
    { char: "ㅃ", text: "쁜" },
    { char: "ㄴ", text: "노" },
    { char: "ㄹ", text: "래" },
    { char: "ㅂ", text: "부" },
    { char: "ㄹ", text: "르" },
    { char: "ㅁ", text: "면" },
    { char: "ㅅ", text: "서" },
    { char: "ㅃ", text: "빨" },
    { char: "ㄹ", text: "리" },
    { char: "ㄷ", text: "달" },
    { char: "ㄹ", text: "리" },
    { char: "ㅈ", text: "자" }
  ]
];

function renderSection(index) {
  lyricsContainer.innerHTML = "";
  lyricsContainer.style.display = "block";
  lyricsContainer.style.flexWrap = "";
  lyricsContainer.style.justifyContent = "";
  lyricsContainer.style.gap = "";
  lyricsContainer.style.padding = "";

  const paragraph = document.createElement('p');

  sections[index].forEach((item, i) => {
    const span = document.createElement('span');
    span.dataset.char = item.char;
    span.textContent = item.text;
    paragraph.appendChild(span);

    // 마지막 글자가 아니라면 공백 추가
    if (i < sections[index].length - 1) {
      paragraph.appendChild(document.createTextNode(' '));
    }
  });

  lyricsContainer.appendChild(paragraph);
}

// 시작하기 버튼
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none"; 
  lyricsContainer.style.display = "block"; 
  currentIndex = 0;
  currentSection = 0;
  renderSection(0);

  // 징글벨 음악 재생
  bgMusic.play().catch(() => {
    alert("음악 재생을 위해 화면을 클릭해주세요!");
    document.addEventListener("click", () => bgMusic.play(), { once: true });
  });
});

// 다시 하기 버튼
retryBtn.addEventListener("click", () => {
  currentIndex = 0;
  currentSection = 0;
  popupOverlay.style.display = "none";
  startScreen.style.display = "flex";
  lyricsContainer.style.display = "none";
  bgMusic.pause();
  bgMusic.currentTime = 0;
});

// 키입력 이벤트
document.addEventListener("keydown", (event) => {
  if (lyricsContainer.style.display === "none" || popupOverlay.style.display === "block") return;

  const lyrics = document.querySelectorAll("#lyrics span");
  const currentSpan = lyrics[currentIndex];
  const expectedChar = currentSpan?.dataset.char; 

  if (!expectedChar) return;

  // Shift키는 오류음 재생 안 함
  if (event.key === "Shift") {
    return;
  }

  if (event.key === expectedChar) {
    // 맞은 경우
    currentSpan.classList.add("correct");
    correctSound.currentTime = 0;
    correctSound.play();

    currentIndex++;
    if (currentIndex === lyrics.length) {
      currentSection++;
      if (currentSection < sections.length) {
        currentIndex = 0;
        renderSection(currentSection);
      } else {
        // 모든 섹션 완료 -> 팝업 표시
        lyricsContainer.style.display = "none";
        popupOverlay.style.display = "flex";
      }
    }
  } else {
    // 틀린 경우
    wrongSound.currentTime = 0;
    wrongSound.play();
  }
});
