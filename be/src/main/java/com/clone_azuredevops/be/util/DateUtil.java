package com.clone_azuredevops.be.util;

import java.security.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

public class DateUtil {
    public static final SimpleDateFormat rsDTTMFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

    public static String responseDateTime(Date date){
		return rsDTTMFormat.format(date);
	}
	
	public static String responseDateTime(Timestamp timestamp){
		return rsDTTMFormat.format(timestamp);
	}
}
