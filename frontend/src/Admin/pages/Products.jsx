import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export default function Products() {
    const [isValid, setIsValid] = useState(false);
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);

    // Fetch Categories
    const getCat = useCallback(async () => {
        try {
            const res = await axios.get("http://127.0.0.1:3030/Category");
            if (res.status === 200) {
                const data = [{ categoryName: "Select Category" }, ...res.data.result];
                setCategory(data);
            } else {
                setCategory([]);
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("Error fetching categories");
        }
    }, []);

    // Fetch Products
    const getProducts = useCallback(async () => {
        try {
            const res = await axios.get("http://127.0.0.1:3030/Products");
            if (res.status === 200) {
                setProducts(res.data.products);
                // console.log(res)
            } else {
                setProducts([]);
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("Error fetching products");
        }
    }, []);

    useEffect(() => {
        getCat();
        getProducts();
    }, [getCat, getProducts]);

    // Formik Setup
    const formik = useFormik({
        initialValues: {
            id: Date.now().toString(), // Auto-generate ID
            productName: '',
            price: '',
            description: '',
            category: '',
            stock: false,
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            image5: null
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                formData.append("id", values.id);
                formData.append("productName", values.productName);
                formData.append("price", values.price);
                formData.append("description", values.description);
                formData.append("category", values.category);
                formData.append("stock", values.stock);
                formData.append("image1", values.image1);
                formData.append("image2", values.image2);
                formData.append("image3", values.image3);
                formData.append("image4", values.image4);
                formData.append("image5", values.image5);
                


                const res = await axios.post("http://127.0.0.1:3030/regProduct", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (res.status === 200) {
                    toast.success("Product registered successfully!");
                    resetForm({ values: { ...formik.initialValues, id: Date.now().toString() } });
                    setIsValid(false);
                    getProducts();
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error("Error submitting product");
            }
        }
    });
    const handleDelete = async (id)=>{

      try{

            const res = await axios.delete(`http://127.0.0.1:3030/DeleteProduct/${id}`)

            if(res.status == 200){
                toast.success(res.data.message)
                getProducts()
            }
            else{
                toast.error(res.data.message)
            }

      }catch(err){
         console.log(err)
      }
    }

    console.log(products)
    return (
        <div className="container mt-4">
            {/* Add Product Button */}
            <button className="btn btn-primary mb-3" onClick={() => setIsValid(!isValid)}>
                {isValid ? "Close Form" : "Add Product"}
            </button>

            {/* Product Form */}
            {isValid && (
                <div className="card p-3 mb-3 shadow">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Product ID</label>
                                <input type="text" className="form-control" name="id" value={formik.values.id} readOnly />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Product Name</label>
                                <input type="text" className="form-control" name="productName"
                                    value={formik.values.productName} onChange={formik.handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Price</label>
                                <input type="text" className="form-control" name="price"
                                    value={formik.values.price} onChange={formik.handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-control" name="description"
                                    value={formik.values.description} onChange={formik.handleChange} required />
                            </div>

                            {/* Category Select */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Category</label>
                                <select className="form-select" name="category"
                                    value={formik.values.category} onChange={formik.handleChange}>
                                    {category.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Stock Toggle */}
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="toggleSwitch"
                                        name="stock" checked={formik.values.stock} onChange={formik.handleChange} />
                                    <label className="form-check-label ms-2" htmlFor="toggleSwitch">
                                        In Stock
                                    </label>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Upload Image</label>
                                <input type="file" className="form-control" name="image1"
                                    accept="image/*" onChange={(e) => formik.setFieldValue("image1", e.target.files[0])} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Upload Image</label>
                                <input type="file" className="form-control" name="image1"
                                    accept="image/*" onChange={(e) => formik.setFieldValue("image2", e.target.files[0])} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Upload Image</label>
                                <input type="file" className="form-control" name="image1"
                                    accept="image/*" onChange={(e) => formik.setFieldValue("image3", e.target.files[0])} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Upload Image</label>
                                <input type="file" className="form-control" name="image1"
                                    accept="image/*" onChange={(e) => formik.setFieldValue("image4", e.target.files[0])} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Upload Image</label>
                                <input type="file" className="form-control" name="image1"
                                    accept="image/*" onChange={(e) => formik.setFieldValue("image5", e.target.files[0])} required />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-success w-100">Add Product</button>
                    </form>
                </div>
            )}

            {/* Products Table */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Image</th>
                            <th>Actions</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.productName}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.stock ? "Available" : "Out of Stock"}</td>
                                    <td>
                                        <img src={product.images
[0]} alt="Product" width="80px" className="rounded"/>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-2">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(product.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" checked={product.stock} />
                                            <label className="form-check-label">Active</label>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8" className="text-center">No Products Found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
