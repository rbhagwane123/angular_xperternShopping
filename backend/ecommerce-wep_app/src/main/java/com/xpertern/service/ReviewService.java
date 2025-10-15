package com.xpertern.service;

import java.util.List;

import com.xpertern.exception.ProductException;
import com.xpertern.model.Review;
import com.xpertern.model.User;
import com.xpertern.request.ReviewRequest;

public interface ReviewService {

	public Review createReview(ReviewRequest req, User user) throws ProductException;
	
	public List<Review> getAllReview(Long productId);
}
