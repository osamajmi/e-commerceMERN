import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export default function Banner() {
    const [isValid, setIsValid] = useState(false);
    const [banners, setBanners] = useState([]);

    const formik = useFormik({
        initialValues: {
            bannerTitle: '',
            bannerDescription: '',
            bannerImage: null, 
        },
        onSubmit: async (values,{resetForm}) => {
            try {
                const formData = new FormData();
                formData.append('bannerTitle', values.bannerTitle);
                formData.append('bannerDescription', values.bannerDescription);
                formData.append('bannerImage', values.bannerImage);

                const res = await axios.post("http://127.0.0.1:3030/Banner", formData);
                //console.log(res.data);
                if(res.status == 200){
                    resetForm()
                    toast.success(res.data.message);
                    getBanner()
                   
                }

               
            } catch (err) {
                console.error("Error uploading banner:", err);
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("bannerImage", file);
    };

    const getBanner =  useCallback(async () => {
        try{
            const res = await axios.get('http://127.0.0.1:3030/getAllBanner')
            if(res.status === 200){
                setBanners(res.data.result)
                
            }

        }
        catch(err){
            console.log(err)
        }
    }, []);
    const handeDelete = async (id)=>{
          
        try{
             
            const res = await axios.delete(`http://127.0.0.1:3030/deleteBanner/${id}`)
            console.log(res)

            if(res.status== 200){
                 toast.success(res.data.message)
                 getBanner()
            }
            else{
                toast.error(res.data.message)
                getBanner()
            }

        }
        catch(err){
            console.log(err)
        }
        

    }
    const isActive = async (e,id)=>{
        //console.log(e.target.checked)
       // console.log(id)

        try{
              
            const res = await axios.put(`http://127.0.0.1:3030/isActiveBanner/${id}`)
            if(res.status == 200){
                toast.success(res.data.message)
            }
            else{
                toast.error(res.data.message)
            }


        }catch(err){
            console.log(err)
        }
    }
    // getBanner()
 useEffect(()=>{
    getBanner()
 },[getBanner])

// console.log(banners)

    return (
        <>
            <button className="btn btn-primary mb-3" onClick={() => setIsValid(!isValid)}>
                Add Banner
            </button>

            {isValid && (
                <div id="bannerForm" className="card p-3 mb-3">
                    <form id="addBannerForm" onSubmit={formik.handleSubmit} >
                        <div className='d-flex flex-wrap '>
                                <div className="mb-2 ms-3">
                                    <label className="form-label">Banner Name</label>
                                    <input type="text" className="form-control" name="bannerTitle" onChange={formik.handleChange} required />
                                </div>
                                <div className="mb-2 ms-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" name="bannerDescription" onChange={formik.handleChange} required />
                                </div>
                                <div className="mb-2 ms-3">
                                    <label className="form-label">Upload Image</label>
                                    <input type="file" className="form-control" accept="image/*" name="bannerImage" onChange={handleFileChange} required />
                                </div>
                        </div>
                        {/* <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="toggleSwitch" />
                            <label className="form-check-label" htmlFor="toggleSwitch">Active</label>
                        </div> */}
                        <button type="submit" className="btn btn-success ms-3 w-25">Add Banner</button>
                    </form>
                </div>
            )}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="bannerTableBody">

                        {
                          
                          banners.map((item , index)=>
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.bannerTitle}</td>
                            <td>{item.bannerDescription}</td>
                            <td>
                                <img src={`http://127.0.0.1:3030/uploads/banners/${item.bannerImage}`} alt="" width={"100px"} />
                            </td>
                            <td>

                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="toggleSwitch"  onChange={(e)=>{isActive(e,item._id)}} />
                                <label className="form-check-label" htmlFor="toggleSwitch">{item.isActive == "true" ?"Active" : "inActive"}</label>
                            </div>
                            </td>
                            <td>
                           
                            
                            <button className="btn btn-danger btn-sm bi bi-trash"onClick={()=>{handeDelete(item._id)}} ></button>
                            </td>
                        </tr>
                          
                        )

                        }
                    
                </tbody>
            </table>
        </>
    );
}
