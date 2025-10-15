package com.xpertern.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xpertern.exception.OrderException;
import com.xpertern.exception.UserException;
import com.xpertern.model.Orders;
import com.xpertern.model.User;
import com.xpertern.response.ApiResponse;
import com.xpertern.service.OrderService;
import com.xpertern.service.UserService;

import jakarta.persistence.criteria.Order;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserService userService;

	@GetMapping("/")
	public ResponseEntity<List<Orders>> getAllOrdersHandler() {
		List<Orders> orders = orderService.getAllOrders();
		return new ResponseEntity<List<Orders>>(orders, HttpStatus.ACCEPTED);
	}

	@PostMapping("/{orderId}/confirmed")
	public ResponseEntity<Orders> ConfirmedOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {

		Orders order = orderService.confirmedOrder(orderId);

		return new ResponseEntity<>(order, HttpStatus.OK);
	}

	@PostMapping("/{orderId}/ship")
	public ResponseEntity<Orders> ShippedOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {
		Orders orders = orderService.shippedOrder(orderId);

		return new ResponseEntity<Orders>(orders, HttpStatus.OK);
	}

	@GetMapping("/user")
	public ResponseEntity<List<Orders>> userOrderHistory(@RequestHeader("Authorization") String jwt)
			throws OrderException, UserException {

		User user = userService.findUserProfileByJwt(jwt);

		List<Orders> orders = orderService.usersOrderHistory(user.getId());

		return new ResponseEntity<>(orders, HttpStatus.OK);

	}

	@PostMapping("/{orderId}/deliver")
	public ResponseEntity<Orders> DeliverOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {
		Orders orders = orderService.deliveredOrder(orderId);

		return new ResponseEntity<Orders>(orders, HttpStatus.OK);
	}

	@PostMapping("/{orderId}/cancel")
	public ResponseEntity<Orders> CancelOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {
		Orders orders = orderService.cancelOrder(orderId);

		return new ResponseEntity<Orders>(orders, HttpStatus.OK);
	}

	@DeleteMapping("/{orderId}/delete")
	public ResponseEntity<ApiResponse> DeleteOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException {
		orderService.deleteOrder(orderId);

		ApiResponse res = new ApiResponse();
		res.setMessage("order deleted sucessfully");
		res.setStatus(true);

		return new ResponseEntity<>(res, HttpStatus.OK);
	}
}
