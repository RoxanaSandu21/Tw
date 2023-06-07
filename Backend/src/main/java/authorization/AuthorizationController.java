package authorization;

import api.AuthorizationApi;
import exceptions.AuthenticationException;
import exceptions.RegisterConflictException;
import handlers.Response;

public class AuthorizationController implements AuthorizationApi {
    @Override
    public Response register(RegisterRequest registerRequest) throws RegisterConflictException {
        AuthorizationService.saveUser(registerRequest);
        return Response.created();
    }

    @Override
    public AuthorizationToken authenticate(AuthenticationRequest authenticationRequest) throws AuthenticationException {
        //TODO: when they are null the user credentials are incorrect
        return AuthorizationService.authenticate(authenticationRequest);
    }
}
