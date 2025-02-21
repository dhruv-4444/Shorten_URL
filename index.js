const express = require("express");
const urlRoute = require("./routes/url")
const { connectToMongoDB } = require("./connection")
const URL=require("./models/url")
const app = express();

const port = 8001;
//middleware
app.use(express.json())


connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("db connected"))


app.use("/url", urlRoute)
app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId
    const entry= await URL.findOneAndUpdate({
            shortId
    }, {
        $push: {
        visitHistory:{timeStamp: Date.now()},
        }
    })
    res.redirect(entry.redirectUrl)
    
})

app.listen(port, () => console.log(`server is started at ${port}`));
