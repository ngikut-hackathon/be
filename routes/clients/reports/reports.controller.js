const { createConnection } = require('../../../database/connection');

const databaseName = process.env.DB_NAME

const createReport = async (req, res) => {
    const { description, status, kedinasan_id, user_id } = req.body;
  
    if (!description || !status || !kedinasan_id || !user_id) {
      return sendResponse(res, 400, "All fields are required");
    }
  
    try {
      const db = await createConnection();
      const report_id = crypto.randomUUID();
  
      await db.query(
        `INSERT INTO ${databaseName}.reports (report_id, description, status, kedinasan_id, user_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [report_id, description, status, kedinasan_id, user_id]
      );
  
      const reportData = {
        report_id,
        description,
        status,
        kedinasan_id,
        user_id
      };
  
      console.log('Report created successfully with report_id:', report_id);
      res.status(200).json({
        status: {
          code: 200,
          message: "Success Create User",
        },
        data: reportData
      });
  
    } catch (error) {
      console.error('Error in createReport:', error);
      return sendResponse(res, 500, "Failed to create report", null, error.message);
    }
  };
  
  const getAllReports = async (req, res) => {
    try {
      const db = await createConnection();
      const [reports] = await db.query(`SELECT * FROM ${databaseName}.reports`);
  
      return res.status(200).json({
        status: {
          code: 200,
          message: "Reports fetched successfully",
        },
        data: reports,
      });
    } catch (error) {
      console.error('Error in getAllReports:', error);
      return res.status(500).json({
        status: {
          code: 500,
          message: "An unexpected error occurred",
        },
        error: error.message,
      });
    }
  };
  
  const getReportByID = async (req,res) => {
    const { id } = req.params
    try {
      const db = await createConnection();
      const [report] = await db.query(`SELECT * FROM ${databaseName}.reports WHERE report_id = "${id}"`)
  
      return res.status(200).json({
        status: {
          code: 200,
          message: "Reports fetched successfully",
        },
        data: report,
      });
    } catch (error) {
      console.error('Error in getAllReports:', error);
      return res.status(500).json({
        status: {
          code: 500,
          message: "An unexpected error occurred",
        },
        error: error.message,
      });
    }
  }

  module.exports = {
    createReport,
    getAllReports,
    getReportByID
  }
  