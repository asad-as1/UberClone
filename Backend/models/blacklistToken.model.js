const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d'   // ttl (time to live) for the token, after which it will be automatically removed
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);