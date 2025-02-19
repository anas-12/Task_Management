package com.ios.backend.config;

import com.ios.backend.entities.Role;
import com.ios.backend.entities.RoleName;
import com.ios.backend.entities.User;
import com.ios.backend.repositories.RoleRepository;
import com.ios.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class AdminInitializer {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initializeAdmin(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            // Vérifier si l'utilisateur admin existe déjà
            if (!userRepository.existsByUsername("admin")) {
                // Créer le rôle admin s'il n'existe pas
                Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                        .orElseGet(() -> {
                            Role newRole = new Role(RoleName.ROLE_ADMIN);
                            return roleRepository.save(newRole);
                        });

                // Créer l'utilisateur admin
                User admin = new User(
                        "Administrator",
                        "admin",
                        "admin@admin.com",
                        passwordEncoder.encode("admin123") // Mot de passe par défaut
                );

                Set<Role> roles = new HashSet<>();
                roles.add(adminRole);
                admin.setRoles(roles);

                userRepository.save(admin);
                System.out.println("Utilisateur administrateur créé avec succès!");
                System.out.println("Username: admin");
                System.out.println("Password: admin123");
            }
        };
    }
}
