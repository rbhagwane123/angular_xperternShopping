package com.xpertern.service;


import com.xpertern.exception.UserException;
import com.xpertern.model.User;

public interface UserService {

	public User findUserById(Long userId) throws UserException;

	public User findUserProfileByJwt(String jwt) throws UserException;

}
