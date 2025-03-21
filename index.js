const express = require("express");
const path=require("path")
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");
const staticRouter=require("./routes/staticRouter")
const app = express();

const port = 8001;
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.set("views",path.resolve("./views"))



connectToMongoDB("mongodb+srv://jdhruv90235:dhruv1192003@cluster0.arbb3.mongodb.net/abc?retryWrites=true&w=majority&appName=Cluster0").then(() =>
  console.log("db connected")
);


app.use("/url", urlRoute);
app.use("/",staticRouter)
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timeStamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => console.log(`server is started at ${port}`));
