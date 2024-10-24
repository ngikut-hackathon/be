const { createConnection } = require('../../../database/connection');

const databaseName = process.env.DB_NAME

const createUser = async (req, res) => {
  const { displayName, email } = req.body;

  if (!displayName || !email) {
    return sendResponse(res, 400, "Missing required fields: 'displayName' and 'email'", req.body);
  }

  try {
    const db = await createConnection();

    const [maxIdResult] = await db.query(
      `SELECT MAX(user_id) as maxUserId FROM ${databaseName}.users`
    );

    const userId = (maxIdResult[0].maxUserId || 0) + 1;
    const payload = {
      user_id: userId,
      name: displayName,
      email: email
    };

    await db.query(
      `INSERT INTO ${databaseName}.users (user_id, username, email) VALUES (?, ?, ?)`,
      [payload.user_id, payload.name, payload.email]
    );

    console.log('User created successfully with user_id:', payload.user_id);
    res.status(200).json({
      status: {
        code: 200,
        message: "Success Create User",
      },
      data: payload
    });
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(400).json({
      status: {
        code: 400,
        message: "Failed Create User",
      },
      data: req.body,
      error: error.message,
    });
  }
};

module.exports = {
    createUser
}