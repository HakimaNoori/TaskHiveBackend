import User from "../models/userModel.js";

export const create = async (req, res) => {
  try {
    const useData = new User(req.body);
    const { email } = useData;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const savedUser = await useData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await User.findOne({ _id: id });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user." });
  }
};
