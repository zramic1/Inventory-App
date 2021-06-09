package com.example.ordermicroservice.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;
import java.nio.charset.Charset;

import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR;
import static org.springframework.http.HttpStatus.Series.SERVER_ERROR;

public class RestTemplateResponseErrorHandler implements ResponseErrorHandler {
    @Override
    public boolean hasError(ClientHttpResponse clientHttpResponse) throws IOException {
        return (clientHttpResponse.getStatusCode().series() == CLIENT_ERROR || clientHttpResponse.getStatusCode().series() == SERVER_ERROR);
    }

    @Override
    public void handleError(ClientHttpResponse clientHttpResponse) throws IOException {
        if (clientHttpResponse.getStatusCode().series() == SERVER_ERROR) {
            // handle SERVER_ERROR
        }
        else if (clientHttpResponse.getStatusCode().series() == HttpStatus.Series.CLIENT_ERROR) {
            if (clientHttpResponse.getStatusCode() == HttpStatus.NOT_FOUND) {
                String tijelo = StreamUtils.copyToString(clientHttpResponse.getBody(), Charset.defaultCharset());
                int pozicija1 = tijelo.indexOf("[\"");
                int pozicija2 = tijelo.indexOf("\"]");
                String poruke = tijelo.substring(pozicija1 + 2, pozicija2);
                throw new RecordNotFoundException(poruke);
            }
            else if(clientHttpResponse.getStatusCode()== HttpStatus.CONFLICT){
                String tijelo = StreamUtils.copyToString(clientHttpResponse.getBody(), Charset.defaultCharset());
                int pozicija1 = tijelo.indexOf("[\"");
                int pozicija2 = tijelo.indexOf("\"]");
                String poruke = tijelo.substring(pozicija1 + 2, pozicija2);
                throw new RecordNotFoundException(poruke);
            }
        }
    }
}
