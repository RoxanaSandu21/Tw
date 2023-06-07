package services;

import dataprovider.Data;
import exceptions.NotFoundException;
import models.Flower;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FlowerService {

    public static List<Flower> findFlowersByUserMail (String userMail) throws NotFoundException {
        String query = "SELECT flower_id, name, kind, planting_date, owner_email FROM flowers WHERE owner_email = ?";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {

            statement.setString(1, userMail);

            ResultSet resultSet = statement.executeQuery();

            if (!resultSet.next()) {
                throw new NotFoundException("Cannot find flowers for the specified email: " + userMail);
            }

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

    public static List<Flower> getAllFlowers () throws NotFoundException {
        String query = "SELECT flower_id, name, kind, planting_date, owner_email FROM flowers";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {

            ResultSet resultSet = statement.executeQuery();

            if (!resultSet.next()) {
                throw new NotFoundException("Cannot find flowers!");
            }

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

        String query = "INSERT INTO flowers (flower_id, name, kind, planting_date, owner_email) VALUES (?, ?, ?, ?, ?)";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {
            //TODO: autogenerate ID by sequence and modify here
            statement.setInt(1, flower.getId());
            statement.setString(2, flower.getName());
            statement.setString(3, flower.getKind());
            statement.setDate(4, (Date) flower.getPlantingDate());
            statement.setString(5, flower.getOwnerEmail());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public static void updateFlower(Flower flower) {

        String query = "UPDATE flowers SET name = ?, kind = ?, planting_date = ?, owner_email = ? WHERE flower_id = ?";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {
            statement.setString(1, flower.getName());
            statement.setString(2, flower.getKind());
            statement.setDate(3, (Date) flower.getPlantingDate());
            statement.setString(4, flower.getOwnerEmail());
            statement.setInt(5, flower.getId());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public static void deleteFlower(Flower flower) {

        String query = "DELETE FROM flowers WHERE flower_id = ?";

        try (PreparedStatement statement = Data.getConnection().prepareStatement(query)) {
            statement.setInt(1, flower.getId());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

}
