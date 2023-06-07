package api;

import annotations.GET;
import annotations.Path;
import annotations.PathParam;
import exceptions.NotFoundException;
import models.User;

public interface UserApi {
    @GET
    @Path("/users/{email}")
    User getUserByEmail(@PathParam("email") String email) throws NotFoundException;

}
