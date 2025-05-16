import { getAmaliy, createAmaliy, deleteAmaliy } from "./model.js";
import { cloudinary } from "../../middlewares/cloudnariy.js"; // Cloudinary ni chaqiramiz

const getAllAmaliy = async (req, res) => {
  try {
    const rows = await getAmaliy();
    res.json(rows);
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Server xatosi" });
  }
};

const createNewAmaliy = async (req, res) => {
  try {
    const { amaliy_title } = req.body;
    const fileUrl = req.file?.path;
    const publicId = req.file?.filename; // bu faqat fayl nomi

    if (!amaliy_title || !fileUrl || !publicId) {
      return res.status(400).json({ message: "Maʼlumotlar yetarli emas" });
    }

    // 🔧 Diqqat: faqat fayl nomini yuboring, papkasiz
    await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      resource_type: 'raw',
      access_mode: 'public',
    });

    const newAmaliy = await createAmaliy(amaliy_title, fileUrl);
    res.status(201).json(newAmaliy);
  } catch (err) {
    console.error("Xatolik:", err);
    res.status(500).json({ message: "Server xatosi" });
  }
};


const deleteAmailya = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteAmaliy(id);
    if (deleted) {
      res.json({ message: "O‘chirildi" });
    } else {
      res.status(404).json({ message: "Topilmadi" });
    }
  } catch (err) {
    console.error("Xatolik:", err);
    res.status(500).json({ message: "Server xatosi" });
  }
};

export { getAllAmaliy, createNewAmaliy, deleteAmailya };
