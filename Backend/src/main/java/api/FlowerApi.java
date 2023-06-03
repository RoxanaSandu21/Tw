package api;

import annotations.*;
import exceptions.NotFoundException;
import handlers.Response;
import models.Flower;

import java.util.List;

public interface FlowerApi {

    @GET
    @Path("/flowers/all")
    List<Flower> getFlowers() throws NotFoundException;

    @GET
    @Path("/flowers/{id}")
    Flower getFlower(@PathParam("id") int id) throws NotFoundException;

    @POST
    @Path("/flowers")
    Response createFlower(Flower flower);

    @PUT
    @Path("/flowers/{id}")
    Response updateFlower(@PathParam("id") int id, Flower flower) throws NotFoundException;

    @DELETE
    @Path("/flowers/{id}")
    Response deleteFlower(@PathParam("id") int id) throws NotFoundException;
    
}
