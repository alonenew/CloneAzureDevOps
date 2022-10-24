package com.clone_azuredevops.be.util;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class CustomJsonDateDeserializer extends JsonDeserializer<Date> {

	@Override
	public Date deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
		try {
			return DateUtil.rsDTTMFormat.parse(jsonParser.getText());
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
	}
    
}
