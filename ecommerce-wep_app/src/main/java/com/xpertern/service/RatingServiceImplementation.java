package com.xpertern.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.xpertern.exception.ProductException;
import com.xpertern.model.Product;
import com.xpertern.model.Rating;
import com.xpertern.model.User;
import com.xpertern.repository.RatingRepository;
import com.xpertern.request.RatingRequest;

@Service
public class RatingServiceImplementation implements RatingService {

	private RatingRepository ratingRepository;
	private ProductService productService;

	public RatingServiceImplementation(RatingRepository ratingRepository, ProductService productService) {
		this.productService = productService;
		this.ratingRepository = ratingRepository;
	}

	@Override
	public Rating createRating(RatingRequest req, User user) throws ProductException {

		Product product = productService.findProductById(req.getProductId());

		Rating rating = new Rating();
		rating.setProduct(product);
		rating.setUser(user);
		rating.setRating(req.getRating());
		rating.setCreatedAt(LocalDateTime.now());

		return ratingRepository.save(rating);
	}

	@Override
	public List<Rating> getProductsRating(Long productId) {

		return ratingRepository.getAllProductsRatings(productId);
	}

}
