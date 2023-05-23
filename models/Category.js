const mongoose = require("mongoose");
const slugify = require('slugify');

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true}
})

categorySchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        strict: true,
        lower: true
    });
    next();
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;