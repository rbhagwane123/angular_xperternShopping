package com.xpertern.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xpertern.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

}
