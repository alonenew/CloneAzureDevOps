import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { selectItemStories } from "../../../store/slices/itemSlice";
import { toggleNewStories, toggleClosedStories } from '../../../store/slices/toggleSlice'
const ColumnData = () => {
  const items = useSelector(selectItemStories);
  const dispatch = useDispatch();
  const [columns, setColumns] = useState(items);

  useEffect(() => {
    setColumns(items);
  }, [items])

  const Col = ({ openNew, openClosed, name }) => {
    return <>
      {name === "New" &&
        <>
          <span className={`${openNew ? "p-2" : "absolute rotate-90 top-16"}`}>{name}</span>
          <img onClick={() => dispatch(toggleNewStories())}
            src="https://www.svgrepo.com/show/83803/up-arrow.svg" alt=""
            className={`${openNew ? "-rotate-90" : "mx-2 my-3 rotate-90 "} w-3 h-3  `} />
        </>
      }
      {name === "Active" &&
        <>
          <span className="p-2">{name}</span>
          <span>0/5</span>
        </>
      }
      {name === "Resolved" &&
        <>
          <span className="p-2">{name}</span>
          <span >0/5</span>
        </>
      }
      {name === "Closed" &&
        <>
          <span className={`${openClosed ? "p-2" : "absolute rotate-90 top-16 pt-4"}`}>{name}</span>
          <img onClick={() => dispatch(toggleClosedStories())}
            src="https://www.svgrepo.com/show/83803/up-arrow.svg" alt=""
            className={`${openClosed ? "-rotate-90" : "mx-2 my-3 rotate-90 "} w-3 h-3  `} />
        </>
      }
    </>
  }

  return { columns, setColumns, Col }

}

export default ColumnData