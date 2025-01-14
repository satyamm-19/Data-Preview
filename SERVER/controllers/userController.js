import User from '../models/User.js';

export async function submitUserData(req, res) {
  try {
    const { name, phoneNumber } = req.body;
    const image = req.file;

    // console.log(image)

    if (!name || !phoneNumber || !image) {
      return res.status(400).json({ message: "All fields must be filled out, including an image!" });
    }

    // Create new user in database
    const user = new User({
      name:name,
      phone: phoneNumber,
      image: image.originalname
    });

    await user.save();

    res.status(201).json({
      message: "Form data submitted successfully!",
      userData: user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
