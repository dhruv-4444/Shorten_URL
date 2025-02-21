const shortid=require("shortid")
const URL=require("../models/url")

async function handleGenerateNewShortUrl(req, res) {
    const shortId = shortid()
    const body = req.body;
    if (!body.url) return res.status(400).json({msg:"url is required"}); 


    const newUrl = new URL({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });
    await newUrl.save();  
    
return res.json({id:shortId})
    
}

async function handleGetAnalytics(req, res) {
    const shortId= req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({totalClicks:result.visitHistory.length, analytics:result.visitHistory})
}


module.exports={handleGenerateNewShortUrl,handleGetAnalytics}