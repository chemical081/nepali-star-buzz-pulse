
const express = require('express');
const Joi = require('joi');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation schema
const storySchema = Joi.object({
  title: Joi.string().required(),
  type: Joi.string().valid('image', 'video').required(),
  url: Joi.string().uri().required(),
  thumbnail: Joi.string().uri().allow(''),
  duration: Joi.number().min(1).max(60).when('type', {
    is: 'video',
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  isActive: Joi.boolean()
});

// Get all stories
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    
    let query = 'SELECT * FROM stories';
    let params = [];

    if (active !== undefined) {
      query += ' WHERE is_active = $1';
      params.push(active === 'true');
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Create new story
router.post('/', auth, async (req, res) => {
  try {
    const { error } = storySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, type, url, thumbnail, duration, isActive } = req.body;

    const result = await db.query(`
      INSERT INTO stories (title, type, url, thumbnail, duration, is_active, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [title, type, url, thumbnail || null, duration || null, isActive !== false, req.admin.adminId]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ error: 'Failed to create story' });
  }
});

// Update story
router.put('/:id', auth, async (req, res) => {
  try {
    const { error } = storySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, type, url, thumbnail, duration, isActive } = req.body;

    const result = await db.query(`
      UPDATE stories SET
        title = $1, type = $2, url = $3, thumbnail = $4,
        duration = $5, is_active = $6, updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `, [title, type, url, thumbnail || null, duration || null, isActive !== false, req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update story error:', error);
    res.status(500).json({ error: 'Failed to update story' });
  }
});

// Delete story
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await db.query('DELETE FROM stories WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ error: 'Failed to delete story' });
  }
});

// Toggle story active status
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const result = await db.query(`
      UPDATE stories SET is_active = NOT is_active, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Toggle story error:', error);
    res.status(500).json({ error: 'Failed to toggle story status' });
  }
});

module.exports = router;
