package com.xpertern.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xpertern.exception.CartItemException;
import com.xpertern.exception.UserException;
import com.xpertern.model.User;
import com.xpertern.response.ApiResponse;
import com.xpertern.service.CartItemService;
import com.xpertern.service.CartService;
import com.xpertern.service.UserService;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CartItemService cartItemService;
	
	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<ApiResponse> deleteCartitem(@PathVariable Long cartItemId, 
			@RequestHeader("Authorization") String jwt) throws CartItemException, UserException
	{
		User user = userService.findUserProfileByJwt(jwt);
		cartItemService.removeCartItem(user.getId(), cartItemId);
		
		ApiResponse res = new ApiResponse();
		res.setMessage("Item removed from cart");
		res.setStatus(true);
		
		return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
	}

}
