import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const ContentComponent: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map(c => {
                return(
                    <Part key={c.name} part= {c} />
                )
            })}
        </div>
    )
}

export default ContentComponent