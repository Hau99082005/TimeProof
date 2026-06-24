import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
});

// Kiểm tra kết nối
pool.on("connect", () => {
  console.log("✅ Đã kết nối thành công đến PostgreSQL!");
});

pool.on("error", (err) => {
  console.error("❌ Lỗi kết nối PostgreSQL:", err);
});

// Thử kết nối ngay lập tức
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Kết nối thử thành công!");
    client.release();
  } catch (err) {
    console.error("❌ Kết nối thử thất bại:", err);
  }
})();

export async function dbConnect() {
  return pool;
}

export default pool;
