import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function Products({ onLogout }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // View State: "list" | "add" | "edit"
    const [view, setView] = useState("list");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await getProducts();
            const fetchedProducts = response.data || [];

            // Ascending sort sa ID: Para sa pinakababa/dulo mapunta ang bagong add
            const sortedProducts = [...fetchedProducts].sort(
                (a, b) => Number(a.id) - Number(b.id)
            );

            setProducts(sortedProducts);
        } catch (err) {
            console.error("PRODUCT ERROR:", err);
            setError(err.message || "Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    // Handle Add Product
    const handleAddProduct = async (formData) => {
        try {
            await createProduct(formData);
            await loadProducts();
            setView("list");
        } catch (err) {
            alert(err.message || "Failed to add product.");
        }
    };

    // Handle Edit Product
    const handleUpdateProduct = async (id, formData) => {
        try {
            await updateProduct(id, formData);
            await loadProducts();
            setView("list");
        } catch (err) {
            alert(err.message || "Failed to update product.");
        }
    };

    // Handle Delete Product
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                loadProducts();
            } catch (err) {
                alert(err.message || "Failed to delete product.");
            }
        }
    };

    const handleOpenEdit = (product) => {
        setSelectedProduct(product);
        setView("edit");
    };

    if (loading) {
        return (
            <div className="card-wrapper">
                <div className="products-card">
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card-wrapper">
                <div className="products-card">
                    <p className="error">{error}</p>
                </div>
            </div>
        );
    }

    if (view === "add") {
        return (
            <AddProduct
                onSave={handleAddProduct}
                onCancel={() => setView("list")}
            />
        );
    }

    if (view === "edit") {
        return (
            <EditProduct
                product={selectedProduct}
                onSave={handleUpdateProduct}
                onCancel={() => setView("list")}
            />
        );
    }

    return (
        <div className="card-wrapper">
            <div className="products-card">
                {/* Header Title */}
                <h1 className="welcome-title">Welcome to ProductViews</h1>
                <hr className="title-divider" />

                {/* Top Action Buttons */}
                <div className="action-bar">
                    <button className="btn-purple" onClick={() => setView("add")}>
                        + Add New Product
                    </button>
                    <button className="btn-logout-outline" onClick={onLogout}>
                        Logout
                    </button>
                </div>

                {/* Table View */}
                {products.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    <div className="table-container">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td className="font-semibold">{product.product_name}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            ₱
                                            {Number(product.price).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </td>
                                        <td>{product.quantity}</td>
                                        <td className="action-links">
                                            <button
                                                className="link-edit"
                                                onClick={() => handleOpenEdit(product)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="link-delete"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;