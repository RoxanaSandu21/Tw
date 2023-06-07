package api;

import annotations.POST;
import annotations.Path;
import annotations.RequestBody;
import authorization.AuthenticationRequest;
import authorization.AuthorizationToken;
import authorization.RegisterRequest;
import exceptions.AuthenticationException;
import exceptions.RegisterConflictException;
import handlers.Response;


public interface AuthorizationApi {

    @POST
    @Path("/register")
    Response register(@RequestBody RegisterRequest registerRequest) throws RegisterConflictException;

    @POST
    @Path("/authenticate")
    AuthorizationToken authenticate(@RequestBody AuthenticationRequest authenticationRequest) throws AuthenticationException;
}
