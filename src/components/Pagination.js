import { useState } from "react";

function Pagination({ total_pages, setPage, page }) {
  const pageNum = [1, 2, 3, 4, 5, 6, 7];
  const [ initiator, setInitiator ] = useState(0);
  function handlePages(e){
    if(initiator !== 0 && Number(e.target.value) === initiator+1){
      initiator - 3 >= 0 ? setInitiator(val=> val-3) : setInitiator(0);
    }
    else if(Number(e.target.value) === initiator + pageNum[6] && e.target.value < total_pages){
      if(initiator + pageNum[6] + 3 <= total_pages){
        setInitiator(val=> val+3)
        console.log('first')
      }
      else{
         setInitiator(total_pages-7);
        console.log('second')

      }
    }

    setPage(Number(e.target.value));
    window.scrollTo({
      top:0,
      left:0,
      behavior:"smooth"
    })
  }
  return (
    <ul className="pagination pagination-sm mt-5 justify-content-center">
      {pageNum.map((val,ind) => ind <= total_pages-1 && (
        <li
          className={
            page === initiator + val ? " page-item active " : " page-item"
          }
        >
          <button type='button' onClick={(e)=> page !== initiator+val && handlePages(e)} className="page-link" value={initiator+val}>{initiator+val}</button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
