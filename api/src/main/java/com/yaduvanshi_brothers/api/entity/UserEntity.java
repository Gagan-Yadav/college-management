package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private String roles; // Change from String to List<String>

    @Column
    private String email;

    @Column
    private String phone;

    @Column
    private String city;
}
