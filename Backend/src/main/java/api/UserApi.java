package api;

import annotations.*;
import exceptions.NotFoundException;
import handlers.Response;
import models.Flower;
import models.User;

public interface UserApi {
    @GET
    @Path("/users/{email}")
    User getUserByEmail(@PathParam("email") String email) throws NotFoundException;

    @PUT
    @Path("/users")
    Response updateUser(@RequestBody User user) throws NotFoundException;

}
