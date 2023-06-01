package handlers;

import api.FlowerApi;
import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import controllers.FlowerController;
import exceptions.NotFoundException;
import pojos.FlowerResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.stream.Collectors;

public class RequestHandler implements HttpHandler {
    private final FlowerApi flowerApi;

    public RequestHandler() {
        // Create an instance of the API implementation
        flowerApi = new FlowerController();
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // Parse the request and extract the method, path, and body
        String method = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();
        String body = new BufferedReader(new InputStreamReader(exchange.getRequestBody()))
                .lines().collect(Collectors.joining("\n"));

        // Process the request based on the method and path
        String response;
        int statusCode;
        try {
            if (method.equals("GET") && path.matches("/api/flowers/\\d+")) {
                int flowerId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                FlowerResponse flower = flowerApi.getFlower(flowerId);
                //TODO: see what about this response :?
                response = toJson(flower);
                statusCode = 200;
            } else if (method.equals("POST") && path.equals("/api/flowers")) {
                FlowerResponse flower = fromJson(body, FlowerResponse.class);
                response = String.valueOf(flowerApi.createFlower(flower));
                statusCode = 201;
            } else if (method.equals("PUT") && path.matches("/api/flowers/\\d+")) {
                int flowerId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                FlowerResponse flower = fromJson(body, FlowerResponse.class);
                response = String.valueOf(flowerApi.updateFlower(flowerId, flower));
                statusCode = 200;
            } else if (method.equals("DELETE") && path.matches("/api/flowers/\\d+")) {
                int flowerId = Integer.parseInt(path.substring(path.lastIndexOf('/') + 1));
                response = String.valueOf(flowerApi.deleteFlower(flowerId));
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

        // Send the response
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.length());
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }

    private <T> T fromJson(String json, Class<T> clazz) {
        // Implement JSON deserialization logic
        // Using a library like Jackson or Gson is recommended for real-world scenarios
        // This is a basic example using Java's built-in JSON processing (requires Java 11+)
        return new Gson().fromJson(json, clazz);
    }

    private String toJson(Object object) {
        // Implement JSON serialization logic
        // Using a library like Jackson or Gson is recommended for real-world scenarios
        // This is a basic example using Java's built-in JSON processing (requires Java 11+)
        return new Gson().toJson(object);
    }
}