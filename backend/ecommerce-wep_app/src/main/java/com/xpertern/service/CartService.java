package com.xpertern.service;

import com.xpertern.exception.ProductException;
import com.xpertern.model.Cart;
import com.xpertern.model.User;
import com.xpertern.repository.CartRepository;
import com.xpertern.request.AddItemRequest;

public interface CartService {

	public Cart createCart(User user);

	public String addCartItem(Long userId, AddItemRequest req) throws ProductException;

	public Cart findUserCart(Long userId);

}
