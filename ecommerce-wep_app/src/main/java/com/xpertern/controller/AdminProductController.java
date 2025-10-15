package com.xpertern.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.xpertern.model.Orders;
import com.xpertern.model.Product;
import com.xpertern.request.CreateProductRequest;
import com.xpertern.response.ApiResponse;
import com.xpertern.service.ProductService;

@RestController
@RequestMapping("/api/admin/product")
public class AdminProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/")
	public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest req) throws ProductException {
		System.out.println("Truying to print requet object data =: "+req);
		Product product = productService.createProduct(req);
		return new ResponseEntity<>(product, HttpStatus.CREATED);
	}

	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponse> DeleteOrderHandler(@PathVariable Long productId,
			@RequestHeader("Authorization") String jwt) throws ProductException {

		String mssg = productService.deleteProduct(productId);

		ApiResponse res = new ApiResponse();
		res.setMessage(mssg);
		res.setStatus(true);

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@GetMapping("/all")
	public ResponseEntity<List<Product>> findAllProduct() throws ProductException {
		List<Product> product = productService.findAllProduct();
		System.out.println("\nTrying to print the fecthed data size : " + product.size());

		return new ResponseEntity<List<Product>>(product, HttpStatus.CREATED);
	}

	@PutMapping("/{productId}/update")
	public ResponseEntity<Product> updateProduct(@PathVariable Product req, @PathVariable Long productId)
			throws ProductException {

		Product product = productService.updatProduct(productId, req);

		return new ResponseEntity<>(product, HttpStatus.CREATED);
	}

	@PostMapping("/creates")
	public ResponseEntity<ApiResponse> createMultipeProduct(@RequestBody CreateProductRequest[] req) {
		for (CreateProductRequest product : req) {
			productService.createProduct(product);
		}

		ApiResponse res = new ApiResponse();
		res.setMessage("product created successfully");
		res.setStatus(true);

		return new ResponseEntity<>(res, HttpStatus.CREATED);

	}
}
