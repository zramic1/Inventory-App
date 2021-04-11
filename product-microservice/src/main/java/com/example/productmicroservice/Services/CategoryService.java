package com.example.productmicroservice.Services;

import com.example.productmicroservice.Models.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    List<Category> index();
    Category show(Long id);
    ResponseEntity<Category> store(Category category);
    Category update(Category category, Long id);
    ResponseEntity delete(Long id);
}
