package com.example.productmicroservice.Repositories;

import com.example.productmicroservice.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
