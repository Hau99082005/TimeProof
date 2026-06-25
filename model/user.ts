import dbConnection from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export interface User {
  id: number;
  firebase_id?: string;
  full_name: string;
  email: string;
  avatar: string;
  role: "admin" | "seller" | "customer";
  wallet_balance: number;
  status: boolean;
  password_hash?: string;
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (
  user: Omit<User, "id" | "created_at" | "updated_at">,
): Promise<User> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(
      `INSERT INTO users (firebase_id, full_name, email, avatar, role, wallet_balance, status) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        user.firebase_id || "",
        user.full_name,
        user.email,
        user.avatar,
        user.role,
        user.wallet_balance,
        user.status ?? true,
      ],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
    const users = result.rows as User[];
    return users[0] || null;
  } finally {
    client.release();
  }
};

export const getUserByFirebaseId = async (
  firebaseId: string,
): Promise<User | null> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM users WHERE firebase_id = $1`, [firebaseId]);
    const users = result.rows as User[];
    return users[0] || null;
  } finally {
    client.release();
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const users = result.rows as User[];
    return users[0] || null;
  } finally {
    client.release();
  }
};

export const updateUserWalletBalance = async (
  id: number,
  newBalance: number,
): Promise<void> => {
  const client = await dbConnection.connect();
  try {
    await client.query(`UPDATE users SET wallet_balance = $1 WHERE id = $2`, [newBalance, id]);
  } finally {
    client.release();
  }
};

export const updateUserRole = async (
  id: number,
  newRole: "admin" | "seller" | "customer",
): Promise<void> => {
  const client = await dbConnection.connect();
  try {
    await client.query(`UPDATE users SET role = $1 WHERE id = $2`, [newRole, id]);
  } finally {
    client.release();
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  const client = await dbConnection.connect();
  try {
    await client.query(`DELETE FROM users WHERE id = $1`, [id]);
  } finally {
    client.release();
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM users`);
    return result.rows as User[];
  } finally {
    client.release();
  }
};

export const getUsersByRole = async (
  role: "admin" | "seller" | "customer",
): Promise<User[]> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM users WHERE role = $1`, [role]);
    return result.rows as User[];
  } finally {
    client.release();
  }
};

export const searchUsers = async (
  id: number,
  query: string,
): Promise<User[]> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(
      `SELECT * FROM users WHERE id != $1 AND (full_name LIKE $2 OR email LIKE $2)`,
      [id, `%${query}%`],
    );
    return result.rows as User[];
  } finally {
    client.release();
  }
};

export const createUserWithEmail = async (
  user: Omit<User, "id" | "created_at" | "updated_at">,
  password: string,
): Promise<User> => {
  const client = await dbConnection.connect();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      `INSERT INTO users (firebase_id, full_name, email, avatar, role, wallet_balance, password_hash, status) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        user.firebase_id || "",
        user.full_name,
        user.email,
        user.avatar,
        user.role,
        user.wallet_balance,
        hashedPassword,
        user.status ?? true,
      ],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const getUserPasswordHash = async (
  id: number,
): Promise<string | null> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT password_hash FROM users WHERE id = $1`, [id]);
    const users = result.rows as Array<{ password_hash: string | null }>;
    return users.length > 0 ? users[0].password_hash : null;
  } finally {
    client.release();
  }
};

export const updateUserPassword = async (
  id: number,
  newPassword: string,
): Promise<void> => {
  const client = await dbConnection.connect();
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await client.query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [hashedPassword, id]);
  } finally {
    client.release();
  }
};

export const deleteUserPassword = async (id: number): Promise<void> => {
  const client = await dbConnection.connect();
  try {
    await client.query(`UPDATE users SET password_hash = NULL WHERE id = $1`, [id]);
  } finally {
    client.release();
  }
};

export const toggleUserStatus = async (id: number): Promise<User | null> => {
  const client = await dbConnection.connect();
  try {
    await client.query(`UPDATE users SET status = NOT status WHERE id = $1`, [id]);
    const result = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
    const users = result.rows as User[];
    return users[0] || null;
  } finally {
    client.release();
  }
};

export const updateUser = async (
  id: number,
  updates: Partial<Omit<User, "id" | "created_at" | "updated_at">>,
): Promise<User | null> => {
  const client = await dbConnection.connect();
  try {
    if (Object.keys(updates).length > 0) {
      const fields = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const values = Object.values(updates);
      values.push(id);

      await client.query(
        `UPDATE users SET ${fields}, updated_at = NOW() WHERE id = $${values.length}`,
        values,
      );
    }
    const result = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
    const users = result.rows as User[];
    return users[0] || null;
  } finally {
    client.release();
  }
};
