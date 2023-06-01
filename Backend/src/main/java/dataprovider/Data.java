package dataprovider;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Data {

    private static final String URL = "jdbc:postgresql://localhost:5432/flowerManager";
    private static final String USER = "postgres";
    private static final String PASSWORD = "postgres";
    private static Connection connection = null;

    private Data() {
    }

    public static Connection getConnection() throws SQLException {
        if (connection == null || connection.isClosed()) {
            createConnection();
        }
        return connection;
    }

    private static void createConnection() {
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            connection.setAutoCommit(false);
        } catch (SQLException e) {
            System.err.println(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    public static void closeConnection() {
        try {
            connection.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void rollback () {
        try {
            connection.rollback();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
