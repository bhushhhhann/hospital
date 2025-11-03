const oracledb = require('oracledb');

// Configure OracleDB
oracledb.initOracleClient({
  libDir: process.env.ORACLE_LIBDIR || '/usr/lib/oracle/21/client64/lib/'
}).catch(err => {
  console.warn('OracleDB initialization warning:', err);
});

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

// Get database connection
const getConnection = async () => {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    return connection;
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

// Close database connection
const closeConnection = async (connection) => {
  try {
    if (connection) {
      await connection.close();
    }
  } catch (err) {
    console.error('Error closing connection:', err);
  }
};

module.exports = {
  getConnection,
  closeConnection
};
