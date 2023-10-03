package com.niit.bej.user.auth.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_table")
public class User {
    private String firstName;
    private String lastName;
    @Id
    private String email;
    private String password;
    private long mobileNumber;
    private String imageURL;


}
