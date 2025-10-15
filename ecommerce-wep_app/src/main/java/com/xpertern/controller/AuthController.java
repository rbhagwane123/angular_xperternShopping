package com.xpertern.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xpertern.config.JwtProvider;
import com.xpertern.exception.UserException;
import com.xpertern.model.Cart;
import com.xpertern.model.User;
import com.xpertern.repository.UserRepository;
import com.xpertern.request.LoginRequest;
import com.xpertern.response.AuthResponse;
import com.xpertern.service.CartService;
import com.xpertern.service.CustomUserServiceImplementation;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private JwtProvider jwtProvider;
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private CustomUserServiceImplementation customUserService;

	private CartService cartService;

	public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder,
			CustomUserServiceImplementation customUserService, JwtProvider jwtProvider, CartService cartService) {
		this.userRepository = userRepository;
		this.customUserService = customUserService;
		this.passwordEncoder = passwordEncoder;
		this.jwtProvider = jwtProvider;
		this.cartService = cartService;
	}

	@PostMapping("/singup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {

		System.out.println("Post Mapping Callled....");
		String email = user.getEmail();
		String password = user.getPassword();

		String firstName = user.getFirstName();
		String lastName = user.getLastName();
		String mobile = user.getMobile();

		User isEmailExist = userRepository.findByEmail(email);

		if (isEmailExist != null) {
			throw new UserException("Email is Already Used with Another account");
		}

		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setPassword(passwordEncoder.encode(password));
		createdUser.setFirstName(firstName);
		createdUser.setLastName(lastName);
		createdUser.setMobile(mobile);
		createdUser.setCreatedAt(LocalDateTime.now());

		User saveUser = userRepository.save(createdUser);

		Cart cart = cartService.createCart(saveUser);

		UserDetails userDetails = customUserService.loadUserByUsername(saveUser.getEmail());

		Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
				userDetails.getAuthorities());

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Signin Success");

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
	}

	@PostMapping("/singin")
	public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse(token, "Signin Success");

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
	}

	private Authentication authenticate(String username, String password) {

		UserDetails userDetails = customUserService.loadUserByUsername(username);

		if (userDetails == null) {
			throw new BadCredentialsException("Invalid Username");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
