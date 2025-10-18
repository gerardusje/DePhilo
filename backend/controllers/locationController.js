import Location from "../models/locationModel.js";

// GET semua lokasi
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json({
      success: true,
      locations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil lokasi",
    });
  }
};

// Tambah lokasi baru
export const createLocation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Nama lokasi wajib diisi",
      });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const newLocation = await Location.create({ name, slug });

    res.status(201).json({
      success: true,
      location: newLocation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Gagal membuat lokasi",
    });
  }
};
