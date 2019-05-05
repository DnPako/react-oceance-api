const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    dateCreate: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateUpdate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);