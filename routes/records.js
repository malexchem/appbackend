const express = require("express");
const axios = require("axios");
const router = express.Router();

const EXTERNAL_API = "https://malexoffice-bkdt.onrender.com/api/records";

// GET /api/records?page=1&limit=100
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const startIndex = (page - 1) * limit;

    // Fetch all records from the external server
    const response = await axios.get(EXTERNAL_API);
    const allRecords = response.data;

    // Paginate locally
    const paginated = allRecords.slice(startIndex, startIndex + limit);

    res.status(200).json({
      success: true,
      total: allRecords.length,
      page,
      limit,
      data: paginated,
    });
  } catch (err) {
    console.error("Error fetching records:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch records",
    });
  }
});

module.exports = router;
