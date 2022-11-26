package com.clone_azuredevops.be;

import java.util.Arrays;
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

@SpringBootTest
class TaskServiceTests {

	@Autowired
	private TaskService taskService;

	interface MockData {
		String customerId = "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a";
		Integer taskId = 1;
		String status = "New";
		String assign = "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a";
		String discussion = "Test Discusstion";
		String createdBy = "Sittichai Thammawat";
		String name = "Test add new item";
	}	

	@Order(1)
	@Test
	void AddItem_ShouldTaskId() {
		TaskRequest taskRequest = new TaskRequest();
        taskRequest.setCustomerId(MockData.customerId);
        taskRequest.setName(MockData.name);
		//ทำการสร้าง TaskId ที่ 37
		TaskResponse taskResponse = taskService.addTask(taskRequest);

		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getTaskId(), 37);
		Assertions.assertEquals(taskResponse.getStatus(), "New");
		Assertions.assertEquals(taskResponse.getName(), MockData.name);
	}

	@Order(2)
	@Test
	void AddDetail_ShouldDiscussion_WhenDiscussionIdMade() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		//ทำการสร้าง เพิ่มข้อความลง Discussion ที่ Id = 37
		addDetailRequest.setTaskId(37);
		addDetailRequest.setCustomerId(MockData.customerId);
		addDetailRequest.setName(MockData.name);
		addDetailRequest.setStatus(MockData.status);
		addDetailRequest.setDiscussion(MockData.discussion);
		addDetailRequest.setCreatedBy(MockData.createdBy);
		TaskResponse taskResponse = taskService.addDetail(addDetailRequest);

		Assertions.assertNotNull(taskResponse.getDiscussion());
		Assertions.assertNotEquals(taskResponse.getCreatedDate(), taskResponse.getUpdateDate());
	}

	@Order(3)
	@Test
	void GetTask_ShouldListTask() {
		List<Task> task = taskService.getTask();
		Assertions.assertNotNull(task);
	}

	@Order(4)
	@Test
	void GetTaskId_ShouldTaskId() {
		TaskRequest taskRequest = new TaskRequest();
		taskRequest.setTaskId(37);

		TaskResponse taskResponse = taskService.getTaskById(taskRequest);
		Assertions.assertEquals(taskResponse.getTaskId(), 37);
	}

	@Order(5)
	@Test
	void UpdateAssign_ShouldAssign() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(37);
		addDetailRequest.setCustomerId(MockData.customerId);
		addDetailRequest.setAssign("20221024c4b5c5c2-2684-42fd-b4f5-428563da2993");

		TaskResponse taskResponse = taskService.updateAssign(addDetailRequest);
		Assertions.assertNotNull(taskResponse.getTaskId());
		Assertions.assertEquals(taskResponse.getAssign(), "20221024c4b5c5c2-2684-42fd-b4f5-428563da2993");
	}

	@Order(6)
	@Test
	void UpdateStatus_ShouldStatusActive() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(37);
		addDetailRequest.setCustomerId(MockData.customerId);
		addDetailRequest.setStatus("Active");
		TaskResponse taskResponse = taskService.update(addDetailRequest);

		Assertions.assertEquals(taskResponse.getTaskId(), 37);
		Assertions.assertEquals(taskResponse.getStatus(), "Active");
		Assertions.assertNotEquals(taskResponse.getCreatedDate(), taskResponse.getUpdateDate());
	}

	@Order(7)
	@Test
	void RemoveByDiscusId_ShouldSuccess() {

		DiscussionRequest discussionRequest = new DiscussionRequest();
		discussionRequest.setDiscusId("202211244fc6b409-77ef-4a1e-8d29-c65b61e08582");
		Assertions.assertTrue(taskService.removeDiscusById(discussionRequest));
	}

	@Order(8)
	@Test
	void GetDiscus_ShouldListDiscussion() {
		AddDetailRequest addDetailRequest = new AddDetailRequest();
		addDetailRequest.setTaskId(1);
		List<Discussion> discussionList = taskService.getDiscus(addDetailRequest);
		Assertions.assertFalse(discussionList.isEmpty());
	}

	@Order(9)
	@Test
	void UpdateDiscusById_ShouldEditCommentAndUpdateDate() {
		DiscussionRequest discussionRequest = new DiscussionRequest();
		discussionRequest.setDiscusId("2022111710328124-539f-43d3-bb6b-1b5bf194b7a7");
		discussionRequest.setComment("New Comment");

		Discussion discussion = taskService.updateDiscusById(discussionRequest);
		Assertions.assertEquals(discussion.getComment(), "New Comment");
		Assertions.assertNotEquals(discussion.getCreatedDate(), discussion.getUpdateDate());
	}

	@Order(10)
	@Test
	void RemoveByTaskId_ShouldSuccess() {
		TaskRequest taskRequest = new TaskRequest();
		taskRequest.setTaskId(37);
		Assertions.assertTrue(taskService.remove(taskRequest));
	}

}
