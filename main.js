const API_KEY = `76e5be7d251b4727a1f3145b3b7ba09c`
let news = [];
const getLatestNews =async()=>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
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