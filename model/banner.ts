import dbConnection from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";

export interface Banner {
  id: number;
  title: string;
  image: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

export const uploadImageToCloudinary = async (
  fileBuffer: Buffer,
  fileName: string,
): Promise<{ public_id: string; secure_url: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "banners",
        resource_type: "image",
        public_id: fileName,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({ public_id: result.public_id, secure_url: result.secure_url });
        }
      },
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteImageFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

export const getAllBanners = async (): Promise<Banner[]> => {
  const connection = await dbConnection.getConnection();
  try {
    const [rows] = await connection.execute(`SELECT * FROM banners ORDER BY created_at DESC`);
    return rows as Banner[];
  } finally {
    connection.release();
  }
};

export const getBannerById = async (id: number): Promise<Banner | null> => {
  const connection = await dbConnection.getConnection();
  try {
    const [rows] = await connection.execute(`SELECT * FROM banners WHERE id = ?`, [id]);
    const banners = rows as Banner[];
    return banners[0] || null;
  } finally {
    connection.release();
  }
};

export const createBanner = async (
  bannerData: Omit<Banner, "id" | "created_at" | "updated_at"> & { imageFile?: Buffer; imageFileName?: string },
): Promise<Banner> => {
  const connection = await dbConnection.getConnection();
  try {
    let image = bannerData.image;
    let image_url = bannerData.image_url;

    if (bannerData.imageFile && bannerData.imageFileName) {
      const cloudinaryResult = await uploadImageToCloudinary(bannerData.imageFile, bannerData.imageFileName);
      image = cloudinaryResult.public_id;
      image_url = cloudinaryResult.secure_url;
    }

    const [result] = await connection.execute(
      `INSERT INTO banners (title, image, image_url) VALUES (?, ?, ?)`,
      [bannerData.title, image, image_url],
    );
    const insertResult = result as any;
    const [rows] = await connection.execute(`SELECT * FROM banners WHERE id = ?`, [insertResult.insertId]);
    const banners = rows as Banner[];
    return banners[0];
  } finally {
    connection.release();
  }
};

export const updateBanner = async (
  id: number,
  updates: Partial<Omit<Banner, "id" | "created_at" | "updated_at"> & { imageFile?: Buffer; imageFileName?: string }>,
): Promise<Banner | null> => {
  const connection = await dbConnection.getConnection();
  try {
    const existingBanner = await getBannerById(id);

    let image = updates.image;
    let image_url = updates.image_url;

    if (updates.imageFile && updates.imageFileName) {
      if (existingBanner?.image) {
        await deleteImageFromCloudinary(existingBanner.image);
      }

      const cloudinaryResult = await uploadImageToCloudinary(updates.imageFile, updates.imageFileName);
      image = cloudinaryResult.public_id;
      image_url = cloudinaryResult.secure_url;
    }

    const dbUpdates: Partial<Omit<Banner, "id" | "created_at" | "updated_at">> = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (image !== undefined) dbUpdates.image = image;
    if (image_url !== undefined) dbUpdates.image_url = image_url;

    const fields = Object.keys(dbUpdates).map(key => `${key} = ?`).join(", ");
    const values = [...Object.values(dbUpdates), id] as any[];

    if (fields) {
      await connection.execute(`UPDATE banners SET ${fields}, updated_at = NOW() WHERE id = ?`, values);
    }
    const [rows] = await connection.execute(`SELECT * FROM banners WHERE id = ?`, [id]);
    const banners = rows as Banner[];
    return banners[0] || null;
  } finally {
    connection.release();
  }
};

export const deleteBanner = async (id: number): Promise<void> => {
  const connection = await dbConnection.getConnection();
  try {
    const banner = await getBannerById(id);
    if (banner?.image) {
      await deleteImageFromCloudinary(banner.image);
    }
    await connection.execute(`DELETE FROM banners WHERE id = ?`, [id]);
  } finally {
    connection.release();
  }
};
