package services;

import dataprovider.Data;
import models.Flower;
import models.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserService {

    public static User findUserByEmail(String email) {
        //TODO: check about thrown exceptions and do some validations on params
        String query = "SELECT email, name, password, phone_number, city, role FROM users WHERE email = ?";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {
            statement.setString(1, email);

            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                User user = new User();
                user.setEmail(resultSet.getString("email"));
                user.setName(resultSet.getString("name"));
                user.setPasswordHash(resultSet.getString("password"));
                user.setPhoneNumber(resultSet.getString("phone_number"));
                user.setCity(resultSet.getString("city"));
                user.setRole(resultSet.getString("role"));
                return user;
            } else {
                return null; // Flower with the specified ID not found
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void saveUser (User user) {

        String query = "INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {
            statement.setString(1, user.getEmail());
            statement.setString(2, user.getName());
            statement.setString(3, user.getPasswordHash());
            statement.setString(4, user.getPhoneNumber());
            statement.setString(5, user.getCity());
            statement.setString(6, user.getRole());

            statement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void updateUser(User user) {
        String query = "UPDATE users SET name = ?, password = ?, phone_number = ?, city = ?, role = ? WHERE email = ?";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {
            statement.setString(1, user.getName());
            statement.setString(2, user.getPasswordHash());
            statement.setString(3, user.getPhoneNumber());
            statement.setString(4, user.getCity());
            statement.setString(5, user.getRole());
            statement.setString(6, user.getEmail());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void deleteUser(User user) {
        String query = "DELETE FROM users WHERE email = ?";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {
            statement.setString(1, user.getEmail());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
