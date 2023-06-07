package handlers;

import api.AuthorizationApi;
import api.FlowerApi;
import api.UserApi;
import authorization.AuthenticationRequest;
import authorization.AuthorizationController;
import authorization.RegisterRequest;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import controllers.FlowerController;
import controllers.UserController;
import exceptions.AuthenticationException;
import exceptions.NotFoundException;
import exceptions.RegisterConflictException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import models.Flower;
import models.User;
import utils.KeyGenerator;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


public class RequestHandler implements HttpHandler {
    private static final String SECRET_KEY = KeyGenerator.getSecretKey();
    private final FlowerApi flowerApi;
    private final AuthorizationApi authorizationApi;

    private final UserApi userApi;

    public RequestHandler() {
        flowerApi = new FlowerController();
        authorizationApi = new AuthorizationController();
        userApi = new UserController();
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            // Set CORS headers for preflight request
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
            exchange.sendResponseHeaders(200, -1); // Send 200 status for preflight request
            return;
        }

        // Set CORS headers for actual request
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");

        String authorizationHeader = exchange.getRequestHeaders().getFirst("Authorization");
        String method = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();
        String body = new BufferedReader(new InputStreamReader(exchange.getRequestBody()))
                .lines().collect(Collectors.joining("\n"));
        String response;
        int statusCode;

        //Public endpoints section, don't need authorization
        if (method.equals("POST") && path.matches("/api/register")) {
            try {
                RegisterRequest registerRequest = fromJson(body, RegisterRequest.class);
                response = String.valueOf(authorizationApi.register(registerRequest));
                statusCode = 201;
            } catch (RegisterConflictException e) {
                response = e.getMessage();
                statusCode = 409;
            }
        } else if (method.equals("POST") && path.matches("/api/authenticate")) {
            try {
                AuthenticationRequest authenticationRequest = fromJson(body, AuthenticationRequest.class);
                response = authorizationApi.authenticate(authenticationRequest).getTokenJwt();
                statusCode = 200;
            } catch (AuthenticationException e) {
                response = e.getMessage();
                statusCode = 404;
            }
        } else {
            //Here is the part where authorization by jwt is made
            //removed "Bearer " from jwt
            if (authorizationHeader != null && isValidToken(authorizationHeader.substring(7))) {

                try {
                    if (method.equals("GET") && path.matches("/api/flowers/\\d+")) {
                        int flowerId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        Flower flower = flowerApi.getFlower(flowerId);
                        //TODO: see what about this response :?
                        response = toJson(flower);
                        statusCode = 200;
                    } else if(method.equals("GET") && path.matches("/api/flowers/all")){
                        List<Flower> flowers = flowerApi.getFlowers();
                        response = toJson(flowers);
                        statusCode = 200;
                    } else if(method.equals("GET") && path.matches("api/flowersByEmail/\\d+")) {
                        List<Flower> flowers = flowerApi.getFlowers();
                        response = toJson(flowers);
                        statusCode = 200;
                    }else if (method.equals("POST") && path.equals("/api/flowers")) {
                        Flower flower = fromJson(body, Flower.class);
                        response = String.valueOf(flowerApi.createFlower(flower));
                        statusCode = 201;
                    } else if (method.equals("PUT") && path.matches("/api/flowers/\\d+")) {
                        int flowerId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        Flower flower = fromJson(body, Flower.class);
                        response = String.valueOf(flowerApi.updateFlower(flowerId, flower));
                        statusCode = 200;
                    } else if (method.equals("DELETE") && path.matches("/api/flowers/\\d+")) {
                        int flowerId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                        response = String.valueOf(flowerApi.deleteFlower(flowerId));
                        statusCode = 200;
                    } else if (method.equals("GET") && path.matches("/api/users/\\d+")) {
                        String userEmail = path.substring(path.lastIndexOf('/') + 1);
                        User user = userApi.getUserByEmail(userEmail);
                        response = toJson(user);
                        statusCode = 200;
                    } else {
                        response = "Endpoint not found";
                        statusCode = 404;
                    }
                } catch (NotFoundException e) {
                    response = e.getMessage();
                    statusCode = 404;
                } catch (Exception e) {
                    response = "Internal Server Error";
                    statusCode = 500;
                }
            } else {
                response = "Unauthorized";
                statusCode = 401;
            }
        }

        // Send the response
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.length());
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }

    private <T> T fromJson(String json, Class<T> clazz) {
        return new Gson().fromJson(json, clazz);
    }

    private String toJson(Object object) {
        return new Gson().toJson(object);
    }

    //TODO: implement this logic
    private boolean isValidToken(String token) {

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            // Check if the token has expired
            Date expirationDate = claims.getExpiration();
            Date now = new Date();
            if (expirationDate.before(now)) {
                return false;
            }
            // Additional validation checks if needed

            return true;
        } catch (JwtException e) {
            return false;
        }
    }


}
