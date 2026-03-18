import Doctor from "../models/Doctor.js";
import Service from "../models/Service.js";

export const getDoctorProfile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, user ID missing" });
    }
    const doctor = await Doctor.findById(req.user._id).select("-password");
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        ...doctor.toObject(),
        profile: doctor.toObject(), // Keep for compatibility
      },
    });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

export const submitRegistrationDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const existingDoctor = await Doctor.findById(userId);

    if (!existingDoctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // If the doctor is already active, don't revert to pending unless major identity fields change
    // For now, let's just keep the status if it's already active/approved
    const newStatus =
      existingDoctor.status === "active" || existingDoctor.status === "approved"
        ? existingDoctor.status
        : "pending";

    // Prevent manual update of system-calculated fields
    const {
      rating,
      reviewsCount,
      patientsTreated,
      successRate,
      status: bodyStatus,
      ...safeBody
    } = req.body;

    // If files were uploaded (multipart/form-data), map them into safeBody
    if (req.files) {
      if (req.files.profilePic && req.files.profilePic.length > 0) {
        safeBody.profilePic = `/uploads/${req.files.profilePic[0].filename}`;
      }
      if (req.files.documents && req.files.documents.length > 0) {
        safeBody.documents = req.files.documents.map(
          (f) => `/uploads/${f.filename}`,
        );
      }
    }

    const updateData = { ...safeBody, status: newStatus };
    if (updateData.profilePic) {
      updateData.avatar = updateData.profilePic;
      updateData.image = updateData.profilePic;
    } else if (updateData.image) {
      updateData.avatar = updateData.image;
      updateData.profilePic = updateData.image;
    } else if (updateData.avatar) {
      updateData.profilePic = updateData.avatar;
      updateData.image = updateData.avatar;
    }

    const doctor = await Doctor.findByIdAndUpdate(
      userId,
      { ...updateData },
      { new: true, runValidators: true },
    );

    // Synchronize treatments to Global Service model
    if (updateData.treatments && Array.isArray(updateData.treatments)) {
      const existingServices = await Service.find({ doctorId: userId });
      const existingServiceNames = existingServices.map((s) =>
        s.name.toLowerCase(),
      );

      const newServices = updateData.treatments
        .filter(
          (t) => t.name && !existingServiceNames.includes(t.name.toLowerCase()),
        )
        .map((t) => ({
          doctorId: userId,
          name: t.name,
          category: "Consultation",
          description: t.desc || "",
          price: updateData.basePrice || "Contact for pricing",
          image: t.image || "", // Support image from treatment
          createdBy: userId,
          creatorRole: "Doctor",
          status: "active",
        }));

      if (newServices.length > 0) {
        await Service.insertMany(newServices);
      }
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Error updating doctor details:", error);
    res
      .status(400)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

export const updateDoctorStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "active", "rejected", "on-hold"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).select("-password");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: `Doctor status updated to ${status}`,
      data: doctor,
    });
  } catch (error) {
    console.error("Error updating doctor status:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
