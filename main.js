const API_KEY = `76e5be7d251b4727a1f3145b3b7ba09c`
let newsList = [];


// categoryNews.addEventListener("click",getNewsByCategory);
// let allNews = document.querySelectorAll("news");

const getLatestNews =async()=>{
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    console.log("uuu",url);
    const response = await fetch(url)
    const data = await response.json();
    console.log("rrr",response)
    newsList = data.articles;
    render();
    console.log("dddd",newsList);
}
getLatestNews();


const render = () =>{
  const newsHTML = newsList.map(news=>
    `<div class ="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src="${news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" alt=""/>
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
          ${news.description == null || news.description == "" ? "내용없음" : news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description}
        </p>
        <div>
            ${news.source.name || "no source"} * (${moment(news.publishedAt).fromNow()})
        </div>
    </div>
</div>`).join("");
console.log("html",newsHTML);
  document.getElementById("news-stand").innerHTML = newsHTML;
}

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
  
  const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };


  // function render(){
  //   let resultHTML='';
  //   for(let i=0;i<news.length;i++){
  //     if(news[i]>0){
  //       resultHTML += `<div class ="row news">
  //           <div class="col-lg-4">
  //               <img class="news-img-size" src ="https://cdn.imweb.me/upload/S20220801dbacf13d10c9e/1f0c6c4c5761a.png"/>
  //           </div>
  //           <div class="col-lg-8">
  //               <h2>코딩 알려주는 누나</h2>
  //               <p>
  //                   스터디 참여
  //               </p>
  //               <div>
  //                   kbs * 2024 11.11
  //               </div>
  //           </div>
  //       </div>`
  //     }
  //   }
  // }
