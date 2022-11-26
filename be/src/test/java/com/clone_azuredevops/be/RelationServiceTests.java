package com.clone_azuredevops.be;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.clone_azuredevops.be.model.relation.RelationRequest;
import com.clone_azuredevops.be.service.relation.RelationService;



@SpringBootTest
class RelationServiceTests {

	@Autowired
	private RelationService relationService;

	@Order(1)
	@Test
	void AddRelation_ShouldSuccess() {
		RelationRequest relationRequest = new RelationRequest();

		relationRequest.setLinkType(1);
        relationRequest.setTaskId(1);
        relationRequest.setTaskLink(3);
        relationRequest.setCustomerId("2022110721603436-942c-4d75-bfed-9d553ae83ab3");
		Boolean result = relationService.addRelation(relationRequest);
		// ให้ Id 3 เป็นพ่อ Id 1 ต้องเป็นจริง
		Assertions.assertTrue(result);
	}

	@Order(2)
	@Test
	void AddRelation_ShouldFail_WhenLinkTypeDupplicate() {
		RelationRequest relationRequest = new RelationRequest();
		relationRequest.setLinkType(1);
        relationRequest.setTaskId(1);
        relationRequest.setTaskLink(7);
        relationRequest.setCustomerId("2022110721603436-942c-4d75-bfed-9d553ae83ab3");
		Boolean result = relationService.addRelation(relationRequest);
		// ให้ Id 7 เป็นพ่อ Id 1 ต้องเป็นเท็จ
		Assertions.assertFalse(result);
	}

	@Order(3)
	@Test
	void RemoveRelation_ShouldThrowsNull_WhenNotFoundData() {
		Assertions.assertThrows(
			NullPointerException.class,
                () -> relationService.removeRelation(1111,5));
	}


	@Order(4)
	@Test
	void RemoveRelation_ShouldSuccess() {
		String result = relationService.removeRelation(1,3);
		Assertions.assertEquals(result, "Success");
	}




	
	
}
