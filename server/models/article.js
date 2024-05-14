const mongoose = require("../db");

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    // authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    authors: [{ type: String, required: true }],
    abstract: { type: String, required: true },
    keywords: [{ type: String }],
    publicationDate: { type: Date, default: Date.now },
    DOI: { type: String, required: true, unique: true },
    citation: { type: String },
    section: { type: String, required: true },
    status: { type: String, enum: ['submitted', 'under review', 'accepted', 'rejected'], default: 'submitted' },
    // reviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    revisions: [{ type: String }],
    fileUrl: { type: String, required: true }
});

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article