package com.petstore.pet;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pet_photos")
public class PetPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(name = "is_primary", nullable = false)
    private boolean isPrimary = false;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder = 0;

    public Long getId() { return id; }
    public Pet getPet() { return pet; }
    public String getUrl() { return url; }
    public boolean isPrimary() { return isPrimary; }
    public int getSortOrder() { return sortOrder; }

    public void setPet(Pet pet) { this.pet = pet; }
    public void setUrl(String url) { this.url = url; }
    public void setIsPrimary(boolean isPrimary) { this.isPrimary = isPrimary; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
