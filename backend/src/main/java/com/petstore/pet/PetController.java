package com.petstore.pet;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petstore.pet.dto.PetDetailDto;
import com.petstore.pet.dto.PetSummaryDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/pets")
@Tag(name = "Pets", description = "Browse and view pet listings")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    @Operation(summary = "List pets", description = "Returns a paginated list of pets. Optionally filter by one or more categories.")
    public ResponseEntity<Page<PetSummaryDto>> getPets(
            @Parameter(description = "Filter by category. Allowed: DOG, CAT, BIRD, FISH. Repeatable.")
            @RequestParam(required = false) List<Category> category,
            @PageableDefault(size = 12) Pageable pageable) {

        if (pageable.getPageSize() > 50) {
            return ResponseEntity.badRequest().build();
        }
        Page<PetSummaryDto> result = petService.getAllPets(category, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get pet detail", description = "Returns full detail for a single pet by its ID.")
    public ResponseEntity<PetDetailDto> getPetById(
            @Parameter(description = "Pet ID") @PathVariable Long id) {
        PetDetailDto detail = petService.getPetById(id);
        return ResponseEntity.ok(detail);
    }
}
