// netlify/functions/api.js
import serverless from "serverless-http";
import app from "../../src/index"; // adjust path as needed

module.exports.handler = serverless(app);
