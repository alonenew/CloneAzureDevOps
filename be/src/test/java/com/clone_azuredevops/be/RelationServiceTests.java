package com.clone_azuredevops.be;

import static org.mockito.Mockito.verify;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.clone_azuredevops.be.model.relation.RelationRequest;
import com.clone_azuredevops.be.service.relation.RelationService;

import lombok.extern.slf4j.Slf4j;


@SpringBootTest
class TaskServiceTests {

	@Autowired
	private RelationService relationService;

	@Order(1)
	@Test
	void testAddRelationTrue() {
		RelationRequest relationRequest = new RelationRequest();
		relationRequest.setLinkType(1);
        relationRequest.setTaskId(1);
        relationRequest.setTaskLink(1);
        relationRequest.setCustomerId("2022110721603436-942c-4d75-bfed-9d553ae83ab3");

		Assertions.assertTrue(relationService.addRelation(relationRequest));

	}

	@Order(2)
	@Test
	void testAddRelationFalse() {
		RelationRequest relationRequest = new RelationRequest();
		relationRequest.setLinkType(1);
        relationRequest.setTaskId(1);
        relationRequest.setTaskLink(1);
        relationRequest.setCustomerId("2022110721603436-942c-4d75-bfed-9d553ae83ab3");

		Assertions.assertFalse(relationService.addRelation(relationRequest));
	}

	
}
