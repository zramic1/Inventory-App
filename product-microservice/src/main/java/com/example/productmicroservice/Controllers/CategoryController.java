package com.example.productmicroservice.Controllers;

import com.example.productmicroservice.Models.Category;
import com.example.productmicroservice.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> index()
    {
        return categoryService.index();
    }

    @GetMapping("/categories/{id}")
    public Category show(@PathVariable Long id)
    {
        return categoryService.show(id);
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> store(@Valid @RequestBody Category category)
    {
        return categoryService.store(category);
    }

    @PutMapping("/categories/{id}")
    public Category update(@Valid @RequestBody Category category, @PathVariable Long id)
    {
        return categoryService.update(category, id);
    }

    @DeleteMapping(value = "/categories/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable Long id)
    {
        return categoryService.delete(id);
    }

}
