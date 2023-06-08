package api;

import annotations.*;
import exceptions.NotFoundException;
import handlers.Response;
import models.Flower;

import java.util.List;

public interface FlowerApi {

    @GET
    @Path("/flowersByEmail/{email}")
    List<Flower> getFlowersByUserEmail (@PathParam("email") String email) throws NotFoundException;

    @GET
    @Path("/flowers/all")
    List<Flower> getFlowers() throws NotFoundException;

    @GET
    @Path("/flowers/{id}")
    Flower getFlower(@PathParam("id") int id) throws NotFoundException;

    @POST
    @Path("/flowers")
    Response createFlower(@RequestBody Flower flower);

    @PUT
    @Path("/flowers")
    Response updateFlower(@RequestBody Flower flower) throws NotFoundException;

    @DELETE
    @Path("/flowers/{id}")
    Response deleteFlower(@PathParam("id") int id) throws NotFoundException;
    
}
