import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export default function Category() {
    const [isValid, setIsValid] = useState(false);
    const [Category, setCategory] = useState([]);

    const formik = useFormik({
        initialValues: {
            Id: '',
            categoryName: '',
            
        },
        onSubmit: async (values,{resetForm}) => {
            try {

             //   console.log(values)
                const res = await axios.post("http://127.0.0.1:3030/createCategory",values)
                // console.log(res)
                if(res.status== 201){
                    toast.success(res.data.message)
                    resetForm()
                    getCategory()
               }
               else{
                   toast.error(res.data.message)
                   // getBanner()
                   getCategory()
               }
              
               
            } catch (err) {
                console.error("Error uploading banner:", err);
            }
        },
    });

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     formik.setFieldValue("bannerImage", file);
    // };

    const getCategory =  useCallback(async () => {
        try{
            const res = await axios.get('http://127.0.0.1:3030/Category')
            if(res.status === 200){
                setCategory(res.data.result)
                
            }

        }
        catch(err){
            console.log(err)
        }
    }, []);
    const handeDelete = async (id)=>{
          
        try{
             
            const res = await axios.delete(`http://127.0.0.1:3030/deleteCategory/${id}`)
            console.log(res)

            if(res.status== 200){
                 toast.success(res.data.message)
                //  getBanner()
                 getCategory()
            }
            else{
                toast.error(res.data.message)
                // getBanner()
                getCategory()
            }

        }
        catch(err){
            console.log(err)
        }
        

    }
   
 useEffect(()=>{
    getCategory()
 },[getCategory])

// console.log(banners)

    return (
        <>
            <button className="btn btn-primary mb-3" onClick={() => setIsValid(!isValid)}>
                Add Category
            </button>

            {isValid && (
                <div id="bannerForm" className="card p-3 mb-3">
                    <form id="addBannerForm" onSubmit={formik.handleSubmit} >
                        <div className='d-flex flex-wrap '>
                                <div className="mb-2 ms-3">
                                    <label className="form-label">Category Id</label>
                                    <input type="text" className="form-control" name="Id" onChange={formik.handleChange} required />
                                </div>
                                <div className="mb-2 ms-3">
                                    <label className="form-label">Category Name</label>
                                    <input type="text" className="form-control" name="categoryName" onChange={formik.handleChange} required />
                                </div>
                                    
                        </div>
                       
                        <button type="submit" className="btn btn-success ms-3 w-25">Add Category</button>
                    </form>
                </div>
            )}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="bannerTableBody">

                        {
                          
                          Category.map((item , index)=>
                        <tr>
                            
                            <td>{index+1}</td>
                            <td>{item.Id}</td>
                            <td>{item.categoryName}</td>

                            
                           
                            <td>
                            <button className="btn btn-primary btn-sm bi bi-pen me-2"></button>
                            
                            <button className="btn btn-danger btn-sm bi bi-trash"onClick={()=>{handeDelete(item.Id)}} ></button>
                            </td>
                        </tr>
                          
                        )

                        }
                    
                </tbody>
            </table>
        </>
    );
}
