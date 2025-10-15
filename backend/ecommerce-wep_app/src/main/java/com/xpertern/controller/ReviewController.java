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
import com.xpertern.model.Rating;
import com.xpertern.model.Review;
import com.xpertern.model.User;
import com.xpertern.request.RatingRequest;
import com.xpertern.request.ReviewRequest;
import com.xpertern.service.RatingService;
import com.xpertern.service.ReviewService;
import com.xpertern.service.UserService;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;

	@Autowired
	private UserService userService;
	
	
	@PostMapping("/create")
	public ResponseEntity<Review> createReview(@RequestBody ReviewRequest req,
			@RequestHeader("Authorization") String jwt) throws ProductException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		Review review = reviewService.createReview(req, user);

		return new ResponseEntity<>(review, HttpStatus.CREATED);
	}

	@GetMapping("/products/{productId}")
	public ResponseEntity<List<Review>> getProductReview(@PathVariable Long productId,
			@RequestHeader("Authorization") String jwt) throws ProductException, UserException {

		User user = userService.findUserProfileByJwt(jwt);

		List<Review> reviews = reviewService.getAllReview(productId);

		return new ResponseEntity<>(reviews, HttpStatus.CREATED);
	}

	
	
	
	
}
