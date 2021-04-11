package com.example.productmicroservice.Services;

import com.example.productmicroservice.Exceptions.CategoryNotFoundException;
import com.example.productmicroservice.Models.Category;
import com.example.productmicroservice.Repositories.CategoryRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> index()
    {
        return categoryRepository.findAll();
    }

    @Override
    public Category show(Long id)
    {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @Override
    public ResponseEntity<Category> store(Category category)
    {
        categoryRepository.save(category);

        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @Override
    public Category update(Category newCategory, Long id)
    {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setCategoryName(newCategory.getCategoryName());
                    return categoryRepository.save(category);
                })
                .orElseGet(() -> {
                    newCategory.setId(id);
                    return categoryRepository.save(newCategory);
                });
    }

    @Override
    public ResponseEntity delete(Long id)
    {
        JSONObject object = new JSONObject();

        if(categoryRepository.existsByid(id)) {
            categoryRepository.deleteById(id);
            object.put("message", "Category is successfully deleted");
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        }

        object.put("message", "Category does not exist");
        return new ResponseEntity<>(object.toString(), HttpStatus.NOT_FOUND);
    }
}
