package com.clone_azuredevops.be.util;

import java.io.IOException;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class CustomJsonDateSerializer extends JsonSerializer<Date> {

	@Override
	public void serialize(Date date, JsonGenerator gen, SerializerProvider serializers) throws IOException {
          gen.writeString(DateUtil.rsDTTMFormat.format(date));
	}
    
}