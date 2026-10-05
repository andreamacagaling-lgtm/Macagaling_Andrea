<?php

defined('PREVENT_DIRECT_ACCESS') OR exit('No direct script access allowed');

/**
 * Model: UsersModel
 * 
 * Handles users table operations.
 */
class UsersModel extends Model
{
    protected $table = 'users';
    protected $primary_key = 'id';
    protected $fillable = [];
    protected $guarded = ['id'];

    public function __construct()
    {
        parent::__construct();
    }

    public function findByUsername($username)
    {
        $stmt = $this->db->raw(
            "SELECT id, username, email, password, role, created_at
             FROM users
             WHERE username = ?
             LIMIT 1",
            [$username]
        );

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findByEmail($email)
    {
        $stmt = $this->db->raw(
            "SELECT id, username, email, password, role, created_at
             FROM users
             WHERE email = ?
             LIMIT 1",
            [$email]
        );

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function usernameExists($username)
    {
        $stmt = $this->db->raw(
            "SELECT id
             FROM users
             WHERE username = ?
             LIMIT 1",
            [$username]
        );

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

    public function emailExists($email)
    {
        $stmt = $this->db->raw(
            "SELECT id
             FROM users
             WHERE email = ?
             LIMIT 1",
            [$email]
        );

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

    public function createUser($data)
    {
        $stmt = $this->db->raw(
            "INSERT INTO users
            (username, email, password, role, created_at)
            VALUES (?, ?, ?, ?, ?)",
            [
                $data['username'],
                $data['email'],
                $data['password'],
                $data['role'],
                $data['created_at']
            ]
        );

        return $this->db->last_insert_id();
    }

    public function findById($id)
    {
        $stmt = $this->db->raw(
            "SELECT id, username, email, role, created_at
             FROM users
             WHERE id = ?
             LIMIT 1",
            [$id]
        );

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}