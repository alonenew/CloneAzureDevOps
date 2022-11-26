import React from "react";
import { render } from './configTest';
import { screen, fireEvent, queryByTestId } from '@testing-library/react';
import Description from "../components/items/detail/Description";
import { act } from "react-dom/test-utils";
import ItemDnD from "../components/items/item/ItemDnD";
import HeaderDetail from "../components/items/detail/HeaderDetail";
import DetailModal from "../components/items/detail/DetailModal";

// mock data
const mockData = {
  "discussion": [
      {
          "discusId": "202211147fc59e74-3524-4bfe-aa12-85387a8dbd32",
          "customerId": "2022110721603436-942c-4d75-bfed-9d553ae83ab3",
          "taskId": 1,
          "comment": "Comment",
          "createdDate": "2022-11-14T06:02:35.000+00:00",
          "createdBy": "สิทธิชัย ธรรมวัตร",
          "updateDate": "2022-11-14T06:02:35.000+00:00",
          "updateBy": "2022110721603436-942c-4d75-bfed-9d553ae83ab3"
      }
  ],
  "relations": [
      {
          "relationId": "202210261b032864-2353-407b-8a4e-c2f8325c1fb4",
          "linkType": 1,
          "taskId": 1,
          "taskLink": 4,
          "comment": null,
          "createdDate": "2022-10-26T08:05:04.000+00:00",
          "createdBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef",
          "updateDate": "2022-10-26T08:05:04.000+00:00",
          "updateBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef"
      },
      {
          "relationId": "202210263dbb1fe1-2677-4a6b-aa33-47a28dfecc56",
          "linkType": 2,
          "taskId": 1,
          "taskLink": 6,
          "comment": null,
          "createdDate": "2022-10-26T08:05:22.000+00:00",
          "createdBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef",
          "updateDate": "2022-10-26T08:05:22.000+00:00",
          "updateBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef"
      },
      {
          "relationId": "202210268c19833c-6367-401a-bf35-8a54b089b1bf",
          "linkType": 2,
          "taskId": 1,
          "taskLink": 5,
          "comment": null,
          "createdDate": "2022-10-26T08:05:22.000+00:00",
          "createdBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef",
          "updateDate": "2022-10-26T08:05:22.000+00:00",
          "updateBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef"
      }
  ],
  "taskId": 1,
  "customerId": "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a",
  "name": "Main",
  "status": "Resolved",
  "type": "User Story",
  "assign": null,
  "priority": 2,
  "storyPoint": null,
  "risk": null,
  "area": 1,
  "description": null,
  "acceptance": null,
  "createdDate": "2022-10-24T12:36:03.000+00:00",
  "createdBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef",
  "updateDate": "2022-11-14T06:02:35.000+00:00",
  "updateBy": "2022110721603436-942c-4d75-bfed-9d553ae83ab3"
}

// test("Tab open description", async () => {
//   await act(async () => {
//     render(<Description item={mockData}/>)
//   });
//   expect(await screen.getByText('Description')).toBeInTheDocument();
//   fireEvent.click(screen.getByText('Description'));
//   expect(await screen.queryByTestId('inputDescription')).not.toBeInTheDocument();
//   fireEvent.click(screen.getByText('Description'));
//   let description = await screen.findByPlaceholderText('Click to add Description');
//   expect(description).toBeInTheDocument();

// });

// test("Add description", async () => {
//   await act(async () => {
//     render(<Description item={mockData}/>)
//   });
//   expect(await screen.getByText('Description')).toBeInTheDocument();
//   let description = await screen.findByPlaceholderText('Click to add Description');
//   expect(description).toBeInTheDocument();
//   fireEvent.change(description, { target: { value: 'Test Description' } });
//   expect(description.value).toBe('Test Description');
// });

// test("Tab open acceptance", async () => {
//   await act(async () => {
//     render(<Description item={mockData}/>)
//   });
//   expect(screen.getByText('Acceptance Criteria')).toBeInTheDocument();
//   fireEvent.click(screen.getByText('Acceptance Criteria'));

//   expect(await screen.queryByTestId('inputAcceptance')).not.toBeInTheDocument();
//   fireEvent.click(screen.getByText('Acceptance Criteria'));
//   let acceptance = await screen.findByPlaceholderText('Click to add Acceptance Criteria');
//   expect(acceptance).toBeInTheDocument();
// });

test("Add acceptance", async () => {
  await act(async () => {
    render(<Description item={mockData}/>)
  });

  let acceptance = await screen.findByPlaceholderText('Click to add Acceptance Criteria');
  expect(acceptance).toBeInTheDocument();
  fireEvent.change(acceptance, { target: { value: 'Test Acceptance' } });
  expect(acceptance.value).toBe('Test Acceptance');

});  


test("Test select", async () => {
  await act(async () => {
    render(<DetailModal  />)
  });

  
  expect(await screen.queryByTestId('select-test')).toBeInTheDocument();
  screen.debug();
});