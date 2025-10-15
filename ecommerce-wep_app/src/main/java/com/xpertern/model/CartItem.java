package com.xpertern.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonIgnore
	@ManyToOne
	private Cart cart;
	
	private Long userId;

	@ManyToOne
	private Product product;

	private String size;

	private int quantity;

	private Integer price;
	private Integer discountPrice;

	public CartItem() {
		
	}

	
	public CartItem(Long id, Cart cart, Long userId, Product product, String size, int quantity, Integer price,
			Integer discountPrice) {
		super();
		this.id = id;
		this.cart = cart;
		this.userId = userId;
		this.product = product;
		this.size = size;
		this.quantity = quantity;
		this.price = price;
		this.discountPrice = discountPrice;
	}





	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Integer getDiscountPrice() {
		return discountPrice;
	}



	public void setDiscountPrice(Integer discountPrice) {
		this.discountPrice = discountPrice;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

}
