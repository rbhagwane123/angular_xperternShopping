package com.xpertern.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.xpertern.exception.ProductException;
import com.xpertern.model.Product;
import com.xpertern.model.Review;
import com.xpertern.model.User;
import com.xpertern.repository.ReviewRepository;
import com.xpertern.request.ReviewRequest;

@Service
public class ReviewServiceImplementation implements ReviewService {

	private ReviewRepository reviewRepository;
	private UserService userService;
	private ProductService productService;
	
	
	public ReviewServiceImplementation(ReviewRepository reviewRepository, UserService userService,
			ProductService productService) {
		
		this.reviewRepository = reviewRepository;
		this.userService = userService;
		this.productService = productService;
	}

	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
		Product product = productService.findProductById(req.getProductId());
		
		Review review = new Review();
		review.setUser(user);
		review.setProduct(product);
		review.setReview(req.getReview());
		review.setCreatedAt(LocalDateTime.now());
		
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getAllReview(Long productId) {

		return reviewRepository.getAllProductsReview(productId);
	}

}
