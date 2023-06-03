package services;

import dataprovider.Data;
import models.Flower;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FlowerService {

    public static Flower findFlowerById(int id) {
        //TODO: check about thrown exceptions and do some validations on params
        String query = "SELECT flower_id, name, kind, planting_date, owner_email FROM flowers WHERE flower_id = ?";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {
            statement.setInt(1, id);

            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                Flower flower = new Flower();
                flower.setId(resultSet.getInt("flower_id"));
                flower.setName(resultSet.getString("name"));
                flower.setKind(resultSet.getString("kind"));
                flower.setPlantingDate(resultSet.getDate("planting_date"));
                flower.setOwnerEmail(resultSet.getString("owner_email"));
                return flower;
            } else {
                return null; // Flower with the specified ID not found
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static List<Flower> getAllFlowers () {
        String query = "SELECT flower_id, name, kind, planting_date, owner_email FROM flowers";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {

            ResultSet resultSet = statement.executeQuery();
            List<Flower> allFlowers = new ArrayList<>();

            while (resultSet.next()) {
                Flower flower = new Flower();
                flower.setId(resultSet.getInt("flower_id"));
                flower.setName(resultSet.getString("name"));
                flower.setKind(resultSet.getString("kind"));
                flower.setPlantingDate(resultSet.getDate("planting_date"));
                flower.setOwnerEmail(resultSet.getString("owner_email"));
                allFlowers.add(flower);
            }
            return allFlowers;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public static void saveFlower(Flower flower) {
    }

    public static void updateFlower(Flower flower) {

    }

    public static void deleteFlower(Flower flower) {

    }
}
