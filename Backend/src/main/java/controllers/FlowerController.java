package controllers;

import api.FlowerApi;
import exceptions.NotFoundException;
import handlers.Response;
import models.Flower;
import services.FlowerService;

import java.util.List;

public class FlowerController implements FlowerApi {

    @Override
    public List<Flower> getFlowers() throws NotFoundException {
        return FlowerService.getAllFlowers();
    }

    @Override
    public Flower getFlower(int id) throws NotFoundException {
        // Retrieve flower from the database based on the provided ID
        Flower flower = FlowerService.findFlowerById(id);
        if (flower == null) {
            //TODO: maybe here should be a log message and a message to user
            throw new NotFoundException("Flower not found");
        }
        return flower;
    }

    @Override
    public Response createFlower(Flower flower) {
        // Save the new flower in the database
        FlowerService.saveFlower(flower);
        return Response.created();
    }

    @Override
    public Response updateFlower(int id, Flower flower) throws NotFoundException {
        // Retrieve the existing flower from the database based on the provided ID
        Flower existingFlower = FlowerService.findFlowerById(id);
        if (existingFlower == null) {
            throw new NotFoundException("Flower not found");
        }
        // Update the flower properties
        existingFlower.setName(flower.getName());
        // ... update other properties

        // Save the updated flower in the database
        FlowerService.updateFlower(existingFlower);
        return Response.ok();
    }

    @Override
    public Response deleteFlower(int id) throws NotFoundException {
        // Retrieve the flower from the database based on the provided ID
        Flower flower = FlowerService.findFlowerById(id);
        if (flower == null) {
            throw new NotFoundException("Flower not found");
        }
        // Delete the flower from the database
        FlowerService.deleteFlower(flower);
        return Response.ok();
    }
}
