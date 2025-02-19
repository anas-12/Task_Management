package com.ios.backend.config;

import com.ios.backend.entities.Role;
import com.ios.backend.entities.RoleName;
import com.ios.backend.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialiser les rôles s'ils n'existent pas
        if (roleRepository.count() == 0) {
            Role userRole = new Role();
            userRole.setName(RoleName.ROLE_USER);
            roleRepository.save(userRole);

            Role publicRole = new Role();
            publicRole.setName(RoleName.ROLE_PUBLIC);
            roleRepository.save(publicRole);

            Role adminRole = new Role();
            adminRole.setName(RoleName.ROLE_ADMIN);
            roleRepository.save(adminRole);

            System.out.println("Roles initialized successfully!");
        }
    }
}
