
const express = require('express');
const Joi = require('joi');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation schema
const postSchema = Joi.object({
  title: Joi.string().required(),
  titleNp: Joi.string().allow(''),
  excerpt: Joi.string().required(),
  excerptNp: Joi.string().allow(''),
  content: Joi.array().items(Joi.object({
    id: Joi.string(),
    type: Joi.string().valid('text', 'image', 'video', 'quote', 'heading'),
    content: Joi.string(),
    order: Joi.number()
  })),
  contentNp: Joi.array().items(Joi.object({
    id: Joi.string(),
    type: Joi.string().valid('text', 'image', 'video', 'quote', 'heading'),
    content: Joi.string(),
    order: Joi.number()
  })),
  category: Joi.string().required(),
  images: Joi.array().items(Joi.object({
    id: Joi.string(),
    url: Joi.string(),
    alt: Joi.string(),
    position: Joi.string().valid('header', 'content', 'gallery'),
    order: Joi.number()
  })),
  author: Joi.string().required(),
  isPinned: Joi.boolean(),
  status: Joi.string().valid('draft', 'published', 'archived')
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { status, category, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM posts';
    let params = [];
    let conditions = [];

    if (status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }

    if (category) {
      conditions.push(`category = $${params.length + 1}`);
      params.push(category);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create new post
router.post('/', auth, async (req, res) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      title, titleNp, excerpt, excerptNp, content, contentNp,
      category, images, author, isPinned, status
    } = req.body;

    const result = await db.query(`
      INSERT INTO posts (
        title, title_np, excerpt, excerpt_np, content, content_np,
        category, images, author, is_pinned, status, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      title, titleNp || '', excerpt, excerptNp || '',
      JSON.stringify(content || []), JSON.stringify(contentNp || []),
      category, JSON.stringify(images || []), author,
      isPinned || false, status || 'draft', req.admin.adminId
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      title, titleNp, excerpt, excerptNp, content, contentNp,
      category, images, author, isPinned, status
    } = req.body;

    const result = await db.query(`
      UPDATE posts SET
        title = $1, title_np = $2, excerpt = $3, excerpt_np = $4,
        content = $5, content_np = $6, category = $7, images = $8,
        author = $9, is_pinned = $10, status = $11, updated_at = NOW()
      WHERE id = $12
      RETURNING *
    `, [
      title, titleNp || '', excerpt, excerptNp || '',
      JSON.stringify(content || []), JSON.stringify(contentNp || []),
      category, JSON.stringify(images || []), author,
      isPinned || false, status || 'draft', req.params.id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await db.query('DELETE FROM posts WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
