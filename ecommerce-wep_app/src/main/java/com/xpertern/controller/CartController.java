package com.xpertern.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xpertern.exception.OrderException;
import com.xpertern.exception.ProductException;
import com.xpertern.exception.UserException;
import com.xpertern.model.Cart;
import com.xpertern.model.Orders;
import com.xpertern.model.User;
import com.xpertern.request.AddItemRequest;
import com.xpertern.response.ApiResponse;
import com.xpertern.service.CartService;
import com.xpertern.service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	@Autowired
	private UserService userService;

	@GetMapping("/")
	public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt)
			throws OrderException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		Cart cart = cartService.findUserCart(user.getId());

		return new ResponseEntity<>(cart, HttpStatus.OK);
	}

	@PutMapping("/add")
	public ResponseEntity<ApiResponse> addItemCart(@RequestBody AddItemRequest req,
			@RequestHeader("Authorization") String jwt) throws OrderException, UserException, ProductException {

		User user = userService.findUserProfileByJwt(jwt);
		cartService.addCartItem(user.getId(), req);

		
		ApiResponse res = new ApiResponse();
		res.setMessage("item added to cart");
		res.setStatus(true);
		
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

}
