package controllers;

import api.UserApi;
import exceptions.NotFoundException;
import models.User;
import services.UserService;

public class UserController implements UserApi {
    @Override
    public User getUserByEmail(String email) throws NotFoundException {
        return UserService.findUserByEmail(email);
    }
}
