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
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        }
      },
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteImageFromCloudinary = async (
  publicId: string,
): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

export const getAllBanners = async (): Promise<Banner[]> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM banners ORDER BY created_at DESC`);
    return result.rows as Banner[];
  } finally {
    client.release();
  }
};

export const getBannerById = async (id: number): Promise<Banner | null> => {
  const client = await dbConnection.connect();
  try {
    const result = await client.query(`SELECT * FROM banners WHERE id = $1`, [id]);
    const banners = result.rows as Banner[];
    return banners[0] || null;
  } finally {
    client.release();
  }
};

export const createBanner = async (
  bannerData: Omit<Banner, "id" | "created_at" | "updated_at"> & {
    imageFile?: Buffer;
    imageFileName?: string;
  },
): Promise<Banner> => {
  const client = await dbConnection.connect();
  try {
    let image = bannerData.image;
    let image_url = bannerData.image_url;

    if (bannerData.imageFile && bannerData.imageFileName) {
      const cloudinaryResult = await uploadImageToCloudinary(
        bannerData.imageFile,
        bannerData.imageFileName,
      );
      image = cloudinaryResult.public_id;
      image_url = cloudinaryResult.secure_url;
    }

    const result = await client.query(
      `INSERT INTO banners (title, image, image_url) VALUES ($1, $2, $3) RETURNING *`,
      [bannerData.title, image, image_url],
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const updateBanner = async (
  id: number,
  updates: Partial<
    Omit<Banner, "id" | "created_at" | "updated_at"> & {
      imageFile?: Buffer;
      imageFileName?: string;
    }
  >,
): Promise<Banner | null> => {
  const client = await dbConnection.connect();
  try {
    const existingBanner = await getBannerById(id);

    let image = updates.image;
    let image_url = updates.image_url;

    if (updates.imageFile && updates.imageFileName) {
      if (existingBanner?.image) {
        await deleteImageFromCloudinary(existingBanner.image);
      }

      const cloudinaryResult = await uploadImageToCloudinary(
        updates.imageFile,
        updates.imageFileName,
      );
      image = cloudinaryResult.public_id;
      image_url = cloudinaryResult.secure_url;
    }

    const dbUpdates: Partial<Omit<Banner, "id" | "created_at" | "updated_at">> =
      {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (image !== undefined) dbUpdates.image = image;
    if (image_url !== undefined) dbUpdates.image_url = image_url;

    if (Object.keys(dbUpdates).length > 0) {
      const fields = Object.keys(dbUpdates)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const values: any[] = Object.values(dbUpdates);
      values.push(id);

      await client.query(
        `UPDATE banners SET ${fields}, updated_at = NOW() WHERE id = $${values.length}`,
        values,
      );
    }

    const result = await client.query(`SELECT * FROM banners WHERE id = $1`, [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};

export const deleteBanner = async (id: number): Promise<void> => {
  const client = await dbConnection.connect();
  try {
    const banner = await getBannerById(id);
    if (banner?.image) {
      await deleteImageFromCloudinary(banner.image);
    }
    await client.query(`DELETE FROM banners WHERE id = $1`, [id]);
  } finally {
    client.release();
  }
};
