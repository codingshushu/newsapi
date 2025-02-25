const API_KEY = `76e5be7d251b4727a1f3145b3b7ba09c`
let news = [];
const getLatestNews =async()=>{
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
    console.log("uuu",url);
    const response = await fetch(url)
    const data = await response.json();
    console.log("rrr",response)
    news = data.articles;
    console.log("dddd",news);
}
getLatestNews();
for(let i = 0;i < 20; i++){
    console.log("after",i)
}