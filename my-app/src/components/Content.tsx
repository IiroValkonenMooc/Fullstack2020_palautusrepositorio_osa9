import React from 'react';

interface Courseparts {
   courseparts: {
        name: string;
        exerciseCount: number;
    } [];
} 

const ContentComponent: React.FC<Courseparts> = ({courseparts}) => {
    return (
        <div>
            {courseparts.map(c => {
                return(
                    <div key={c.name} >
                        {`${c.name} ${c.exerciseCount}`}
                    </div>
                )
            })}
        </div>
    )
}

export default ContentComponent