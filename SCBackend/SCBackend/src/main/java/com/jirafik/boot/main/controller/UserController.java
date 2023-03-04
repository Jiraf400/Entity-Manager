package com.jirafik.boot.main.controller;

import com.jirafik.boot.main.entity.User;
import com.jirafik.boot.main.exceptions.ResourceNotFoundException;
import com.jirafik.boot.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/main/")
public class UserController {
    @Autowired
    private UserRepository userRepo;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userRepo.save(user);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userData){
        User employee = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entity not exist with id :" + id));

        employee.setFirstName(userData.getFirstName());
        employee.setLastName(userData.getLastName());
        employee.setEmailId(userData.getEmailId());

        User updatedUser = userRepo.save(employee);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entity not exist with id :" + id));

        userRepo.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
