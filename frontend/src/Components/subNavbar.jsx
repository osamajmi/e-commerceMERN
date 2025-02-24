import React, { useEffect, useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";

const HeaderMenu = () => {
  const [data, setCategories] = useState([]);
  const [category, setCategory] = useState("all"); 

  // ✅ Fetch Categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3030/Category");
     
      if (res.status === 200) {
        const categories = res.data.result || []; // Ensure it doesn't break
        setCategories([{ _id: "all", categoryName: "All Categories" }, ...categories]); // Add "All Categories"
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0",
        backgroundColor: "#f8f8f8",
        margin: "0 10px",
        // borderBottom: "1px solid #ddd",
      }}
    >
      {/* ✅ Categories Dropdown */}
      <FormControl sx={{ minWidth: 200 }}>
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{
          borderRadius: "20px",
          backgroundColor: "white",
          padding: "5px 10px",
          height: "30px",
          marginRight: "10px",
          outline: "none",
          "& fieldset": { border: "1px solidrgb(211, 157, 30)" },
        }}
      >
        {data.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.categoryName}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
    </Box>
  );
};

export default HeaderMenu;
