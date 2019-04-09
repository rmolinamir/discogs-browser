import React from 'react';
// CSS
import classes from './SearchResult.module.css'

export const NullResult = (props) => {
    return (
        <li aria-selected="false" 
            id="Result__option__no_result" 
            role="option" 
            style={{cursor: 'default'}}
            className={classes.ResultWrapper}>
                <div className={classes.Icon}>
                    <span role='img' aria-label='service' aria-hidden="true">&#x2699;</span>
                </div>
                <div className={classes.NullResult}>
                    <div className={classes.Result}>{props.text ? props.text : 'No services near you match your query.'}</div>
                </div>
        </li>
    )
}

const searchResult = (props) => {
    return (
        <li aria-selected="false" 
            id={["Result__option__",props.id].join('')}
            role="option" 
            className={classes.ResultWrapper}>
            <div className={classes.Icon}>
                <span role='img' aria-label='service' aria-hidden="true">&#x2699;</span>
            </div>
            <div className={classes.ResultContainer}>
                <div className={classes.Service}>{props.service}</div>
                <div className={classes.Location}>{props.location}</div>
            </div>
        </li>
    );
}

export default searchResult;
// export default searchResult;