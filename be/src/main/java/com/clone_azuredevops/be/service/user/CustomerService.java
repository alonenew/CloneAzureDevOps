package com.clone_azuredevops.be.service.user;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import com.clone_azuredevops.be.constant.StatusCode;
import com.clone_azuredevops.be.entity.jpa.customers.Customer;
import com.clone_azuredevops.be.exception.BaseException;
import com.clone_azuredevops.be.model.user.CustomerAuthenRequest;
import com.clone_azuredevops.be.model.user.CustomerAuthenResponse;
import com.clone_azuredevops.be.model.user.CustomerRegisterRequest;
import com.clone_azuredevops.be.model.user.CustomerSigninRequest;
import com.clone_azuredevops.be.model.user.CustomerSigninResponse;
import com.clone_azuredevops.be.repository.jpa.CustomerRepository;
import com.clone_azuredevops.be.security.config.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    // @Autowired
    // private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CustomerRepository customerRepository;


    @Transactional
    public Customer register(CustomerRegisterRequest customerRegisterRequest) {
        Customer customer = new Customer();
        UUID uuid = UUID.randomUUID();
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        customer.setCustomerId(dateFormat.format(date) + uuid.toString());
        customer.setEmail(customerRegisterRequest.getEmail());
        customer.setPassword(customerRegisterRequest.getPassword());
        customer.setFirstName(customerRegisterRequest.getFirstName());
        customer.setLastName(customerRegisterRequest.getLastName());
        customer.setCreatedDate(date);

        // customer.setPassword(passwordEncoder.encode(customerRegisterRequest.getPassword()));
        return customerRepository.save(customer);
    }

    public CustomerSigninResponse signin(CustomerSigninRequest customerSigninRequest) {
        Customer customer = customerRepository.findByEmail(customerSigninRequest.getEmail());
        if (customer == null) {
            throw new BaseException(HttpStatus.UNAUTHORIZED, StatusCode.ERR_CODE_401, StatusCode.ERR_DESC_401);
        };
        String rawPassword = customer.getPassword();
        String signinPassword = customerSigninRequest.getPassword();
        if (!(signinPassword.equals(rawPassword))) {
            throw new BaseException(HttpStatus.UNAUTHORIZED, StatusCode.ERR_CODE_401, StatusCode.ERR_DESC_401);
        }
        String token = jwtUtil.generateToken(customer.getCustomerId());

        CustomerSigninResponse customerSigninResponse = new CustomerSigninResponse();
        customerSigninResponse.setCustomerId(customer.getCustomerId());
        customerSigninResponse.setName(customer.getFirstName()+" "+customer.getLastName());
        customerSigninResponse.setToken(token);
       return customerSigninResponse;
    }

    public CustomerSigninResponse reSignin(String id) {
        Customer customer = customerRepository.findByCustomerId(id);
        if (customer == null) {
            throw new BaseException(HttpStatus.UNAUTHORIZED, StatusCode.ERR_CODE_401, StatusCode.ERR_DESC_401);
        };
        String token = jwtUtil.generateToken(customer.getCustomerId());

        CustomerSigninResponse customerSigninResponse = new CustomerSigninResponse();
        customerSigninResponse.setCustomerId(customer.getCustomerId());
        customerSigninResponse.setName(customer.getFirstName()+" "+customer.getLastName());
        customerSigninResponse.setToken(token);
       return customerSigninResponse;
    }

    public CustomerAuthenResponse refreshToken() {
        String id = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String token = jwtUtil.generateToken(id);
        CustomerAuthenResponse customerAuthenResponse = new CustomerAuthenResponse();
        customerAuthenResponse.setToken(token);
        return customerAuthenResponse;
    }

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

//     public CustomerRegisterResponse findByEmail(CustomerRegisterRequest customerRegisterRequest) {
//         Customer customer = customerRepository.findByEmail(customerRegisterRequest.getEmail());
//         CustomerRegisterResponse customerResponse = new CustomerRegisterResponse();
//         customerResponse.setCustomerId(customer.getCustomerId());
//         customerResponse.setEmail(customer.getEmail());
//         customerResponse.setFirstName(customer.getFirstName());
//         customerResponse.setLastName(customer.getLastName());
//         return customerResponse;
//     }

    public CustomerSigninResponse findByCustomerId(CustomerSigninRequest customerSigninRequest) {
        Customer customer = customerRepository.findByCustomerId(customerSigninRequest.getCustomerId());
        CustomerSigninResponse customerResponse = new CustomerSigninResponse();
        customerResponse.setCustomerId(customer.getCustomerId());
        customerResponse.setEmail(customer.getEmail());
        customerResponse.setName(customer.getFirstName()+" "+customer.getLastName());
        return customerResponse;
    }

//     @Transactional
//     public CustomerRegisterResponse editcustomer(CustomerRegisterRequest customerRequest) {
  
//         Customer customer = customerRepository.findByEmail(customerRequest.getEmail());
//         CustomerRegisterResponse customerResponse = new CustomerRegisterResponse();
//         customer.setCustomerId(customerRequest.getCustomerId());
//         customer.setEmail(customerRequest.getEmail());
//         customer.setFirstName(customerRequest.getFirstName());
//         customer.setLastName(customerRequest.getLastName());
//         customerRepository.save(customer);

//         customerResponse.setEmail(customer.getEmail());
//         customerResponse.setFirstName(customer.getFirstName());
//         customerResponse.setLastName(customer.getLastName());
//         return customerResponse;
//     }   


    // @Transactional
    // public void deleteUser(UserRequest userRequest){
    // User deleteUser = userRepository.findByUserName(userRequest.getUserName());
    // if(deleteUser != null) {
    // throw new BusinessException(StatusCode.ERR_CODE_401,
    // StatusCode.ERR_DESC_401);
    // }
    // userRepository.delete(deleteUser);
    // }

}
