const express = require("express");
const URL = require("../models/url"); // Ensure you import the URL model

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      // Fetch all URLs from the database
      const allUrls = await URL.find(); // assuming URL is your model
  
      // Pass the URLs to the view (home.ejs)
      return res.render("home", { urls: allUrls || [] }); // Ensure urls is passed
    } catch (error) {
      console.error("Error fetching URLs:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
  
  

module.exports = router;
