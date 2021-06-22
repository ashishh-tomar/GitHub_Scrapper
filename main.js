let url="https://github.com/topics";
const request=require("request");
const cheerio=require("cheerio");
const getReposPageHtml=require("./repospage");


request(url,cb);
function cb(err,response,html)
{
    if(err)
    {
        console.log("Error in line 9 inside cb function in main.js  -> "+err);
    }
    else
    {
        //console.log(html);
        topicLink(html);
    }
}

function topicLink(html)
{
        let $=cheerio.load(html);
        let linkArr=$(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<linkArr.length;i++)
        {
            let href=$(linkArr[i]).attr("href");
            let topic=href.split("/").pop();
            let fullLink=`https://github.com${href}`;
            //console.log(fullLink);
            getReposPageHtml(fullLink,topic);
        }
}