import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import Order from "./Order";




const Home = () => {

    

  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  // const [revenue, setRevenue] = useState([]);
  const stats = [
    { label: "Total Orders", value: order },
    { label: "Total Products", value: product},
    { label: "Total Users", value: user },
    { label: "Total Revenue", value: "$50K" },
  ];
  
  const getData = async () => {
     const url = "http://127.0.0.1:3030"
    try{

      const res = await axios.get("http://127.0.0.1:3030/getAllOrders")
         setOrder(res.data.length)
      const product = await axios.get("http://127.0.0.1:3030/products");
         setProduct(product.data.products.length)
       
      const user = await axios.get(`${url}/users`);
        setUser(user.data.length)
      // console.log(user.data.length)
  
    }
    catch(err){
      console.log(err)
    }
  
  }
  
  useEffect(()=>{
    getData()
  },[])
  
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {stat.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Recent Orders</Typography>
        <Card sx={{ mt: 2 }}>
          <CardContent>
             <Order />
          </CardContent>
        </Card>
        </Box>
    </Box>
  );
};

export default Home;