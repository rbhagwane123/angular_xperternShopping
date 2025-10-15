package com.xpertern.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xpertern.exception.ProductException;
import com.xpertern.exception.UserException;
import com.xpertern.model.Product;
import com.xpertern.model.Rating;
import com.xpertern.model.User;
import com.xpertern.request.RatingRequest;
import com.xpertern.service.ProductService;
import com.xpertern.service.RatingService;
import com.xpertern.service.UserService;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

	@Autowired
	private RatingService ratingService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req,
			@RequestHeader("Authorization") String jwt) throws ProductException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		Rating rating = ratingService.createRating(req, user);

		return new ResponseEntity<>(rating, HttpStatus.CREATED);
	}

	@GetMapping("/products/{productId}")
	public ResponseEntity<List<Rating>> getProductsRating(@PathVariable Long productId,
			@RequestHeader("Authorization") String jwt) throws ProductException, UserException {

		User user = userService.findUserProfileByJwt(jwt);

		List<Rating> ratings = ratingService.getProductsRating(productId);

		return new ResponseEntity<>(ratings, HttpStatus.CREATED);
	}

}
