package cr.ac.ucr.ie.fast506.dao_implement;

import cr.ac.ucr.ie.fast506.connection.DBConnection;
import cr.ac.ucr.ie.fast506.dao.ClientDAO;
import cr.ac.ucr.ie.fast506.domain.Client;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import org.springframework.stereotype.Repository;

@Repository
public class ClientDAOImplement implements ClientDAO {

    @Override
    public LinkedList<Client> getAll() {

        LinkedList<Client> list = new LinkedList();
        String sql = "CALL db_fast506.getAllClients";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql); ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                Client client = new Client();

                client.setIdUser(rs.getInt("id_user"));
                client.setName(rs.getString("name"));
                client.setId(rs.getInt("id"));
                client.setEmail(rs.getString("email"));
                client.setPhoneNumber(rs.getString("phone_number"));
                client.setDateBirth(rs.getDate("date_birth"));
                client.setProfileImage(rs.getString("profile_image"));

                client.setCommInterest(rs.getString("comm_insterest"));
                client.setPhysicalAdress(rs.getString("physical_address"));
                client.setOcupation(rs.getString("occupation"));
                list.add(client);

            }
        } catch (SQLException e) {

            System.err.println("Error al listar clientes " + e.getMessage());

        }

        return list;

    }

    @Override
    public void add(Client client) {

        String sql = "CALL db_fast506.insertClient(?,?,?,?,?,?,?,?,?,?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setString(1, client.getName());
            ps.setInt(2, client.getId());
            ps.setString(3, client.getEmail());
            ps.setString(4, client.getPassword());
            ps.setString(5, client.getPhoneNumber());
            ps.setDate(6, (Date) client.getDateBirth());
            ps.setString(7, client.getProfileImage());

            ps.setString(8, client.getCommInterest());
            ps.setString(9, client.getPhysicalAdress());
            ps.setString(10, client.getOcupation());
            ps.executeUpdate();

        } catch (SQLException e) {

            System.err.println("Error al agregar cliente " + e.getMessage());

        }
    }

    @Override
    public void update(Client client) {

        String sql = "CALL db_fast506.updateClient(?,?,?,?,?,?,?,?,?,?,?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setString(1, client.getName());
            ps.setInt(2, client.getId());
            ps.setString(3, client.getEmail());
            ps.setString(4, client.getPassword());
            ps.setString(5, client.getPhoneNumber());
            ps.setDate(6, (Date) client.getDateBirth());
            ps.setString(7, client.getProfileImage());

            ps.setString(8, client.getCommInterest());
            ps.setString(9, client.getPhysicalAdress());
            ps.setString(10, client.getOcupation());
            ps.executeUpdate();

        } catch (Exception e) {

            System.err.println("Error al actualizar cliente " + e.getMessage());

        }

    }

    @Override
    public void deleteById(Integer id) {

        String sql = "CALL deb_fast506.deleteClientById(?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();

        } catch (Exception e) {

            System.err.println("Error al eliminar cliente " + e.getMessage());

        }

    }

    @Override
    public Client findById(Integer id) {

        Client client = null;
        String sql = "CALL db_fast506 findClientById(?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setInt(1, id);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {

                    client = new Client();
                    client.setIdUser(rs.getInt("id_user"));
                    client.setName(rs.getString("name"));
                    client.setId(rs.getInt("id"));
                    client.setEmail(rs.getString("email"));
                    client.setPhoneNumber(rs.getString("phone_number"));
                    client.setDateBirth(rs.getDate("date_birth"));
                    client.setProfileImage(rs.getString("profile_image"));

                    client.setCommInterest(rs.getString("comm_insterest"));
                    client.setPhysicalAdress(rs.getString("physical_address"));
                    client.setOcupation(rs.getString("occupation"));

                }

            }

        } catch (Exception e) {

            System.err.println("Error al encontrar el cliente " + e.getMessage());

        }
        return client;
    }

}
