import { Box, InputBase, MenuItem, Select, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [category, setCategory] = useState("all"); // Default category
  const [data, setCatdata] = useState([]);

  // Fetch Categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3030/Category");

      if (res.status === 200) {
        const categories = res.data.result || []; // Ensure it doesn't break
        setCatdata([{ _id: "all", categoryName: "All Categories" }, ...categories]); // Add "All Categories"
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
        alignItems: "center",
        width: "500px",
        height: "40px",
        borderRadius: "30px",
        backgroundColor: "#f8f8f8",
        padding: "5px 10px",
      }}
    >
      {/* Category Dropdown */}
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
          "& fieldset": { border: "1px solid #D0C6FC" },
        }}
      >
        {data.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.categoryName}
          </MenuItem>
        ))}
      </Select>

      {/* Search Input */}
      <InputBase
        placeholder="Search for more than 20,000 products"
        sx={{
          flexGrow: 1,
          fontSize: "14px",
          color: "#555",
        }}
      />

      {/* Search Icon */}
      <IconButton>
        <SearchIcon sx={{ color: "#888" }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
