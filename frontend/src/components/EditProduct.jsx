import { useState, useEffect } from "react";

function EditProduct({ product, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        product_name: "",
        description: "",
        price: "",
        quantity: ""
    });

    useEffect(() => {
        if (product) {
            setFormData({
                product_name: product.product_name || "",
                description: product.description || "",
                price: product.price || "",
                quantity: product.quantity || ""
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product.id, formData);
    };

    return (
        <div className="card-wrapper">
            <div className="products-card form-card">
                <h1 className="welcome-title">Edit Product</h1>
                <hr className="title-divider" />

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="product_name">Product Name</label>
                        <input
                            type="text"
                            id="product_name"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-purple">
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;