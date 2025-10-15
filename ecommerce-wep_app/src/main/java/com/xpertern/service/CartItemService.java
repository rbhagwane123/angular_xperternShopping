package com.xpertern.service;

import com.xpertern.exception.CartItemException;
import com.xpertern.exception.ProductException;
import com.xpertern.exception.UserException;
import com.xpertern.model.Cart;
import com.xpertern.model.CartItem;
import com.xpertern.model.Product;
import com.xpertern.model.User;
import com.xpertern.request.AddItemRequest;

public interface CartItemService {

	public CartItem createCartItem(CartItem cartItem);
	
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException;
	
	public CartItem findUserCart(Long userId);
	
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;	
	
	public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);
	
	public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;
	
	public CartItem findCartItemById(Long cartItemId) throws CartItemException;
	
}
