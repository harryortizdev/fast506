
package cr.ac.ucr.ie.fast506.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionDB {
    private final static String DATABASE = "db_fast506";
    private final static String USER = "root";
    private final static String PASS = "";
    private final static int PORT = 3309;
    private final static String HOST = "localhost";
    
    private final static String URL = 
            "jdbc:mysql://" + HOST + ":"+ PORT+"/"+ DATABASE;
    
    private static Connection connect;
    
    public static Connection getConnection(){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
        }catch(ClassNotFoundException e){
            System.out.println("1- ConnectionDB.getConnection()" + e.getMessage());
        } 
        try{
            connect = DriverManager.getConnection(URL, USER, PASS);
        }catch(SQLException e){
            System.out.println("2- ConnectionDB.getConnection()" + e.getMessage());
        }
        
        return connect;
    }
}
