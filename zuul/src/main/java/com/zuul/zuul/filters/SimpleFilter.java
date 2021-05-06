package com.zuul.zuul.filters;

import javax.servlet.http.HttpServletRequest;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.ZuulFilter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;


public class SimpleFilter extends ZuulFilter {

  private static Logger log = LoggerFactory.getLogger(SimpleFilter.class);

  @Autowired
  private RestTemplate restTemplate;

  @Override
  public String filterType() {
    return "pre";
  }

  @Override
  public int filterOrder() {
    return 1;
  }

  @Override
  public boolean shouldFilter() {
    return false;
  }

  @Override
  public Object run() {
    RequestContext ctx = RequestContext.getCurrentContext();
    HttpServletRequest request = ctx.getRequest();

    log.info(String.format("%s request to %s", request.getMethod(), request.getRequestURL().toString()));
    String token = request.getHeader("Authorization");
    System.out.println("Token is: ");
    System.out.println(token);

    HttpHeaders headers = new HttpHeaders();
    headers.add("Authorization", token);
    HttpEntity<String> entity = new HttpEntity<>(headers);

    ResponseEntity response = null;
    try {
      response = restTemplate.exchange("http://security-jwt/check/", HttpMethod.GET, entity, String.class);
    } catch (HttpClientErrorException e) {
      System.out.println("An error has occurred!");
      setFailedRequest("Token is invalid!", 403);
    }

    System.out.println(response);
    return null;
  }

  private void setFailedRequest(String body, int code) {
    log.debug("Reporting error ({}): {}", code, body);

    RequestContext ctx = RequestContext.getCurrentContext();
    ctx.setResponseStatusCode(code);
    if (ctx.getResponseBody() == null) {
      ctx.setResponseBody(body);
      ctx.setSendZuulResponse(false);
    }
  }

}