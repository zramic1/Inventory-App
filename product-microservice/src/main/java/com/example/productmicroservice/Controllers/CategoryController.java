package com.example.productmicroservice.Controllers;

import com.example.productmicroservice.Models.Category;
import com.example.productmicroservice.Services.CategoryService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation("Returns list of all Categories in the system.")
    public List<Category> index()
    {
        return categoryService.index();
    }

    @GetMapping("/categories/{id}")
    @ApiOperation("Returns a specific Category by their identifier. 404 if does not exist.")
    public Category show(@PathVariable Long id)
    {
        return categoryService.show(id);
    }

    @PostMapping("/categories")
    @ApiOperation("Creates a new Category.")
    public ResponseEntity<Category> store(@Valid @RequestBody Category category)
    {
        return categoryService.store(category);
    }

    @PutMapping("/categories/{id}")
    @ApiOperation("Updates Category.")
    public Category update(@Valid @RequestBody Category category, @PathVariable Long id)
    {
        return categoryService.update(category, id);
    }

    @DeleteMapping(value = "/categories/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes a Category from the system. 404 if the category's identifier is not found.")
    public ResponseEntity delete(@PathVariable Long id)
    {
        return categoryService.delete(id);
    }

}
