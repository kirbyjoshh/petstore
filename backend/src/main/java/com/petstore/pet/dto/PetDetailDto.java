package com.petstore.pet.dto;

import java.math.BigDecimal;
import java.util.List;

public record PetDetailDto(
        Long id,
        String name,
        String category,
        String breed,
        int ageMonths,
        BigDecimal price,
        boolean available,
        String primaryPhotoUrl,
        String description,
        List<PhotoDto> photos
) {}
