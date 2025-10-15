package com.xpertern.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.xpertern.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{

}
