package com.xpertern.response;

public class ApiResponse {
	String message;
	Boolean Status;
	
	public ApiResponse() {
		// TODO Auto-generated constructor stub
	}
	
	public ApiResponse(String message, Boolean Status) {
		super();
		this.message = message;
		this.Status = Status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Boolean getStatus() {
		return Status;
	}

	public void setStatus(Boolean Status) {
		this.Status = Status;
	}
	
	
	
	

}
