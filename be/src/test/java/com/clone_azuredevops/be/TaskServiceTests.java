package com.clone_azuredevops.be;

import static org.mockito.Mockito.verify;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.clone_azuredevops.be.entity.jpa.discussion.Discussion;
import com.clone_azuredevops.be.entity.jpa.task.Task;
import com.clone_azuredevops.be.model.task.AddDetailRequest;
import com.clone_azuredevops.be.model.task.DiscussionRequest;
import com.clone_azuredevops.be.model.task.TaskRequest;
import com.clone_azuredevops.be.model.task.TaskResponse;
import com.clone_azuredevops.be.service.task.TaskService;

import lombok.extern.slf4j.Slf4j;


@SpringBootTest
class TaskServiceTests {

	@Autowired
	private TaskService taskService;

	interface MockData {
		String customerId = "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a";
		Integer taskId = 1;
		String status = "New";
		String assign = "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a";
		String description = "";
		String acceptance = "";
		Integer storyPoint  = 2;
		Integer priority = 2;
		Integer risk = 1;
		Integer area = 1;
		String discussion = "Test discussion";
		String createdBy = "Sittichai Thammawat";
		String name = "Test add new item";
	}	

	@Order(1)
	@Test
	void testAddItem() {
		TaskRequest taskRequest = new TaskRequest();
        taskRequest.setCustomerId(MockData.customerId);
        taskRequest.setName(MockData.name);
		TaskResponse taskResponse = taskService.addTask(taskRequest);

		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getStatus(), "New");
		Assertions.assertNull(taskResponse.getDiscussion());
		Assertions.assertEquals(taskResponse.getName(), MockData.name);
	}

	@Order(2)
	@Test
	void testAddDetail() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(MockData.taskId);
		addDetailRequest.setCustomerId(MockData.customerId);
		addDetailRequest.setStatus(MockData.status);
		addDetailRequest.setName(MockData.name);
		addDetailRequest.setAssign(MockData.assign);
		addDetailRequest.setDescription(MockData.description);
		addDetailRequest.setAcceptance(MockData.acceptance);
		addDetailRequest.setStoryPoint(MockData.storyPoint);
		addDetailRequest.setPriority(MockData.priority);
		addDetailRequest.setRisk(MockData.risk);
		addDetailRequest.setArea(MockData.area);
		addDetailRequest.setDiscussion(MockData.discussion);
		addDetailRequest.setCreatedBy(MockData.createdBy);

		TaskResponse taskResponse = taskService.addDetail(addDetailRequest);
		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getName(), MockData.name);
		Assertions.assertEquals(taskResponse.getCustomerId(), MockData.customerId);
	}

	@Order(3)
	@Test
	void testGetTask() {
		List<Task> task = taskService.getTask();
		Assertions.assertNotNull(task);
	}

	@Order(4)
	@Test
	void testGetTaskById() {
		TaskRequest taskRequest = new TaskRequest();
		taskRequest.setTaskId(MockData.taskId);

		TaskResponse taskResponse = taskService.getTaskById(taskRequest);
		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getTaskId(), MockData.taskId);
		Assertions.assertNotNull(taskResponse.getName());
		Assertions.assertNotNull(taskResponse.getCreatedBy());
	}

	@Order(5)
	@Test
	void testUpdateAssign() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(MockData.taskId);
		addDetailRequest.setCustomerId(MockData.customerId);
		addDetailRequest.setAssign("20221024c4b5c5c2-2684-42fd-b4f5-428563da2993");

		TaskResponse taskResponse = taskService.updateAssign(addDetailRequest);
		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getAssign(), "20221024c4b5c5c2-2684-42fd-b4f5-428563da2993");
		Assertions.assertNotEquals(taskResponse.getUpdateDate(), taskResponse.getCreatedDate());
	}

	@Order(6)
	@Test
	void testRemove() {
		TaskRequest taskRequest = new TaskRequest();
		taskRequest.setTaskId(29);

		Assertions.assertTrue(taskService.remove(taskRequest));
	}

	@Order(7)
	@Test
	void testUpdate() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(MockData.taskId);
		addDetailRequest.setCustomerId(MockData.customerId);
		addDetailRequest.setStatus("Active");

		TaskResponse taskResponse = taskService.update(addDetailRequest);
		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getStatus(), "Active");
		Assertions.assertNotEquals(taskResponse.getCreatedDate(), taskResponse.getUpdateDate());
	}
	
	@Order(8)
	@Test
	void testRemoveDiscusById() {

		DiscussionRequest discussionRequest = new DiscussionRequest();
		discussionRequest.setDiscusId("2022111759c1b28d-3092-49c8-872d-570cebed8377");

		Assertions.assertTrue(taskService.removeDiscusById(discussionRequest));
	}

	@Order(9)
	@Test
	void testGetDiscus() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(1);
		List<Discussion> discussionList = taskService.getDiscus(addDetailRequest);

		Assertions.assertNotNull(discussionList);
	}

	@Order(10)
	@Test
	void testUpdateDiscusById() {
		DiscussionRequest discussionRequest = new DiscussionRequest();
		discussionRequest.setDiscusId("2022111710328124-539f-43d3-bb6b-1b5bf194b7a7");
		discussionRequest.setComment("Update Comment");

		Discussion discussion = taskService.updateDiscusById(discussionRequest);
		Assertions.assertNotNull(discussion.getDiscusId());
		Assertions.assertEquals(discussion.getComment(), "Update Comment");
		Assertions.assertNotEquals(discussion.getCreatedDate(), discussion.getUpdateDate());
	}

}
