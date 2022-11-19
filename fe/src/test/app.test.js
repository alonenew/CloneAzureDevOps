// import React from "react";
// import { render } from './configTest';
// import { screen, fireEvent } from '@testing-library/react';
// import App from "../App";

// test("click new item", () => {
//   render(<App />);
  
//   //ทำการ Check ว่า Input ยังไม่ขึ้นให้ใส่
//   expect(screen.getByText('New item')).toBeInTheDocument();
//   expect(screen.queryByTestId('inputNewItem')).not.toBeInTheDocument();

//   //User ทำการกด Click ข้อความ New item
//   fireEvent.click(screen.getByText('New item'));

//   //ทำการ Check ว่า Input ยังขึ้นให้ใส่หลังจาก Click New item//
//   const inputNewitem = screen.getByTestId('inputNewItem');
//   expect(inputNewitem).toBeInTheDocument();
  
//   //กรอก Input : unit test
//   fireEvent.change(inputNewitem, { target: { value: 'unit test' } });

//   //ทำการ Check ว่า Input ที่กรอกตรงกับที่ต้องการไหม//
//   expect(inputNewitem.value).toBe('unit test');
  
// });