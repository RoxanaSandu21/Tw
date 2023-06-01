package api;

import annotations.*;
import exceptions.NotFoundException;
import handlers.Response;
import models.Flower;
import pojos.FlowerResponse;

public interface FlowerApi {

    @GET
    @Path("/flowers/{id}")
    FlowerResponse getFlower(@PathParam("id") int id) throws NotFoundException;

    @POST
    @Path("/flowers")
    Response createFlower(FlowerResponse flower);

    @PUT
    @Path("/flowers/{id}")
    Response updateFlower(@PathParam("id") int id, FlowerResponse flower) throws NotFoundException;

    @DELETE
    @Path("/flowers/{id}")
    Response deleteFlower(@PathParam("id") int id) throws NotFoundException;
    
}
