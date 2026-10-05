<?php
defined('PREVENT_DIRECT_ACCESS') OR exit('No direct script access allowed');

/**
 * Model: ProductModel
 * 
 * Automatically generated via CLI.
 */
class ProductModel extends Model {
    protected $table = 'products';
    protected $primary_key = 'id';
    protected $fillable = [];
    protected $guarded = ['id'];

    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $stmt = $this->db->raw(
            "SELECT id, product_name, description, price, quantity, created_at
             FROM products
             ORDER BY id DESC"
        );

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    /*
    |--------------------------------------------------------------------------
    | GET SINGLE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function getById($id)
    {
        $stmt = $this->db->raw(
            "SELECT id, product_name, description, price, quantity, created_at
             FROM products
             WHERE id = ?
             LIMIT 1",
            [$id]
        );

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    /*
    |--------------------------------------------------------------------------
    | CREATE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function create($data)
    {
        $stmt = $this->db->raw(
            "INSERT INTO products
            (product_name, description, price, quantity, created_at)
            VALUES (?, ?, ?, ?, ?)",
            [
                $data['product_name'],
                $data['description'],
                $data['price'],
                $data['quantity'],
                $data['created_at']
            ]
        );

        return $this->db->last_insert_id();
    }


    /*
    |--------------------------------------------------------------------------
    | UPDATE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function updateProduct($id, $data)
    {
        $stmt = $this->db->raw(
            "UPDATE products
             SET product_name = ?,
                 description = ?,
                 price = ?,
                 quantity = ?
             WHERE id = ?",
            [
                $data['product_name'],
                $data['description'],
                $data['price'],
                $data['quantity'],
                $id
            ]
        );

        return $stmt->rowCount();
    }


    /*
    |--------------------------------------------------------------------------
    | DELETE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function deleteProduct($id)
    {
        $stmt = $this->db->raw(
            "DELETE FROM products
             WHERE id = ?",
            [$id]
        );

        return $stmt->rowCount();
    }
}