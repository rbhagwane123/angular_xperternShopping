package com.xpertern.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.xpertern.model.Orders;

public interface OrderRepository extends JpaRepository<Orders, Long> {

	@Query("SELECT o FROM Orders o WHERE o.user.id= :userId AND (o.orderStatus IN ('CONFIRMED', 'PLACED', 'SHIPPED', 'DELIVERED'))")
	public List<Orders> getUsersOrders(@Param("userId") Long userId);
}
