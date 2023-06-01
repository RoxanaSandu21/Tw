package services;

import dataprovider.Data;
import pojos.FlowerResponse;
import repositories.FlowerRepository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class FlowerService {

    public static FlowerResponse findFlowerById(int id) {
        //TODO: check about thrown exceptions and do some validations on params
        String query = "SELECT id, name, type, date FROM test_table WHERE id = ?";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {
            statement.setInt(1, id);

            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                FlowerResponse flower = new FlowerResponse();
                flower.setId(resultSet.getInt("id"));
                flower.setName(resultSet.getString("name"));
                flower.setType(resultSet.getString("type"));
                flower.setDate(resultSet.getDate("date"));
                return flower;
            } else {
                return null; // Flower with the specified ID not found
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void saveFlower(FlowerResponse flower) {
    }

    public static void updateFlower(FlowerResponse flower) {

    }

    public static void deleteFlower(FlowerResponse flower) {

    }
}
