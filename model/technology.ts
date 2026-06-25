import dbConnection from "@/lib/dbConnect";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Technology {
  id: number;
  name: string;
  images: string;
  category_id?: number | null;
}

export const saveImageToLocal = async (
  fileBuffer: Buffer,
  fileName: string,
): Promise<string> => {
  const publicDir = path.join(process.cwd(), "public", "images");
  const uniqueFileName = `${Date.now()}-${fileName}`;
  const filePath = path.join(publicDir, uniqueFileName);
  await writeFile(filePath, fileBuffer);
  return `/images/${uniqueFileName}`;
};

export const deleteImageFromLocal = async (filePath: string): Promise<void> => {
  const fullPath = path.join(process.cwd(), "public", filePath);
  try {
    await unlink(fullPath);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

export const getAllTechnologies = async (): Promise<Technology[]> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM technologies`);
    return result.rows as Technology[];
  } finally {
    client.release();
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM technologiescategories`);
    return result.rows as Category[];
  } finally {
    client.release();
  }
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM technologiescategories WHERE id = $1`, [id]);
    const categories = result.rows as Category[];
    return categories[0] || null;
  } finally {
    client.release();
  }
};

export const createCategory = async (categoryData: Omit<Category, "id">): Promise<Category> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(
      `INSERT INTO technologiescategories (name, description) VALUES ($1, $2) RETURNING *`,
      [categoryData.name, categoryData.description]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const updateCategory = async (id: number, categoryData: Partial<Omit<Category, "id">>): Promise<Category | null> => {
  const client = await dbConnection.connect();
  try {
    const dbUpdates: Partial<Omit<Category, "id">> = {};
    if (categoryData.name !== undefined) dbUpdates.name = categoryData.name;
    if (categoryData.description !== undefined) dbUpdates.description = categoryData.description;

    if (Object.keys(dbUpdates).length > 0) {
      const fields = Object.keys(dbUpdates)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const values: any[] = Object.values(dbUpdates);
      values.push(id);

      await client.query(
        `UPDATE technologiescategories SET ${fields} WHERE id = $${values.length}`,
        values
      );
    }

    const result = await client.query(`SELECT * FROM technologiescategories WHERE id = $1`, [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  const client = await dbConnection.connect();
  try {
    await client.query(`DELETE FROM technologiescategories WHERE id = $1`, [id]);
  } finally {
    client.release();
  }
};

export const getTechnologyById = async (id: number): Promise<Technology | null> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM technologies WHERE id = $1`, [id]);
    const technologies = result.rows as Technology[];
    return technologies[0] || null;
  } finally {
    client.release();
  }
};

export const updateTechnology = async (
  id: number,
  techData: Partial<
    Omit<Technology, "id"> & {
      imageFile?: Buffer;
      imageFileName?: string;
    }
  >,
): Promise<Technology | null> => {
  const client = await dbConnection.connect();
  try {
    const existingTech = await getTechnologyById(id);

    let images = techData.images;

    if (techData.imageFile && techData.imageFileName) {
      if (existingTech?.images) {
        await deleteImageFromLocal(existingTech.images);
      }
      images = await saveImageToLocal(techData.imageFile, techData.imageFileName);
    }

    const dbUpdates: Partial<Omit<Technology, "id">> = {};
    if (techData.name !== undefined) dbUpdates.name = techData.name;
    if (images !== undefined) dbUpdates.images = images;
    if (techData.category_id !== undefined) dbUpdates.category_id = techData.category_id;

    if (Object.keys(dbUpdates).length > 0) {
      const fields = Object.keys(dbUpdates)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const values: any[] = Object.values(dbUpdates);
      values.push(id);

      await client.query(
        `UPDATE technologies SET ${fields} WHERE id = $${values.length}`,
        values,
      );
    }

    const result = await client.query(`SELECT * FROM technologies WHERE id = $1`, [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};

export const createTechnology = async (
  techData: Omit<Technology, "id" | "created_at" | "updated_at"> & {
    imageFile?: Buffer;
    imageFileName?: string;
  },
): Promise<Technology> => {
  const client = await dbConnection.connect();
  try {
    let images = techData.images;

    if (techData.imageFile && techData.imageFileName) {
      images = await saveImageToLocal(techData.imageFile, techData.imageFileName);
    }

    const result = await client.query(
      `INSERT INTO technologies (name, images, category_id) VALUES ($1, $2, $3) RETURNING *`,
      [techData.name, images, techData.category_id],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const deleteTechnology = async (id: number): Promise<void> => {
  const client = await dbConnection.connect();
  try {
    const tech = await getTechnologyById(id);
    if (tech?.images) {
      await deleteImageFromLocal(tech.images);
    }
    await client.query(`DELETE FROM technologies WHERE id = $1`, [id]);
  } finally {
    client.release();
  }
};
