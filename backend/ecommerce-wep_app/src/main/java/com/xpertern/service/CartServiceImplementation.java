package com.xpertern.service;

import org.springframework.stereotype.Service;

import com.xpertern.exception.ProductException;
import com.xpertern.model.Cart;
import com.xpertern.model.CartItem;
import com.xpertern.model.Product;
import com.xpertern.model.User;
import com.xpertern.repository.CartRepository;
import com.xpertern.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService {

	private CartRepository cartRepositoy;
	private CartItemService cartItemService;
	private ProductService productService;

	public CartServiceImplementation(CartRepository cartRepositoy, CartItemService cartItemService,
			ProductService productService) {

		this.cartRepositoy = cartRepositoy;
		this.cartItemService = cartItemService;
		this.productService = productService;
	}

	@Override
	public Cart createCart(User user) {

		Cart cart = new Cart();
		cart.setUser(user);

		return cartRepositoy.save(cart);
	}

	@Override
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException {

		Cart cart = cartRepositoy.findByUserId(userId);
		Product product = productService.findProductById(req.getProductId());
		
		CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);

		if (isPresent == null) {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(req.getQuantity());
			cartItem.setUserId(userId);

			int price = req.getQuantity() * product.getDiscountedPrice();
			cartItem.setPrice(price);
			cartItem.setSize(req.getSize());

			CartItem createdCartItem = cartItemService.createCartItem(cartItem);
			cart.getCartitems().add(createdCartItem);
		}
		return "Items Add to Cart";
	}

	@Override
	public Cart findUserCart(Long userId) {

		Cart cart = cartRepositoy.findByUserId(userId);

		int totalPrice = 0;
		int totalDiscountPrice = 0;
		int totalItem = 0;

		for (CartItem cartItem : cart.getCartitems()) {
			totalPrice = totalPrice + cartItem.getPrice();
			totalDiscountPrice = totalDiscountPrice + cartItem.getDiscountPrice();
			totalItem = totalItem + cartItem.getQuantity();
		}
		cart.setTotalPrice(totalPrice);
		cart.setTotalItem(totalItem);
		cart.setTotalDiscountedPrice(totalDiscountPrice);
		cart.setDiscount(totalPrice - totalDiscountPrice);

		return cartRepositoy.save(cart);
	}

}
