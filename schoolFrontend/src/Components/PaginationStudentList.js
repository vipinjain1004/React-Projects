import React,{useState} from 'react';
import Pagination from 'react-bootstrap/Pagination';



function PaginationStudentList(props) {
    const [active, setActive] = useState(1);
    let items = [];
    console.log("Props value inside pagination List " + JSON.stringify(props));
    const totalCount = props.pageInfo.total;
    const limit = props.pageInfo.limit;
    const offset = props.pageInfo.offset;
    let totalPage = totalCount / limit;

    if (totalCount % limit !== 0) {
        totalPage++;
    }
    const onClickPageNumber = (page) =>{
        let newSize = page * limit;
        let newOffset = newSize - limit; 
        props.onClickPageNumber(limit, newOffset);
        setActive(page);
        //console.log("On Click Page " + JSON.stringify(event));

    }
    
    for (let number = 1; number <= totalPage; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={()=>{
                onClickPageNumber(number);
            }}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <div>
            <Pagination>{items}</Pagination>
            <br />
        </div>)
}

export default PaginationStudentList;