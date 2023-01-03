const https = require('https');

const getPage = (url) => {
  let data = [];
  var req = https.request(url, res => {
    res.on('data', _ => data.push(_))
    res.on('end', () => {return data.join();})
  });
  let response = req.end();
  return response;
}


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function scrape_hackernews_jobs() {
  let links = Array.from(document.links).reduce((output,link) => {link.href.includes('https://news.ycombinator.com/') || link.href.includes('javascript:void(0)') || link.href.includes('https://hn.algolia.com/') || output.push(link.href); return output;}, []);
  date = Date().toLocaleString();
  download(JSON.stringify(links), 'hacker news jobs @'+date+'.json', 'application/json');
}

export default scrape_hackernews_jobs;