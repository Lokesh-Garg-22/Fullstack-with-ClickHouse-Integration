const express = require("express");
const cors = require("cors");
const clickhouseClient = require("./db");
const { testConnection } = require("./utils/clickhouse");
const tablesRouter = require("./routes/tables");

const app = express();
const port = 5000; // Or any other port you prefer

app.use(cors());
app.use(express.json());

testConnection();

// Mount the tables route
app.use("/api", tablesRouter);

// Example API endpoint to query ClickHouse
app.get("/api/data", async (req, res) => {
  try {
    const query = "SELECT * FROM system.numbers LIMIT 10"; // Replace with your actual query
    const result = await clickhouseClient.query({ query });
    const data = await result.json();
    res.json(data.data);
  } catch (error) {
    console.error("Error querying ClickHouse:", error);
    res.status(500).json({ error: "Failed to fetch data from ClickHouse" });
  }
});

app.listen(port, () => {
  console.log(`Node.js server listening on port ${port}`);
});
