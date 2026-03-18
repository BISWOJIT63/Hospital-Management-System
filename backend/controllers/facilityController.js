import Hospital from "../models/Hospital.js";
import Clinic from "../models/Clinic.js";

export const updateFacilityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !["pending", "active", "on-hold", "rejected", "approved"].includes(status)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    // Try Hospital first
    let facility = await Hospital.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!facility) {
      // Try Clinic
      facility = await Clinic.findByIdAndUpdate(id, { status }, { new: true });
    }

    if (!facility) {
      return res
        .status(404)
        .json({ success: false, message: "Facility not found" });
    }

    res.status(200).json({
      success: true,
      message: `Facility status updated to ${status}`,
      data: facility,
    });
  } catch (error) {
    console.error("Error updating facility status:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;

    // Try Hospital first
    let facility = await Hospital.findByIdAndDelete(id);
    if (!facility) {
      // Try Clinic
      facility = await Clinic.findByIdAndDelete(id);
    }

    if (!facility) {
      return res
        .status(404)
        .json({ success: false, message: "Facility not found" });
    }

    res.status(200).json({
      success: true,
      message: "Facility deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting facility:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createFacility = async (req, res) => {
  try {
    const { type, ...data } = req.body;
    const adminId = req.user._id;

    // Prevent manual update of system-calculated fields
    // safeData will be built from body below

    // Parse possible JSON string fields (sent from form-data)
    const arrayFields = [
      "departments",
      "keyDoctors",
      "awards",
      "businessHours",
      "insurances",
      "facilities",
      "appointmentTypes",
      "features",
    ];
    const safeData = { ...safeDataFromBody(data) };

    // Attach uploaded files if any
    if (req.files) {
      if (req.files.images) {
        safeData.images = req.files.images.map((f) => `/uploads/${f.filename}`);
      }
      if (req.files.documents) {
        safeData.documents = req.files.documents.map(
          (f) => `/uploads/${f.filename}`,
        );
      }
    }

    // Try to JSON.parse arrays that arrived as strings
    arrayFields.forEach((field) => {
      if (safeData[field] && typeof safeData[field] === "string") {
        try {
          safeData[field] = JSON.parse(safeData[field]);
        } catch (e) {
          // leave as string or convert single item to array
          try {
            safeData[field] = safeData[field].split(",").map((s) => s.trim());
          } catch (err) {
            // ignore
          }
        }
      }
    });

    let facility;
    if (type === "Hospital") {
      facility = await Hospital.create({
        ...safeData,
        adminId,
        status: "pending",
        rating: 0,
        reviewsCount: 0,
      });
    } else if (type === "Clinic") {
      facility = await Clinic.create({
        ...safeData,
        adminId,
        status: "pending",
        rating: 0,
        reviewsCount: 0,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid facility type" });
    }

    res.status(201).json({
      success: true,
      data: facility,
    });
  } catch (error) {
    console.error("Error creating facility:", error);
    res
      .status(400)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

export const getMyFacility = async (req, res) => {
  try {
    const adminId = req.user._id;

    // Try Hospital first
    let facility = await Hospital.findOne({ adminId }).lean();
    if (!facility) {
      // Try Clinic
      facility = await Clinic.findOne({ adminId }).lean();
    }

    if (!facility) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "No facility found for this admin",
      });
    }

    res.status(200).json({
      success: true,
      data: facility,
      facility: facility, // Some frontend parts might expect 'facility' instead of 'data'
    });
  } catch (error) {
    console.error("Error fetching my facility:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Helper to extract safeData without system fields
function safeDataFromBody(data) {
  const { rating, reviewsCount, status: bodyStatus, ...safe } = data || {};
  return safe;
}
