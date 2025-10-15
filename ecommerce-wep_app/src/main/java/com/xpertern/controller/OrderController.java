package com.xpertern.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xpertern.exception.OrderException;
import com.xpertern.exception.UserException;
import com.xpertern.model.Address;
import com.xpertern.model.Orders;
import com.xpertern.model.User;

import com.xpertern.service.OrderService;
import com.xpertern.service.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserService userService;

	@PostMapping("/")
	public ResponseEntity<Orders> createOrder(@RequestBody Address shippingAddress,
			@RequestHeader("Authorization") String jwt) throws OrderException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		Orders orders = orderService.createOrder(user, shippingAddress);

		return new ResponseEntity<>(orders, HttpStatus.CREATED);
	}

	@GetMapping("/user")
	public ResponseEntity<List<Orders>> userOrderHistory(@RequestHeader("Authorization") String jwt)
			throws OrderException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		List<Orders> orders = orderService.usersOrderHistory(user.getId());

		return new ResponseEntity<>(orders, HttpStatus.OK);
	}

	@GetMapping("/{Id}")
	public ResponseEntity<Orders> findOrderById(@PathVariable("Id") Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		Orders orders = orderService.findOrderById(orderId);

		return new ResponseEntity<>(orders, HttpStatus.OK);
	}
}
