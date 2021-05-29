package com.example.ordermicroservice.DTOs;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class StatisticsDTO {
    public int[] listElements;

    public StatisticsDTO(){}

    public StatisticsDTO(int[] listElements) {
        this.listElements = listElements;
    }

    public int[] getListElements() {
        return listElements;
    }

    public void setListElements(int[] listElements) {
        this.listElements = listElements;
    }
}
