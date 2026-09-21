package com.springboot.web_empresarialv2.model;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConectionDB {
    private String URL = "mysql://localhost:3306/webv2?useSSL=false&serverTimezone=UTC";
    private String username = "root";
    private String password = "MySQL";

    private Connection connection;

    public ConectionDB() {
        try {
            connection = DriverManager.getConnection(URL, username, password);
                System.out.println("Conexión exitosa a la base de datos.");
        }catch (SQLException e) {
            System.out.println("Error al conectar a la base de datos: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public Connection getConnection() {
        return connection;
    }

    public void closeConnection() {
        try{
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Conexión cerrada correctamente.");
            }
        }catch (SQLException e) {
            System.out.println("Error al cerrar la conexión: " + e.getMessage());
            e.printStackTrace();
        }
    }
}