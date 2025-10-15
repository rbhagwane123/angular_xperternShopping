package com.xpertern.service;

import java.util.List;

import com.xpertern.exception.OrderException;
import com.xpertern.model.Address;
import com.xpertern.model.Orders;
import com.xpertern.model.User;

public interface OrderService {

	public Orders createOrder(User user, Address shippingAddress) throws OrderException;

	public Orders findOrderById(Long orderId) throws OrderException;

	public List<Orders> usersOrderHistory(Long userId) throws OrderException;

	public Orders confirmedOrder(Long orderId) throws OrderException;

	public Orders shippedOrder(Long orderId) throws OrderException;

	public Orders deliveredOrder(Long orderId) throws OrderException;

	public Orders placeOrder(Long orderId) throws OrderException;

	public Orders cancelOrder(Long orderId) throws OrderException;

	public void deleteOrder(Long orderId) throws OrderException;
	
	public List<Orders> getAllOrders();
	
}
