package com.xpertern.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xpertern.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByEmail(String email);
}
