package com.clone_azuredevops.be;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.clone_azuredevops.be.entity.jpa.discussion.Discussion;
import com.clone_azuredevops.be.entity.jpa.task.Task;
import com.clone_azuredevops.be.model.relation.RelationRequest;
import com.clone_azuredevops.be.model.relation.RemoveRelationRequest;
import com.clone_azuredevops.be.model.task.AddDetailRequest;
import com.clone_azuredevops.be.model.task.DiscussionRequest;
import com.clone_azuredevops.be.model.task.DiscussionResponse;
import com.clone_azuredevops.be.model.task.TaskRequest;
import com.clone_azuredevops.be.model.task.TaskResponse;
import com.clone_azuredevops.be.service.relation.RelationService;
import com.clone_azuredevops.be.service.task.TaskService;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class UnitTests {

	@Autowired
	private TaskService taskService;

	@Autowired
	private RelationService relationService;

	private static Integer taskId;
	private static Integer taskLink;
	private static String discusId;
	
	interface MockData {
		String customerId = "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a";
		Integer taskId = 1;
		String status = "New";
		String assign = "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a";
		String discussion = "Test Discusstion";
		String createdBy = "Sittichai Thammawat";
		String nameTaskId = "Test add new item";
		String nameTaskLink = "Test add new item";
	}	

	@Order(1)
	@Test
	void AddItem_ShouldTaskIdAndTaskLink_WhenAddItem_2Time() {
		TaskRequest taskRequest = new TaskRequest();
        taskRequest.setCustomerId(MockData.customerId);
        taskRequest.setName(MockData.nameTaskId);
		TaskResponse taskResponse = taskService.addTask(taskRequest);
		taskId = taskResponse.getTaskId();

		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getStatus(), "New");
		Assertions.assertEquals(taskResponse.getName(), MockData.nameTaskId);

		taskRequest = new TaskRequest();
        taskRequest.setCustomerId(MockData.customerId);
        taskRequest.setName(MockData.nameTaskLink);
		taskResponse = taskService.addTask(taskRequest);
		taskLink = taskResponse.getTaskId();
		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getStatus(), "New");
		Assertions.assertEquals(taskResponse.getName(), MockData.nameTaskLink);
	}

	@Order(2)
	@Test
	void AddDetail_ShouldDiscussion_WhenDiscussionIdMade() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(taskId);
		addDetailRequest.setCustomerId(MockData.customerId);
		addDetailRequest.setDiscussion(MockData.discussion);
		addDetailRequest.setCreatedBy(MockData.createdBy);

		DiscussionResponse discussionResponse = taskService.addDiscus(addDetailRequest);
		discusId = discussionResponse.getDiscusId();

		Assertions.assertNotNull(discussionResponse.getDiscusId());

	}

	@Order(3)
	@Test
	void GetTask_ShouldListTask() {
		List<Task> task = taskService.getTask();
		Assertions.assertTrue(!task.isEmpty());
	}

	@Order(4)
	@Test
	void GetTaskId_ShouldTaskId() {
		TaskRequest taskRequest = new TaskRequest();
		taskRequest.setTaskId(taskId);
		TaskResponse taskResponse = taskService.getTaskById(taskRequest);
		Assertions.assertEquals(taskResponse.getTaskId(), taskId);
	}

	@Order(5)
	@Test
	void UpdateAssign_ShouldAssign() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(taskId);
		addDetailRequest.setCustomerId(MockData.customerId);
		addDetailRequest.setAssign(MockData.assign);

		TaskResponse taskResponse = taskService.updateAssign(addDetailRequest);
		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getAssign(), MockData.assign);
	}

	@Order(6)
	@Test
	void UpdateStatus_ShouldStatusActive() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(taskId);
		addDetailRequest.setCustomerId(MockData.customerId);
		addDetailRequest.setStatus("Active");
		TaskResponse taskResponse = taskService.update(addDetailRequest);

		Assertions.assertEquals(taskResponse.getTaskId(), taskId);
		Assertions.assertEquals(taskResponse.getStatus(), "Active");
		Assertions.assertNotEquals(taskResponse.getCreatedDate(), taskResponse.getUpdateDate());
	}

	@Order(7)
	@Test
	void GetDiscus_ShouldListDiscussion() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(taskId);
		List<Discussion> discussionList = taskService.getDiscus(addDetailRequest);
		Assertions.assertFalse(discussionList.isEmpty());
	}

	@Order(8)
	@Test
	void UpdateDiscusById_ShouldEditCommentAndUpdateDate() {
		DiscussionRequest discussionRequest = new DiscussionRequest();
		discussionRequest.setDiscusId(discusId);
		discussionRequest.setComment("New Comment");
		Discussion discussion = taskService.updateDiscusById(discussionRequest);
		Assertions.assertEquals(discussion.getComment(), "New Comment");
		Assertions.assertNotEquals(discussion.getCreatedDate(), discussion.getUpdateDate());
	}

	@Order(9)
	@Test
	void AddRelation_ShouldSuccess() {
		RelationRequest relationRequest = new RelationRequest();
		relationRequest.setLinkType(1);
        relationRequest.setTaskId(taskId);
        relationRequest.setTaskLink(taskLink);
        relationRequest.setCustomerId(MockData.customerId);
		Boolean result = relationService.addRelation(relationRequest);
		Assertions.assertTrue(result);
	}

	@Order(10)
	@Test
	void RemoveByDiscusId_ShouldSuccess() {
		DiscussionRequest discussionRequest = new DiscussionRequest();
		discussionRequest.setDiscusId(discusId);
		Assertions.assertTrue(taskService.removeDiscusById(discussionRequest));
	}

	@Order(11)
	@Test
	void AddRelation_ShouldFail_WhenLinkTypeDupplicate() {
		RelationRequest relationRequest = new RelationRequest();
		relationRequest.setLinkType(1);
        relationRequest.setTaskId(taskId);
        relationRequest.setTaskLink(0);
        relationRequest.setCustomerId(MockData.customerId);
		Boolean result = relationService.addRelation(relationRequest);
		Assertions.assertFalse(result);
	}

	@Order(12)
	@Test
	void RemoveRelation_ShouldThrowsNull_WhenNotFoundData() {
		RemoveRelationRequest removeRelation = new RemoveRelationRequest();
		removeRelation.setTaskId(taskId);
		removeRelation.setTaskLink(0);
		Assertions.assertThrows(
			NullPointerException.class,
                () -> relationService.removeRelation(removeRelation));
	}


	@Order(13)
	@Test
	void RemoveRelation_ShouldSuccess() {
		RemoveRelationRequest removeRelation = new RemoveRelationRequest();
		removeRelation.setTaskId(taskId);
		removeRelation.setTaskLink(taskLink);
		String result = relationService.removeRelation(removeRelation);
		Assertions.assertEquals(result, "Success");
	}

	@Order(14)
	@Test
	void RemoveByTaskId_ShouldSuccess() {
		TaskRequest taskRequest = new TaskRequest();
		taskRequest.setTaskId(taskId);
		Assertions.assertTrue(taskService.remove(taskRequest));

		taskRequest = new TaskRequest();
		taskRequest.setTaskId(taskLink);
		Assertions.assertTrue(taskService.remove(taskRequest));
	}

}
