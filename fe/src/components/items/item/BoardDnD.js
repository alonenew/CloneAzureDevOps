import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { dragAndDrop } from "./dragAndDrop";
import { useSelector } from 'react-redux'
import ColumnData from './ColumnData';
import AddItem from "./AddItem";
import ItemDnD from "./ItemDnD";
import { selectOpenClosed, selectOpenNew } from "../../../store/slices/toggleSlice";
import Box from '@mui/material/Box';

function BoardDnD() {
    const openNew = useSelector(selectOpenNew);
    const openClosed = useSelector(selectOpenClosed);

    let { columns, setColumns, Col } = ColumnData();
    
    return (
        <>
            <Box className="flex gap-x-1 text-sm h-full">
                <DragDropContext
                    onDragEnd={result => dragAndDrop(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <Box key={columnId} className={`flex flex-col max-w-xss w-full 
                            ${!openNew && (column.name === "New") && "w-10"} 
                            ${!openClosed && (column.name === "Closed") && "w-10"}`} >
                                <Box className='flex justify-between items-center px-1.5 relative'>
                                    <Col openNew={openNew} openClosed={openClosed} name={column.name} />
                                </Box>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <Box
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                      ? "rgb(209 213 219)"
                                                      : "rgb(243 244 246)",
                                                  }}
                                                className={`flex-row border w-full h-full 
                                                ${column.name === "New" ? "p-3" : "px-3"} border-t-2 border-gray-300`}
                                            >
                                                {openNew &&
                                                    <Box>
                                                        {column.name === "New" && <AddItem />}
                                                    </Box>
                                                }
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={"id"+item.taskId}
                                                            draggableId={"id"+item.taskId}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <Box
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: "none",
                                                                            ...provided.draggableProps.style,
                                                                        
                                                                        }}
                                                                    >
                                                                        <ItemDnD col={columns} item={item} 
                                                                        index={index} name={column.name} openN={openNew} 
                                                                        openC={openClosed}/>
                                                                    </Box>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </Box>
                                        );
                                    }}
                                </Droppable>
                            </Box>
                        );
                    })}
                </DragDropContext>
            </Box>
        </>
    );
}


export default BoardDnD