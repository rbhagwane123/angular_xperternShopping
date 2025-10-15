package com.xpertern.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xpertern.exception.OrderException;
import com.xpertern.exception.ProductException;
import com.xpertern.exception.UserException;
import com.xpertern.model.Orders;
import com.xpertern.model.Product;
import com.xpertern.model.Size;
import com.xpertern.model.User;
import com.xpertern.service.OrderService;
import com.xpertern.service.ProductService;
import com.xpertern.service.UserService;

@RestController
@RequestMapping("/api")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping("/products")
	public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String category,
			@RequestParam List<String> color, @RequestParam List<String> size, @RequestParam Integer minPrice,
			@RequestParam Integer maxPrice, @RequestParam Integer minDiscount, @RequestParam String sort,
			@RequestParam String stock, @RequestParam Integer pageNumber, @RequestParam Integer pageSize)
			throws ProductException, UserException {

		Page<Product> res = productService.getAllProduct(category, color, size, minPrice, maxPrice, minDiscount, sort,
				stock, pageNumber, pageSize);
		System.out.println("complete products");

		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}

	@GetMapping("/products/id/{productId}")
	public ResponseEntity<Product> findProductByCategoryHandler(@PathVariable Long productId)
			throws ProductException, UserException {

		Product product = productService.findProductById(productId);

		return new ResponseEntity<>(product, HttpStatus.ACCEPTED);
	}

}
