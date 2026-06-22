import dbConnection from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export interface User {
  id: number;
  clerk_id?: string;
  full_name: string;
  email: string;
  avatar: string;
  role: "admin" | "seller" | "customer";
  wallet_balance: number;
  password_hash?: string;
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (
  user: Omit<User, "id" | "created_at" | "updated_at">,
): Promise<User> => {
  const connection = await dbConnection.getConnection();
  try {
    const [result] = await connection.execute(
      `INSERT INTO users (clerk_id, full_name, email, avatar, role, wallet_balance) 
             VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.clerk_id || null,
        user.full_name,
        user.email,
        user.avatar,
        user.role,
        user.wallet_balance,
      ],
    );
    const insertResult = result as any;
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE id = ?`,
      [insertResult.insertId],
    );
    const users = rows as User[];
    return users[0];
  } finally {
    connection.release();
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  const connection = await dbConnection.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE id = ?`,
      [id],
    );
    const users = rows as User[];
    return users[0] || null;
  } finally {
    connection.release();
  }
};

export const getUserByClerkId = async (
  clerkId: string,
): Promise<User | null> => {
  const connection = await dbConnection.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE clerk_id = ?`,
      [clerkId],
    );
    const users = rows as User[];
    return users[0] || null;
  } finally {
    connection.release();
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const connection = await dbConnection.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email],
    );
    const users = rows as User[];
    return users[0] || null;
  } finally {
    connection.release();
  }
};

export const updateUserWalletBalance = async (
  id: number,
  newBalance: number,
): Promise<void> => {
  const connection = await dbConnection.getConnection();
  try {
    await connection.execute(
      `UPDATE users SET wallet_balance = ? WHERE id = ?`,
      [newBalance, id],
    );
  } finally {
    connection.release();
  }
};

export const updateUserRole = async (
  id: number,
  newRole: "admin" | "seller" | "customer",
): Promise<void> => {
  const connection = await dbConnection.getConnection();
  try {
    await connection.execute(`UPDATE users SET role = ? WHERE id = ?`, [
      newRole,
      id,
    ]);
  } finally {
    connection.release();
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  const connection = await dbConnection.getConnection();
  try {
    await connection.execute(`DELETE FROM users WHERE id = ?`, [id]);
  } finally {
    connection.release();
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  const connection = await dbConnection.getConnection();
  try {
    const [rows] = await connection.execute(`SELECT * FROM users`);
    return rows as User[];
  } finally {
    connection.release();
  }
};

export const getUsersByRole = async (
  role: "admin" | "seller" | "customer",
): Promise<User[]> => {
  const connection = await dbConnection.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE role = ?`,
      [role],
    );
    return rows as User[];
  } finally {
    connection.release();
  }
};

export const searchUsers = async (
  id: number,
  query: string,
): Promise<User[]> => {
  const connection = await dbConnection.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE id != ? AND(full_name LIKE ? OR email LIKE ?)`,
      [id, `%${query}%`, `%${query}%`],
    );
    return rows as User[];
  } finally {
    connection.release();
  }
};

export const createUserWithEmail = async (
  user: Omit<User, "id" | "created_at" | "updated_at">,
  password: string,
): Promise<User> => {
  const connection = await dbConnection.getConnection();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.execute(
      `INSERT INTO users (clerk_id, full_name, email, avatar, role, wallet_balance, password_hash) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.clerk_id || null,
        user.full_name,
        user.email,
        user.avatar,
        user.role,
        user.wallet_balance,
        hashedPassword,
      ],
    );
    const insertResult = result as any;
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE id = ?`,
      [insertResult.insertId],
    );
    const users = rows as User[];
    return users[0];
  } finally {
    connection.release();
  }
};

export const getUserPasswordHash = async (
  id: number,
): Promise<string | null> => {
  const connection = await dbConnection.getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT password_hash FROM users WHERE id = ?`,
      [id],
    );
    const result = rows as Array<{ password_hash: string | null }>;
    return result.length > 0 ? result[0].password_hash : null;
  } finally {
    connection.release();
  }
};

export const updateUserPassword = async (
  id: number,
  newPassword: string,
): Promise<void> => {
  const connection = await dbConnection.getConnection();
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await connection.execute(
      `UPDATE users SET password_hash = ? WHERE id = ?`,
      [hashedPassword, id],
    );
  } finally {
    connection.release();
  }
};

export const deleteUserPassword = async (id: number): Promise<void> => {
  const connection = await dbConnection.getConnection();
  try {
    await connection.execute(
      `UPDATE users SET password_hash = NULL WHERE id = ?`,
      [id],
    );
  } finally {
    connection.release();
  }
};
