package com.xpertern.service;

import java.util.List;

import com.xpertern.exception.ProductException;
import com.xpertern.model.Rating;
import com.xpertern.model.User;
import com.xpertern.request.RatingRequest;

public interface RatingService {

	public Rating createRating(RatingRequest req, User user) throws ProductException;

	public List<Rating> getProductsRating(Long productId);
	
	
}
