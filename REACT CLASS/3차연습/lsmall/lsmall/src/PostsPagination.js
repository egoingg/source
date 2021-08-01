import React from 'react'
import {Pagination} from 'react-bootstrap';

function PostsPagination(props) {
    const pageNumber = [] // ( 전체 페이지 수 / 각 페이지 당 포스트 수) 를 계산하여 전체 페이지 번호를 구한 배열
    const currentPage = props.currentPage
    // Math.ceil: 올림
    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <div>
            <Pagination size="sm" className="justify-content-center">
                    {pageNumber.map((pageNum) => (
                        //onclick에서 현재 페이지 번호(currentPage)를 설정
                        <Pagination.Item key={pageNum} active={pageNum === currentPage} onClick={() => props.setCurrentPage(pageNum)}> 
                            {pageNum}
                        </Pagination.Item>
                    ))}
            </Pagination>
        </div>
    )
}

export default PostsPagination
