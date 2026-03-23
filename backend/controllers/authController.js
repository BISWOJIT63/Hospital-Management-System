import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";

const findUserByEmail = async (email) => {
  let user = await Admin.findOne({ email });
  if (user) return { user, role: user.role };
  user = await Doctor.findOne({ email });
  if (user) return { user, role: "Doctor" };
  user = await Patient.findOne({ email });
  if (user) return { user, role: "Patient" };
  return { user: null, role: null };
};

const DEFAULT_DOCTOR_IMAGE =
  "https://images.unsplash.com/photo-1559839734-2b71ca197ec2?w=400&q=80";

export const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    employeeId,
    department,
    specialty,
    specialization,
    experience,
    consultationFee,
    availableDays,
    licenseNumber,
    dob,
    gender,
    bloodGroup,
    address,
    emergencyContact,
    medicalHistory,
  } = req.body;

  let assignedRole = "Patient";
  if (role === "admin") assignedRole = "Admin";
  if (role === "doctor") assignedRole = "Doctor";
  if (role === "patient") assignedRole = "Patient";
  if (role === "SuperAdmin") assignedRole = "SuperAdmin";

  try {
    const { user: userExists } = await findUserByEmail(email);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let user;
    if (assignedRole === "Admin" || assignedRole === "SuperAdmin") {
      user = await Admin.create({
        name,
        email,
        password,
        role: assignedRole,
        phone,
        employeeId,
        department,
      });
    } else if (assignedRole === "Doctor") {
      let uploadedImage = null;
      if (req.file) {
        if (process.env.VERCEL === '1') {
          // Convert buffer to Base64 for Vercel (no persistent disk)
          const b64 = Buffer.from(req.file.buffer).toString('base64');
          uploadedImage = `data:${req.file.mimetype};base64,${b64}`;
        } else {
          uploadedImage = `/uploads/${req.file.filename}`;
        }
      }

      user = await Doctor.create({
        name,
        email,
        password,
        role: "Doctor",
        phone,
        gender,
        dob,
        address,
        location: req.body.location || address || "",
        city: req.body.city || "",
        avatar:
          uploadedImage ||
          req.body.avatar ||
          req.body.profilePic ||
          req.body.image ||
          DEFAULT_DOCTOR_IMAGE,
        profilePic:
          uploadedImage ||
          req.body.profilePic ||
          req.body.avatar ||
          req.body.image ||
          DEFAULT_DOCTOR_IMAGE,
        image:
          uploadedImage ||
          req.body.image ||
          req.body.profilePic ||
          req.body.avatar ||
          DEFAULT_DOCTOR_IMAGE,
        specialty: specialty || specialization || "General",
        experience: experience || "0",
        consultationFee: consultationFee || 0,
        licenseNo: licenseNumber,
        about: `Welcome to the profile of ${name}. Please update this bio via the dashboard!`,
      });
    } else {
      user = await Patient.create({
        name,
        email,
        password,
        role: "Patient",
        phone,
        gender,
        dob,
        bloodGroup,
        address,
        emergencyContact,
        medicalHistory,
      });
    }

    if (user) {
      const userData = user.toObject();
      delete userData.password;

      res.status(201).json({
        ...userData,
        token: generateToken(user._id, assignedRole),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, role } = await findUserByEmail(email);

    if (user && (await user.matchPassword(password))) {
      const userData = user.toObject();
      delete userData.password;

      res.json({
        ...userData,
        token: generateToken(user._id, role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      const userData = user.toObject();
      delete userData.password;

      res.json({
        ...userData,
        token: req.headers.authorization.split(" ")[1],
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const { user } = await findUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with that email not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${frontendURL}/reset-password/${resetToken}`;
    console.log(`[Email Simulator] Send to: ${user.email}`);
    console.log(`[Email Simulator] Reset password URL: ${resetUrl}`);

    res.json({
      message: "Password reset link sent to your email (simulated in console)",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    let user = await Admin.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    let role = "Admin";

    if (!user) {
      user = await Doctor.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      role = "Doctor";
    }
    if (!user) {
      user = await Patient.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      role = "Patient";
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid token or token expired" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successful!",
      token: generateToken(user._id, role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, phone, password, avatar } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) user.password = password; // Will be hashed by pre-save middleware
    if (avatar) user.avatar = avatar;

    const updatedUser = await user.save();
    const userData = updatedUser.toObject();
    delete userData.password;

    res.json({
      ...userData,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
