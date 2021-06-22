const request=require("request");
const cheerio=require("cheerio");
const getIssuesHtml=require("./issue");
function getReposPageHtml(url,topic)
{
    request(url,cb);
    function cb(err,response,html)
    {
        if(err)
        {
            console.log("Error in line 10 in repospage.js -> "+err);
        }
        else{
           getReposLink(html);
          // console.log(html);
        }
    }

    function getReposLink(html)
    {
        let $=cheerio.load(html);
        let headingsArr=$(".f3.color-text-secondary.text-normal.lh-condensed");
        console.log("--------------------------"+topic+"----------------------------");
        for(let i=0;i<8;i++)
        {
            let twoAnchors=$(headingsArr[i]).find("a");
            let link=$(twoAnchors[1]).attr("href");
            let fullLink=`https://github.com${link}/issues`;

            let repoName=link.split("/").pop();
            getIssuesHtml(fullLink,topic,repoName);
           //console.log(fullLink);
        }
    }
}


module.exports=getReposPageHtml;