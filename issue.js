const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const pdfkit=require("pdfkit");

function getIssuesHtml(url,topic,repoName)
{
    request(url,cb);
    function cb(err,response,html)
    {
        if(err)
        {
            console.log("Error in line 10 in repospage.js -> "+err);
        }
        else{
           //getReposLink(html);
          //console.log(html);

          getIssues(html);
        }
    }


    function getIssues(html)
    {
        let $=cheerio.load(html);
        let issuesArr=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr=[];
        //console.log(issuesArr.length);
        for(let i=0;i<issuesArr.length;i++)
        {
            let link=$(issuesArr[i]).attr("href");
           // console.log(link);
            arr.push(link);
        }

        let folderPath=path.join(__dirname,topic)
        dirCreator(folderPath);
        let filePath=path.join(folderPath,repoName+".pdf");
        let text=JSON.stringify(arr);
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        //fs.writeFileSync(filePath,);
    }
}


function dirCreator(folderPath)
{
    if(fs.existsSync(folderPath)==false)
    {
        fs.mkdirSync(folderPath);
    }
}

module.exports=getIssuesHtml;