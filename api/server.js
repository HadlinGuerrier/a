import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

//app.get("/", (req, res) => {
//  res.send("Welcome");
//});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "DB.json");

app.post("/api/addUser", async (req, res) => {
  const newData = req.body;
  const existingDatas = await loadDatas();
  existingDatas.push(newData);
  await saveDatas(existingDatas);
  res.status(201).json({ message: "Utilisateur ajoutee" });
});

async function loadDatas() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}
async function saveDatas(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
}
app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
