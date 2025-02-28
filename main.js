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
let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
);
const sideBar = document.querySelectorAll(".sidenav a");
sideBar.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let totalResults = 0;
let page = 1;
const pageSize = 10; //한 페이지에 표시하는 기사 갯수
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page); //=>$page=page
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    console.log("ddd", data);
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
  render();
  paginationRender();
};

const getLatestNews = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  console.log("uuu", url);
  await getNews();
};
getLatestNews();

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
  );
  await getNews();
};

const getNewsByCategorySide = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  await getNews();
};

const getNewsByKeyword = async (event) => {
  const keyword = document.querySelector("#search-input").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );
  await getNews();
};

const textLimit = (text, limit) => {
  if (!text) return "내용없음";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const render = () => {
  let newsHTML = newsList
    .map((news) => {
      const newsTitle = news.title ? news.title : "제목 없음";
      const urlImg = news.urlToImage
        ? news.urlToImage
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg-png";
      const newsSource = news.source.name ? news.source.name : "출처없음";
      const momentTime = news.publishedAt
        ? moment(news.publishedAt).fromNow()
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
    .join("");

  document.getElementById("news-stand").innerHTML = newsHTML;
};

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

const paginationRender = () => {
  // totalResult,
  // page
  // pageSize
  // groupSize
  //totalpages
  const totalPages = Math.ceil(totalResults / pageSize);
  // pageGroup
  const pageGroup = Math.ceil(page / groupSize); //내가 보고있는 페이지 그룹. 6페이지를 보고 있으면 2번째 그룹, 196페이지 4번째 그룹 19.1 = 20
  // lastPage
  let lastPage = pageGroup * groupSize; //196개 results, 그룹 4 * 5 = 20
  // lastPage<totalPages의 경우 페이지는 계속 넘어가고 마지막 기사가 계속 표시됨
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  // firstPage  그룹1의 마지막 페이지는 5, 5-(5-1) =1, 그룹2의 마지막 페이지는 10, 10-(5-1)=6 그룹2의 첫페이지는 6
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `<li class="page-item ${
    page === 1 ? "disabled" : ""
  }" onclick="moveToPage(1)"><a class="page-link" href="#"> << </a></li><li class="page-item  ${
    page === 1 ? "disabled" : ""
  }" onclick="moveToPage(${
    page === 1 ? page : page - 1 // page-1만 있으면 -1,-2 페이지로 계속 넘어감.
  })"><a class="page-link" href="#"> < </a></li> `; //previous 페이지 앞에 처음으로 아이콘 추가?

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  paginationHTML += `<li class="page-item ${
    page === totalPages ? "disabled" : ""
  }" onclick="moveToPage(${
    page === totalPages ? page : page + 1
  })"><a class="page-link" href="#"> > </a></li><li class="page-item ${
    page === totalPages ? "disabled" : ""
  }" onclick="moveToPage(${totalPages})"><a class="page-link" href="#"> >> </a></li>`; //next아이콘 뒤에 마지막으로 아이콘 추가? for문 끝나고 나서 html에 붙혀주기 전에 next 넣는다.
  document.querySelector(".pagination").innerHTML = paginationHTML;

  //첫페이지와 마지막 페이지로 가게 만드는 코드. for문 추가? 근데 위에 이전,다음 페이지에 아이콘을 추가하게 되면 새로운 for문은 필요 없을껀데
  //moveToLast&firstPage 함수 필요? 필요없어 보임.?

  // <nav aria-label="Page navigation example">
  // <ul class="pagination">
  // <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  // <li class="page-item"><a class="page-link" href="#">1</a></li>
  // <li class="page-item"><a class="page-link" href="#">2</a></li>
  // <li class="page-item"><a class="page-link" href="#">3</a></li>
  // <li class="page-item"><a class="page-link" href="#">Next</a></li>
  // </ul>
  // </nav>
};
const moveToPage = (pageNum) => {
  console.log("moveToPage", pageNum);
  page = pageNum;
  getNews();
};

/* try(
  소스 코드
  이안에 에러가 발생하면 
 )catch(){
 catch가 에러를 잡는다
 }*/

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
  </div>`;

  document.getElementById("news-stand").innerHTML = errorHTML;
};

//totalResult -> 주어짐, pagesize/page/groupsize -> 정함,
//
// 계산 : totalpage = Math.ceil(tR/ps)
//       pagegroup=math.ceil(page/groupsize)
//       마지막 = pagegroup*groupsize, 첫번째=마지막-(gs-1) 첫~막 -> render
