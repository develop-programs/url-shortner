import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  longUrl: {
    type: String,
    required: true,
    trim: true
  },
  shortUrl: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clicks: {
    type: Number,
    default: 0
  }
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
