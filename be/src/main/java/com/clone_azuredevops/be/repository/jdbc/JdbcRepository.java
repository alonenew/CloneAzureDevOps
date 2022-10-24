// package com.car02.backend.repository.jdbc;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.jdbc.core.BeanPropertyRowMapper;
// import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
// import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
// import org.springframework.stereotype.Repository;

// import com.car02.backend.constant.StatusCode;
// import com.car02.backend.entity.jpa.sellcars.CarAds;
// import com.car02.backend.exception.BaseException;

// @Repository
// public class JdbcRepository {

//     @Autowired
// 	private NamedParameterJdbcTemplate template;
    
//     private static final String SELECT_USER = new StringBuilder("select i.image_path, c.ads_name, c.updated_date, c.ads_status from car_ads c inner join car_images i on c.car_ads_id = i.car_ads_id where c.cust_Id = :cust_Id and i.is_main_image = 1 order by c.ads_status asc, c.updated_date desc limit =:firstrow ,5").toString();
	
//     public List<CarAds> findAllByCustomerId(CarAds carAds) {
// 		List<CarAds> carAdses = null;
// 		try {
// 			MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource()
// 					.addValue("cust_Id",carAds.getCustomerId());                              
			
//                     carAdses = template.query(SELECT_USER, mapSqlParameterSource, new BeanPropertyRowMapper(CarAds.class));
// 			if((carAdses != null) && (!carAdses.isEmpty())) {
// 				carAds = carAdses.get(0);                
// 			}
// 		} catch (Exception e) {
// 			throw new BaseException(HttpStatus.OK, StatusCode.ERR_CODE_500, StatusCode.ERR_DESC_500);
// 		}
// 		return carAdses;
// 	}
// }
