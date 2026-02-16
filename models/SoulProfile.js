const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    element: String,
    zodiac: String,
    abjadScore: Number,
    urduName: String,
    date: { type: Date, default: Date.now }
});

mongoose.model('soulProfiles', profileSchema);