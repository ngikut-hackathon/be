const { db } = require("../../../database/db");

const createUser = async (req, res) => {
  const { displayName, email, profilePhotoURL } = req.body;

  // Validasi input
  if (!displayName || typeof displayName !== "string") {
    return res.status(400).json({
      status: {
        code: 400,
        message: "Display name is required and must be a string",
      },
      data: null,
    });
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({
      status: {
        code: 400,
        message: "Valid email is required",
      },
      data: null,
    });
  }

  if (!profilePhotoURL || typeof profilePhotoURL !== "string") {
    return res.status(400).json({
      status: {
        code: 400,
        message: "Profile photo URL is required and must be a string",
      },
      data: null,
    });
  }

  try {
    const checkUserExistsQuery = `SELECT * FROM users WHERE email = ?`;
    const [existingUser] = await db
      .promise()
      .query(checkUserExistsQuery, [email]);

    if (existingUser.length > 0) {
      return res.status(409).json({
        status: {
          code: 409,
          message: "User is already registered",
        },
        data: null,
      });
    }

    const insertNewUserQuery = `
      INSERT INTO users (username, email, profile_photo_url, created_at)
      VALUES (?, ?, ?, NOW())
    `;
    await db
      .promise()
      .query(insertNewUserQuery, [displayName, email, profilePhotoURL]);

    res.status(201).json({
      status: {
        code: 201,
        message: "User successfully created",
      },
      data: {
        displayName,
        email,
        profilePhotoURL,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 500,
        message: "Failed to create user",
      },
      data: null,
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
};
