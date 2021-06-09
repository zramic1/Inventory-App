import React from 'react';

export const urls = {
    url: {
        user: "http://localhost:8060/user",
        order: "http://localhost:8060/order",
        product: "http://localhost:8060/product",
        gateway: "http://localhost:8060"
    }
};

export const UrlContext = React.createContext(
    urls.url
);