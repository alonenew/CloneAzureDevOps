import React, { useEffect, useState } from "react";
import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BoardDnD from "../../components/items/item//BoardDnD";
import { useDispatch } from "react-redux";
import { active, add, close, getTask, resolved } from "../../store/slices/itemSlice";

export default function Main() {
  const dispatch = useDispatch();

  const [value, setValue] = useState("1");


  useEffect(() => {
    dispatch(getTask())
      .unwrap()
      .then(res => {
        res.response.map((item) => {
          if(item.status === "New"){
            return dispatch(add(item));
          }else if(item.status === "Active"){
            return dispatch(active(item));
          }else if(item.status === "Resolved"){
            return dispatch(resolved(item));
          }else{
            return dispatch(close(item));
          } 
        })
    })// eslint-disable-next-line
  },[]);


  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className='pl-3 relative grow min-h-[calc(100vh-48px)]'>
      <TabContext value={value}>
        <Box className="flex flex-col h-full">
          <Box>
            <Box className="py-3 pl-2.5 flex items-center">
              <img src="https://www.svgrepo.com/show/379476/kanban-board.svg" width={22} alt="" />
              <Typography variant='body1' ml={1} >Miniproject Team</Typography>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: "Boxider" }}>
              <TabList onChange={handleChange} style={{paddingLeft: 10 }}>
                <Tab
                  style={{ minWidth: 40, padding: 0, marginRight: 15 }}
                  label={<Typography variant='caption' className="normal-case font-bold font-sans">Board</Typography>} value="1" />
                <Tab
                  style={{ minWidth: 50, padding: 0 }}
                  label={<Typography variant='caption' className="normal-case font-bold font-sans">Analytics</Typography>} value="2" />
              </TabList>
            </Box>
          </Box>
          <Box className="grow">
            <TabPanel value="1" style={{ padding: "10px 20px 0px 0px" , height: "100%"}}>
              <BoardDnD />
            </TabPanel>
            <TabPanel value="2" >
              Item Two
            </TabPanel>
          </Box>
        </Box>
      </TabContext>
    </Box>
  );
}
