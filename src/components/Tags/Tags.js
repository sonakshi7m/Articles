import React from 'react';
import './Tags.css';
import { Link } from 'react-router-dom';


export const Tags = ({ tags, onTagClick }) => {

    return (
        tags && tags.length ?

            <div className="col-md-3 tags">
                <h6>Popular Tags</h6>
                {tags.map((tag, index) => <Link onClick={() => onTagClick({ tag })} to="" key={index} href="" className="tag-default tag-pill">{tag}</Link>)}
            </div>


            :
            <div>Loading...</div>

    )


}