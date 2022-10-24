package com.clone_azuredevops.be.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clone_azuredevops.be.entity.jpa.customers.Customer;
import com.clone_azuredevops.be.model.common.SuccessResponse;
import com.clone_azuredevops.be.model.user.CustomerAuthenResponse;
import com.clone_azuredevops.be.model.user.CustomerRegisterRequest;
import com.clone_azuredevops.be.model.user.CustomerSigninRequest;
import com.clone_azuredevops.be.model.user.CustomerSigninResponse;
import com.clone_azuredevops.be.service.user.CustomerService;


@RestController
@CrossOrigin()
@RequestMapping("/api/users")
public class CustomerController {
    
    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")        
    public ResponseEntity<SuccessResponse <Customer>> register(@RequestBody CustomerRegisterRequest customerRegisterRequest) {
        return ResponseEntity.ok(new SuccessResponse<Customer>(customerService.register(customerRegisterRequest)));
    }
    
    @PostMapping("/login")        
    public ResponseEntity<SuccessResponse<CustomerSigninResponse>> signin (@RequestBody CustomerSigninRequest customerSigninRequest){
        return ResponseEntity.ok(new SuccessResponse<CustomerSigninResponse>(customerService.signin(customerSigninRequest)));
    }

    @PostMapping("/relogin")        
    public ResponseEntity<SuccessResponse<CustomerSigninResponse>> reSignin (@RequestParam("id") String id){
        return ResponseEntity.ok(new SuccessResponse<CustomerSigninResponse>(customerService.reSignin(id)));
    }
    
    @GetMapping("/refresh-token")
    public ResponseEntity<SuccessResponse<CustomerAuthenResponse>> refreshToken (){
        return ResponseEntity.ok(new SuccessResponse<CustomerAuthenResponse>(customerService.refreshToken()));
    }


//     // @PostMapping("/carAds/search")
//     // public ResponseEntity<SuccessResponse<CarAdsResponse>> get(@RequestBody CarAdsRequest carAdsRequest) {
//     //   return ResponseEntity.ok(new SuccessResponse<CarAdsResponse>(sellCarsService.formEditPost(carAdsRequest)));
//     // }

//     @PostMapping("/carAds/detail")
//     public ResponseEntity<SuccessResponse<CarAdsResponse>> Detail (@RequestBody CarAdsRequest carAdsRequest) {
//       return ResponseEntity.ok(new SuccessResponse<CarAdsResponse>(buyCarService.formDetail(carAdsRequest)));
//     }

//     @PostMapping("/carAds/book")
// 	public TestCarResponse book (@RequestBody TestCarRequest testCarRequest){
// 		return buyCarService.book(testCarRequest);
// 	}

//     @PostMapping("/carAds/cancelbook")
// 	public TestCarResponse cancelbook (@RequestBody TestCarRequest testCarRequest){
// 		return buyCarService.cancelbook(testCarRequest);
// 	}

    @GetMapping("/customerall")
	public  List<Customer> findAll(){
		return customerService.findAll();
	}

//     @GetMapping("/vehicleAll")
// 	public  List <Vehicle>  findByVehicle(){
// 		return sellCarsService.findByVehicle();
// 	}

//     @GetMapping("/carImagesAll")
// 	public List<CarImages> carImagesAll(){
// 		return sellCarsService.findCarImagesAll();
// 	}

//     @GetMapping("/carAdsAll")
// 	public Page<CarAds> carAdsAll(){
// 		return buyCarService.findCarAds("published");
// 	}


//     @PostMapping("/customer")
// 	public CustomerRegisterResponse emailCustomer(@RequestBody CustomerRegisterRequest email){
// 		return customerService.findByEmail(email);
// 	}



//     @PatchMapping("/editCustomer")        
//     public ResponseEntity<SuccessResponse<CustomerRegisterResponse>> editCustomer (@RequestBody CustomerRegisterRequest customerRequest){
//         return ResponseEntity.ok(new SuccessResponse<CustomerRegisterResponse>(customerService.editcustomer(customerRequest)));
//     }

//     // @PostMapping("/carAds")
//     // public CustomerResponse idCustomer(@RequestBody CustomerRequest customerRequest){
//     //     return sellCarsService.CardPostCar(customerRequest);
//     // }

//     @GetMapping("/getAll")
// 	    public List<Customer>getAllCustomers(){
// 		return customerService.findCustomerAll();
// 	}



//     // @PostMapping("/sellCar")        
//     // public ResponseEntity<SuccessResponse<CarAdsResponse>> sellcar (@RequestBody CarAdsRequest carAdsRequest){
//     //     return ResponseEntity.ok(new SuccessResponse<CarAdsResponse>(sellCarsService.post(carAdsRequest)));
//     // }

//     // @PostMapping("/canclePost")        
//     // public ResponseEntity<SuccessResponse<CarAdsResponse>> canclePost (@RequestBody CarAdsRequest carAdsRequest){
//     //     return ResponseEntity.ok(new SuccessResponse<CarAdsResponse>(sellCarsService.canclePost(carAdsRequest)));
//     // }

//     // @PostMapping("/submitedit")        
//     // public ResponseEntity<SuccessResponse<CarAdsResponse>> editPost (@RequestBody CarAdsRequest carAdsRequest){
//     //     return ResponseEntity.ok(new SuccessResponse<CarAdsResponse>(sellCarsService.editPost(carAdsRequest)));
//     // }

//     // @PostMapping("/mycar/page/{pageNo}")        
//     // public Page<CarAds> mycar(@RequestBody CarAdsRequest carAdsRequest,@PathVariable Integer pageNo){
//     //     return sellCarsService.mycar(carAdsRequest,pageNo);
//     // }

//     // @PostMapping("/mycar/page/status/{pageNo}")        
//     // public Page<CarAds> statusMycar(@RequestBody CarAdsRequest carAdsRequest ,@PathVariable Integer pageNo){
//     //     return sellCarsService.statusMycar(carAdsRequest,pageNo);
//     // }

// 	// @PostMapping("/mycar/test")
// 	// public ResponseEntity<SuccessResponse<CarAds>> get(@RequestBody CarAds carAds){
// 	// 	return ResponseEntity.ok(new SuccessResponse<CarAds>(sellCarsService.findV2(carAds)));
// 	// }

// 	// @PostMapping("/mycar/test") // Jdbc Pagination
// 	// public List<CarAds> getAllTasks(@RequestBody CarAds carAds){
// 	// 	return sellCarsService.findV2(carAds);
// 	// }

//     // @PatchMapping("/update")      
//     // public ResponseEntity<SuccessResponse<User>> update(@RequestBody UserRequest userRequest){
//     //     return ResponseEntity.ok(new SuccessResponse<User>(userService.updateUser(userRequest)));
//     // }

    // @DeleteMapping("/delete")
    // public ResponseEntity<SuccessResponse<String>> delete(@RequestBody UserRequest userRequest) {
    //   userService.deleteUser(userRequest);
    //   return ResponseEntity.ok(new SuccessResponse<String>());
    // }


//     @GetMapping("/search")
// 	public List<CarAds> search(@RequestParam Integer vehicleId,@RequestParam Integer limit, @RequestParam Integer end){
// 		return buyCarService.search(vehicleId,"published",limit,end);
// 	}

//     @GetMapping("/searchbrand")
// 	public List<CarAds> searchBrand(@RequestParam String brand,@RequestParam Integer limit, @RequestParam Integer end){
// 		return buyCarService.searchBrand(brand,"published",limit,end);
// 	}


//     @GetMapping("/cardBuyCar")
// 	public List<CarAds> findAllByAdsStatus(@RequestParam Integer limit, @RequestParam Integer end){
// 		return buyCarService.findAllByAdsStatus("published",limit,end);
// 	}

//     @PostMapping("/calendar/{pageNo}")
//     public Page<TestCarCalendar> calendarBuy(@RequestBody CarAdsRequest carAdsRequest,@PathVariable Integer pageNo){
//          return buyCarService.calendarBuy(carAdsRequest, pageNo);
//     }

//     @PostMapping("/calendarsell/{pageNo}")
//     public Page<TestCarCalendar> calendarSell(@RequestBody CarAdsRequest carAdsRequest,@PathVariable Integer pageNo){
//          return buyCarService.calendarSell(carAdsRequest, pageNo);
//     }


//     @PostMapping("/notisell")
//     public Integer notiSell(@RequestBody CarAdsRequest carAdsRequest){
//          return buyCarService.notiSell(carAdsRequest);
//     }

//     @PostMapping("/clearsell")
//     public Integer clearSell(@RequestBody CarAdsRequest carAdsRequest){
//          return buyCarService.clearSell(carAdsRequest);
//     }

//     @PostMapping("/readsell")
//     public Integer readSell(@RequestBody TestCarRequest testCarRequest){
//          return buyCarService.readSell(testCarRequest);
//     }

//     // --- Favorite
//     // @PostMapping("/favorite")
// 	// public FavoriteResponse addFavorite(@RequestBody FavoriteRequest favoriteRequest){
// 	// 	return favoriteService.addFavorite(favoriteRequest);
// 	// }

//     // @PostMapping("/favoriteId")
// 	// public List<FavoriteResponse> findByCustomerId(@RequestBody FavoriteRequest favoriteRequest){
// 	// 	return favoriteService.findByCustomerId(favoriteRequest);
// 	// }

//     // @PatchMapping("/favorite/update")      
//     // public ResponseEntity<SuccessResponse<FavoriteResponse>> update(@RequestBody FavoriteRequest favoriteRequest){
//     //     return ResponseEntity.ok(new SuccessResponse<FavoriteResponse>(favoriteService.updatefavorit(favoriteRequest)));
//     // }

//     // @PostMapping("/favorite/search")
//     // public ResponseEntity<SuccessResponse<FavoriteResponse>> searchFrv (@RequestBody FavoriteRequest favoriteRequest) {
//     //   return ResponseEntity.ok(new SuccessResponse<FavoriteResponse>(favoriteService.searchFrv(favoriteRequest)));
//     // }



}

