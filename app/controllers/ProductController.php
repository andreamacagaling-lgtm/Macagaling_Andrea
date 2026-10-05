<?php

defined('PREVENT_DIRECT_ACCESS') OR exit('No direct script access allowed');

class ProductController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        // Load API library
        $this->call->library('api');

        // Load Product model
        $this->call->model('ProductModel');
    }


    /*
    |--------------------------------------------------------------------------
    | GET ALL PRODUCTS
    |--------------------------------------------------------------------------
    */

    public function products()
    {
        $this->api->require_method('GET');

        // Authentication required
        $this->api->require_jwt();

        $products = $this->ProductModel->getAll();

        $this->api->respond([
            'message' => 'Products retrieved successfully.',
            'data'    => $products
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | GET SINGLE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function product($id)
    {
        $this->api->require_method('GET');

        // Authentication required
        $this->api->require_jwt();

        $id = (int) $id;

        $product = $this->ProductModel->getById($id);

        if (!$product) {
            $this->api->respond_error(
                'Product not found.',
                404
            );
        }

        $this->api->respond([
            'message' => 'Product retrieved successfully.',
            'data'    => $product
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | CREATE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function createProduct()
    {
        $this->api->require_method('POST');

        // Authentication required
        $this->api->require_jwt();

        $input = $this->api->body();

        $productName = trim($input['product_name'] ?? '');
        $description = trim($input['description'] ?? '');
        $price       = $input['price'] ?? null;
        $quantity    = $input['quantity'] ?? null;

        // Product name
        if ($productName === '') {
            $this->api->respond_error(
                'Product name is required.',
                400
            );
        }

        // Price
        if ($price === null || $price === '') {
            $this->api->respond_error(
                'Price is required.',
                400
            );
        }

        if (!is_numeric($price)) {
            $this->api->respond_error(
                'Price must be a number.',
                400
            );
        }

        // Quantity
        if ($quantity === null || $quantity === '') {
            $this->api->respond_error(
                'Quantity is required.',
                400
            );
        }

        if (!is_numeric($quantity)) {
            $this->api->respond_error(
                'Quantity must be a number.',
                400
            );
        }

        $data = [
            'product_name' => $productName,
            'description'  => $description,
            'price'        => number_format(
                (float) $price,
                2,
                '.',
                ''
            ),
            'quantity'     => (int) $quantity,
            'created_at'   => date('Y-m-d H:i:s')
        ];

        $id = $this->ProductModel->create($data);

        $this->api->respond([
            'message' => 'Product created successfully.',
            'id'      => $id
        ], 201);
    }


    /*
    |--------------------------------------------------------------------------
    | UPDATE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function updateProduct($id)
    {
        $this->api->require_method('PUT');

        // Authentication required
        $this->api->require_jwt();

        $id = (int) $id;

        // Check product
        $existing = $this->ProductModel->getById($id);

        if (!$existing) {
            $this->api->respond_error(
                'Product not found.',
                404
            );
        }

        $input = $this->api->body();

        $productName = trim($input['product_name'] ?? '');
        $description = trim($input['description'] ?? '');
        $price       = $input['price'] ?? null;
        $quantity    = $input['quantity'] ?? null;

        if ($productName === '') {
            $this->api->respond_error(
                'Product name is required.',
                400
            );
        }

        if ($price === null || $price === '') {
            $this->api->respond_error(
                'Price is required.',
                400
            );
        }

        if (!is_numeric($price)) {
            $this->api->respond_error(
                'Price must be a number.',
                400
            );
        }

        if ($quantity === null || $quantity === '') {
            $this->api->respond_error(
                'Quantity is required.',
                400
            );
        }

        if (!is_numeric($quantity)) {
            $this->api->respond_error(
                'Quantity must be a number.',
                400
            );
        }

        $data = [
            'product_name' => $productName,
            'description'  => $description,
            'price'        => number_format(
                (float) $price,
                2,
                '.',
                ''
            ),
            'quantity'     => (int) $quantity
        ];

        $this->ProductModel->updateProduct(
            $id,
            $data
        );

        $this->api->respond([
            'message' => 'Product updated successfully.'
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | DELETE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function deleteProduct($id)
    {
        $this->api->require_method('DELETE');

        // Authentication required
        $this->api->require_jwt();

        $id = (int) $id;

        // Check product
        $existing = $this->ProductModel->getById($id);

        if (!$existing) {
            $this->api->respond_error(
                'Product not found.',
                404
            );
        }

        $this->ProductModel->deleteProduct($id);

        $this->api->respond([
            'message' => 'Product deleted successfully.'
        ]);
    }
}