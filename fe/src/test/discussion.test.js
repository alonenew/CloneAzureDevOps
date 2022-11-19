// import React from "react";
// import { render } from './configTest';
// import { screen, fireEvent, queryByTestId } from '@testing-library/react';
// import Discussion from "../components/items/detail/Discussion";
// import { act } from "react-dom/test-utils";

// test("Check textarea discussion", async () => {
//   await act(async () => {
//     render(<Discussion />)
//   });

//   let placeholder = "Add a comment. Use # to link a work item, ! to link a pull request, or @ to mention a person.";
//   expect(await screen.findByText('สธ')).toBeInTheDocument();
//   expect(await screen.findByPlaceholderText(placeholder)).toBeInTheDocument();

// });

// test("Add discussion", async () => {
//   await act(async () => {
//     render(<Discussion />)
//   });

//   let inputDiscus = screen.getByTestId('inputDiscus');
//   fireEvent.change(inputDiscus, { target: { value: 'Test Comment' } });
//   expect(inputDiscus.value).toBe('Test Comment');

//   expect(await screen.findByText('ST')).toBeInTheDocument();
//   expect(await screen.findByText('Old Comment')).toBeInTheDocument();

// });

// test("Check old discussion", async () => {
//   await act(async () => {
//     render(<Discussion />)
//   });

//   expect(await screen.findByText('ST')).toBeInTheDocument();
//   expect(await screen.findByText('Old Comment')).toBeInTheDocument();

// });