import oracledb from 'oracledb';

oracledb.initOracleClient({ libDir: 'C:\\app\\oraclient\\19.0.0\\x64\\client_1\\bin' });

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

interface OracleDbConfig {
  user: string;
  password: string;
  connectString: string;
}

export class OracleDbUtils {
  private config: OracleDbConfig;
  private pool?: oracledb.Pool;
  private connection?: oracledb.Connection;

  constructor(config: OracleDbConfig) {
    this.config = config;
  }

  /** Initialize connection pool */
  async initPool() {
    if (!this.pool) {
      this.pool = await oracledb.createPool(this.config);
    }
  }

  /** Open connection from pool */
  async openConnection() {
    if (!this.connection) {
      await this.initPool();
      this.connection = await this.pool!.getConnection();
    }
  }

  /** Close current connection */
  async closeConnection() {
    if (this.connection) {
      try {
        await this.connection.close();
      } catch (err) {
        console.error('Error closing Oracle DB connection:', err);
      }
      this.connection = undefined;
    }
  }

  /** Close connection pool */
  async closePool() {
    if (this.pool) {
      try {
        await this.pool.close();
      } catch (err) {
        console.error('Error closing Oracle DB pool:', err);
      }
      this.pool = undefined;
    }
  }

  /** Begin transaction (opens connection if needed) */
  async beginTransaction() {
    await this.openConnection();
    // Transaction starts implicitly on first DML
  }

  /** Commit transaction */
  async commit() {
    if (!this.connection) throw new Error('No open connection to commit');
    await this.connection.commit();
  }

  /** Rollback transaction */
  async rollback() {
    if (!this.connection) throw new Error('No open connection to rollback');
    await this.connection.rollback();
  }

  /**
   * Execute query using existing connection (transaction mode)
   * Throws if no connection is open
   */
  async execute<T = any>(
    query: string,
    binds: any = {},
    options: oracledb.ExecuteOptions = {}
  ): Promise<T[]> {
    if (!this.connection) {
      throw new Error('No open connection. Use executeStandalone for ad-hoc queries.');
    }
    const execOptions = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      ...options,
      autoCommit: false,
    };
    const result = await this.connection.execute<T>(query, binds, execOptions);
    return result.rows || [];
  }

  /**
   * Static helper to execute a standalone query without explicit connection management
   */
  static async executeStandalone<T = any>(
    config: OracleDbConfig,
    query: string,
    binds: any = {},
    options: oracledb.ExecuteOptions = {}
  ): Promise<T[]> {
    let connection: oracledb.Connection | undefined;
    try {
      connection = await oracledb.getConnection(config);
      const execOptions = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        autoCommit: true,
        ...options,
      };
      const result = await connection.execute<T>(query, binds, execOptions);
      return result.rows || [];
    } catch (err) {
      console.error('Oracle DB query error:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (closeErr) {
          console.error('Error closing Oracle DB connection:', closeErr);
        }
      }
    }
  }
}