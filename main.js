const API_KEY = `76e5be7d251b4727a1f3145b3b7ba09c`;
let newsList = [];
const openBox = document.getElementById("open-search-box");
openBox.addEventListener("click", openSearchBox);
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
const searchBtn = document.querySelector(".search-button");
searchBtn.addEventListener("click", (event) => getNewsByKeyword(event));
console.log("keyword", searchBtn);
// searchBtn.forEach(input=>input.addEventListener("click",(event)=>getNewsByKeyword(event)))

const getLatestNews = async () => {
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  console.log("uuu", url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("rrr", response);
  newsList = data.articles;
  render();
  console.log("dddd", newsList);
};
getLatestNews();

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("DDD", data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword = async (event) => {
  const keyword = document.querySelector("#search-input").value;
  console.log("keyword", keyword);
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("DDllD", data);
  newsList = data.articles;
  render();
};

const textLimit = (text, limit) => {
  if (!text) return "내용없음";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const render = () => {
    let newsHTML = newsList
    .map ( (news) => {
    const newsTitle= news.title ? news.title : "제목 없음" ;
    const urlImg = news. urlToImage
      ? news.urlToImage
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg-png";
    const newsSource = news. source. name ? news.source.name : "출처없음";
    const momentTime = news.publishedAt
      ? moment (news.publishedAt) .fromNow()
      : "날짜없음";

     return `<div class="row news-list">
   <div class="col-lg-4">
    <img class="news-img-size" src="${urlImg}"
  onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';"/>
  </div>
  <div class="col-lg-8">
  <h2>${newsTitle}</h2>
  <p>${textLimit(news.description, 200)} </p> 
  <div>
  ${newsSource} * ${momentTime}
  </div>
  </div> 
  </div>`;
  })
  .join ("");

  document.getElementById ("news-stand"). innerHTML = newsHTML;
};

// for(let i = 0;i < 20; i++){
//     console.log("after",i)
// }

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function openSearchBox() {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
}
