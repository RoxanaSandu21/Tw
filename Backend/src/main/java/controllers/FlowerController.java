package controllers;

import api.FlowerApi;
import exceptions.NotFoundException;
import handlers.Response;
import models.Flower;
import pojos.FlowerResponse;
import repositories.FlowerRepository;
import services.FlowerService;

public class FlowerController implements FlowerApi {

    public FlowerResponse getFlower(int id) throws NotFoundException {
        // Retrieve flower from the database based on the provided ID
        FlowerResponse flower = FlowerService.findFlowerById(id);
        if (flower == null) {
            //TODO: maybe here should be a log message and a message to user
            throw new NotFoundException("Flower not found");
        }
        return flower;
    }

    public Response createFlower(FlowerResponse flower) {
        // Save the new flower in the database
        FlowerService.saveFlower(flower);
        return Response.created();
    }

    public Response updateFlower(int id, FlowerResponse flower) throws NotFoundException {
        // Retrieve the existing flower from the database based on the provided ID
        FlowerResponse existingFlower = FlowerService.findFlowerById(id);
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

    public Response deleteFlower(int id) throws NotFoundException {
        // Retrieve the flower from the database based on the provided ID
        FlowerResponse flower = FlowerService.findFlowerById(id);
        if (flower == null) {
            throw new NotFoundException("Flower not found");
        }
        // Delete the flower from the database
        FlowerService.deleteFlower(flower);
        return Response.ok();
    }
}
