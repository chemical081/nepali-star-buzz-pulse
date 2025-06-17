
const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation schema
const adminSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('super_admin', 'admin', 'editor').required(),
  permissions: Joi.array().items(Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    description: Joi.string()
  }))
});

// Get all admin users
router.get('/', auth, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, username, email, role, permissions, created_at, last_login, is_active
      FROM admin_users
      ORDER BY created_at DESC
    `);

    const admins = result.rows.map(admin => ({
      ...admin,
      permissions: JSON.parse(admin.permissions || '[]')
    }));

    res.json(admins);
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ error: 'Failed to fetch admin users' });
  }
});

// Create new admin user
router.post('/', auth, async (req, res) => {
  try {
    // Check if current user has permission to create admins
    if (req.admin.role !== 'super_admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const { error } = adminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password, role, permissions } = req.body;

    // Check if username or email already exists
    const existing = await db.query(
      'SELECT id FROM admin_users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await db.query(`
      INSERT INTO admin_users (username, email, password_hash, role, permissions, created_by)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, username, email, role, permissions, created_at, is_active
    `, [
      username, email, passwordHash, role,
      JSON.stringify(permissions || []), req.admin.adminId
    ]);

    const admin = result.rows[0];
    admin.permissions = JSON.parse(admin.permissions || '[]');

    res.status(201).json(admin);
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Failed to create admin user' });
  }
});

// Update admin user
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.admin.role !== 'super_admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const { username, email, role, permissions, isActive } = req.body;

    const result = await db.query(`
      UPDATE admin_users SET
        username = $1, email = $2, role = $3, permissions = $4, is_active = $5
      WHERE id = $6
      RETURNING id, username, email, role, permissions, created_at, is_active
    `, [username, email, role, JSON.stringify(permissions || []), isActive, req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    const admin = result.rows[0];
    admin.permissions = JSON.parse(admin.permissions || '[]');

    res.json(admin);
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ error: 'Failed to update admin user' });
  }
});

// Delete admin user
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.admin.role !== 'super_admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    // Prevent deleting self
    if (req.params.id === req.admin.adminId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const result = await db.query('DELETE FROM admin_users WHERE id = $1 RETURNING id', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    res.json({ message: 'Admin user deleted successfully' });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ error: 'Failed to delete admin user' });
  }
});

module.exports = router;
