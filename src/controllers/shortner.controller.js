import Url from '../models/url.model.js';
import { nanoid } from 'nanoid';
import { URL } from 'url';

// Generate short URL
export const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    
    // Validate URL
    try {
      new URL(longUrl);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }
    
    // Check if URL already exists in database
    const existingUrl = await Url.findOne({ longUrl });
    if (existingUrl) {
      return res.json(existingUrl);
    }
    
    // Create URL code and short URL
    const urlCode = nanoid(8);
    const baseUrl = process.env.BASE_URL || `http://${req.get('host')}`;
    const shortUrl = `${baseUrl}/${urlCode}`;
    
    // Create new URL entry
    const url = new Url({
      urlCode,
      longUrl,
      shortUrl,
      createdAt: new Date()
    });
    
    await url.save();
    res.json(url);
    
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Redirect to original URL
export const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ urlCode: code });
    
    if (!url) {
      return res.status(404).render('404', { title: 'URL Not Found' });
    }
    
    // Update click count
    url.clicks += 1;
    await url.save();
    
    return res.redirect(url.longUrl);
    
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all URLs (for dashboard)
export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error('Error getting URLs:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
