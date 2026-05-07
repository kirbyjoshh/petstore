package com.petstore.pet;

public class PetNotFoundException extends RuntimeException {
    public PetNotFoundException(Long id) {
        super("Pet not found: " + id);
    }
}
