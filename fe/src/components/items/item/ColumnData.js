import Typography from '@mui/material/Typography';
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
          <Typography variant="body2" className={`${openNew ? "p-2" : "absolute rotate-90 top-16"}`}>{name}</Typography>
          <img onClick={() => dispatch(toggleNewStories())}
            src="https://www.svgrepo.com/show/83803/up-arrow.svg" alt=""
            className={`${openNew ? "-rotate-90" : "mx-2 my-3 rotate-90 "} w-3 h-3  `} />
        </>
      }
      {name === "Active" &&
        <>
          <Typography variant="body2" className="p-2">{name}</Typography>
          <Typography variant="body2">{columns.Active.items.length}/5</Typography>
        </>
      }
      {name === "Resolved" &&
        <>
          <Typography variant="body2" className="p-2">{name}</Typography>
          <Typography variant="body2" >{columns.Resolved.items.length}/5</Typography>
        </>
      }
      {name === "Closed" &&
        <>
          <Typography variant="body2" className={`${openClosed ? "p-2" : "absolute rotate-90 top-16 pt-4"}`}>{name}</Typography>
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