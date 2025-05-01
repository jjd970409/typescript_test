import express from "express";
import productRoutes from "./routes/productRoutes";
import path from "path"; 
import { db } from "./config/db";


const app = express();
const PORT = 3000;

// 정적 파일 제공을 위한 설정 (public 폴더)
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use("/api", productRoutes);

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});