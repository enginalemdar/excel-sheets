const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const app = express();
const upload = multer();

app.post("/convert", upload.single("file"), (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });

    const result = workbook.SheetNames.map((name) => ({
      sheetName: name,
      data: XLSX.utils.sheet_to_json(workbook.Sheets[name], { defval: null }),
    }));

    res.json({ sheets: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Excel to JSON API ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
