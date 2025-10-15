package com.xpertern.model;

import jakarta.persistence.Column;


public class PaymentInformation {

	@Column(name = "cardhoder_name")
	private String cardholderName;

	@Column(name = "card_number")
	private String carNumber;

	@Column(name = "expiration_date")
	private String expirationDate;

	@Column(name = "cvv")
	private String cvv;
	
	
}
