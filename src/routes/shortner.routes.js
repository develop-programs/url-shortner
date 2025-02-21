import Express from "express";
import Url from "../models/url.model.js";
import crypto from "crypto";

const shortRoutes = Express.Router();

shortRoutes.get("/data", async (_, res) => {
  try {
    const data = await Url.find();
    res.json(data).status(200);
  } catch (error) {
    console.error("Error in /shorten:", error);
    res.status(500).json({ error: "Server error" });
  }
});

shortRoutes.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    let formattedUrl = url;
    try {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        formattedUrl = "https://" + url;
      }
      new URL(formattedUrl);
    } catch (err) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    let urlDoc = await Url.findOne({ originalUrl: formattedUrl });
    if (urlDoc) {
      return res.json({
        shortUrl: `${req.protocol}://${req.get("host")}/api/${urlDoc.redirectURL}`,
      });
    }

    const redirectURL = crypto.randomBytes(4).toString("hex");

    urlDoc = await Url.create({
      originalUrl: formattedUrl,
      redirectURL: redirectURL,
      visited: [Date.now()],
    });

    res.json({
      shortUrl: `${req.protocol}://${req.get("host")}/api/${redirectURL}`,
    });
  } catch (error) {
    console.error("Error in /shorten:", error);
    res.status(500).json({ error: "Server error" });
  }
});

shortRoutes.get("/:code", async (req, res) => {
  try {
    const urlDoc = await Url.findOne({ redirectURL: req.params.code });
    if (!urlDoc) {
      return res.status(404).render("error", { message: "URL not found" });
    }

    await Url.updateOne(
      { redirectURL: req.params.code },
      { $push: { visited: Date.now() } }
    );

    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    console.error("Error in redirect:", error);
    res.status(500).render("error", { message: "Server error" });
  }
});

export default shortRoutes;
