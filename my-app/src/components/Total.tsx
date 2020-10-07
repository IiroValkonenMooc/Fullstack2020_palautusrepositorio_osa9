import React from 'react';

interface Courseparts {
   courseparts: {
        name: string;
        exerciseCount: number;
    } [];
} 

const Total: React.FC<Courseparts> = ({courseparts}) => {
    const totalCount = courseparts.map(x => x.exerciseCount).reduce(function(a, b){ return a + b; })

    return (
        <h3>
            {`number of exercises ${totalCount}`}
        </h3>
    )
}

export default Total