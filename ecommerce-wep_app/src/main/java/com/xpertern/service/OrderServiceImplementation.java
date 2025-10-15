package com.xpertern.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xpertern.exception.OrderException;
import com.xpertern.model.Address;
import com.xpertern.model.Cart;
import com.xpertern.model.CartItem;
import com.xpertern.model.OrderItem;
import com.xpertern.model.Orders;
import com.xpertern.model.User;
import com.xpertern.repository.AddressRepository;
import com.xpertern.repository.OrderItemRepository;
import com.xpertern.repository.OrderRepository;
import com.xpertern.repository.UserRepository;

@Service
public class OrderServiceImplementation implements OrderService {

	
	private OrderRepository orderRepository;
	
	private UserRepository userRepository;
	private CartService cartService;
	
	private OrderItemRepository orderItemRepository;
	
	private AddressRepository addressRepository;

	public OrderServiceImplementation(OrderItemRepository orderItemRepository, AddressRepository addressRepository,
			CartService cartService, UserRepository userRepository, OrderRepository orderRepository) {

		this.orderRepository = orderRepository;
		this.userRepository = userRepository;
		this.cartService = cartService;
		this.addressRepository = addressRepository;
		this.orderItemRepository = orderItemRepository;
	}

	@Override
	public Orders createOrder(User user, Address shippingAddress) throws OrderException {

		shippingAddress.setUsername(user);
		Address address = addressRepository.save(shippingAddress);
		user.getAddress().add(address);
		userRepository.save(user);

		Cart cart = cartService.findUserCart(user.getId());
		List<OrderItem> orderItems = new ArrayList<OrderItem>();

		for (CartItem item : cart.getCartitems()) {

			OrderItem orderItem = new OrderItem();

			orderItem.setPrice(item.getPrice());
			orderItem.setProduct(item.getProduct());
			orderItem.setQuantity(item.getQuantity());
			orderItem.setSize(item.getSize());
			orderItem.setUserId(item.getUserId());
			orderItem.setDiscountedPrice(item.getDiscountPrice());

			OrderItem createdOrderItem = orderItemRepository.save(orderItem);

			orderItems.add(createdOrderItem);

		}
		Orders createdOrder = new Orders();

		createdOrder.setUser(user);
		createdOrder.setOrderItems(orderItems);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setTotalItem(cart.getTotalItem());

		createdOrder.setShippingAddress(address);
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.getPayment().setStatus("PENDING");
		createdOrder.setCreatedAt(LocalDateTime.now());

		Orders savedOrder = orderRepository.save(createdOrder);

		for (OrderItem item : orderItems) {
			item.setOrder(savedOrder);
			orderItemRepository.save(item);
		}

		return savedOrder;
	}

	@Override
	public Orders findOrderById(Long orderId) throws OrderException {
		Optional<Orders> opt = orderRepository.findById(orderId);

		if (opt.isPresent()) {
			return opt.get();
		}

		throw new OrderException("Order not exist with id " + orderId);
	}

	@Override
	public List<Orders> usersOrderHistory(Long userId) throws OrderException {
		List<Orders> orders = orderRepository.getUsersOrders(userId);

		return orders;
	}

	@Override
	public Orders confirmedOrder(Long orderId) throws OrderException {
		Orders order = findOrderById(orderId);
		order.setOrderStatus("CONFIRMED");
		return orderRepository.save(order);
	}

	@Override
	public Orders shippedOrder(Long orderId) throws OrderException {
		Orders order = findOrderById(orderId);
		order.setOrderStatus("SHIPPED");
		return orderRepository.save(order);
	}

	@Override
	public Orders deliveredOrder(Long orderId) throws OrderException {
		Orders order = findOrderById(orderId);
		order.setOrderStatus("DELIVERED");
		return orderRepository.save(order);
	}

	@Override
	public Orders placeOrder(Long orderId) throws OrderException {
		Orders order = findOrderById(orderId);
		order.setOrderStatus("PLACED");
		order.getPayment().setStatus("COMPLETED");
		return order;
	}

	@Override
	public Orders cancelOrder(Long orderId) throws OrderException {
		Orders order = findOrderById(orderId);
		order.setOrderStatus("CANCELLED");
		return orderRepository.save(order);
	}

	@Override
	public List<Orders> getAllOrders() {

		return orderRepository.findAll();
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		Orders order = findOrderById(orderId);
		orderRepository.deleteById(orderId);
	}

}
