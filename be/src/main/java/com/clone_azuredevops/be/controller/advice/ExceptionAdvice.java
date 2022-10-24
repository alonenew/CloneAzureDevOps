package com.clone_azuredevops.be.controller.advice;

import com.clone_azuredevops.be.constant.StatusCode;
import com.clone_azuredevops.be.exception.BusinessException;
import com.clone_azuredevops.be.model.common.ErrorResponse;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ExceptionAdvice extends ResponseEntityExceptionHandler {
    
    private	Log log = LogFactory.getLog(ExceptionAdvice.class);

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		List<String> errors = ex.getBindingResult()
			.getFieldErrors()
			.stream()
			.map(DefaultMessageSourceResolvable::getDefaultMessage)
			.collect(Collectors.toList());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
			new ErrorResponse<List<String>>(StatusCode.ERR_CODE_400, StatusCode.ERR_DESC_400, errors)
		);
	}

	// @Override
	// protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
	// 	Map<String, String> errors = new HashMap<String, String>();
	// 	ex.getBindingResult().getFieldErrors().forEach(error -> {
	// 		errors.put(error.getField(), error.getDefaultMessage());
	// 	});
	// 	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
	// 		new ErrorResponse<Map<String, String>>(StatusCode.ERR_CODE_400, StatusCode.ERR_DESC_400, errors)
	// 	);
	// }

	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<Object> handleBusinessException(BusinessException ex){
		ex.printStackTrace();
		log.error(ex.getMessage());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
			new ErrorResponse<Object>(ex.getCode(), ex.getMessage())
		);
	}
    
}
