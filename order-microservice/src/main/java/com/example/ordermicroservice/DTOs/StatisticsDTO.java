package com.example.ordermicroservice.DTOs;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class StatisticsDTO {
    public ArrayList<Integer> listElements;

    public StatisticsDTO(){}

    public StatisticsDTO(ArrayList<Integer> listElements) {
        this.listElements = listElements;
    }

    public ArrayList<Integer> getListElements() {
        return listElements;
    }

    public void setListElements(ArrayList<Integer> listElements) {
        this.listElements = listElements;
    }
}
