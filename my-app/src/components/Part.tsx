import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
  

const Part: React.FC<{part: CoursePart}> = ({ part }) => {
    switch (part.name) {
        case 'Fundamentals':
            return(
                <div style={{paddingBottom: '10px'}}>
                    <div>{`${part.name} ${part.exerciseCount}`}</div>
                    <div>{`description: ${part.description}`}</div>
                </div>
            )    
        case 'Using props to pass data':
            return (
                <div style={{paddingBottom: '10px'}}>
                    <div>{`${part.name} ${part.exerciseCount}`}</div>
                    <div>{`group project count:  ${part.groupProjectCount}`}</div>
                </div>
            ) 
        case 'Deeper type usage':
            return (
                <div style={{paddingBottom: '10px'}} >
                    <div>{`${part.name} ${part.exerciseCount}`}</div>
                    <div>{`exercise submission link:  ${part.exerciseSubmissionLink}`}</div>
                </div>
            ) 
        case 'I am stuff':
                return (
                    <div style={{paddingBottom: '10px'}} >
                        <div>{`${part.name} ${part.exerciseCount}`}</div>
                        <div>{`description: ${part.description}`}</div>
                    </div>
                ) 
        default:
            return assertNever(part);
    }
}

export default Part