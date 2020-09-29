interface returnObj {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = ( exerciseRoutine: Array<number>, target: number ): returnObj => {
    //console.log('exerciseRoutine :>> ', exerciseRoutine);

    const periodLength = exerciseRoutine.length;

    let trainingDays = 0;
    let hoursTrained = 0;
    for (let i = 0; i < exerciseRoutine.length; i++) {
        const exerciseOnCurrDay = exerciseRoutine[i];
        if(exerciseOnCurrDay > 0){
            trainingDays++;
            hoursTrained += exerciseOnCurrDay;
        }
    }

    const traininDaysRatio = trainingDays/periodLength;

    const average = hoursTrained / trainingDays;

    let success = false;
    if(traininDaysRatio > 0.33 && average >= 1){
        success = true;
    }

    let rating = 0;
    let ratingDescription = '';
    if(success && target < average){
        rating = 3;
        ratingDescription = 'Very good!';
    } else if(success){
        rating = 2;
        ratingDescription = 'Good going, but could do better!';
    } else {
        rating = 1;
        ratingDescription = 'Try better next time! :(';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// console.log('exer :>> ', calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

// interface exerciseCalculationValues {
//     target: number;
//     exerciseRoutine: Array<number>;
// }

// const parseExerciseArguments = (args: Array<string>): exerciseCalculationValues => {
//     if (args.length < 4) throw new Error('Not enough arguments');

//     const targetANumber = !isNaN(Number(args[2])) ? true : false;

//     // eslint-disable-next-line prefer-const
//     let exerciseRoutine = [];
//     for (let i = 3; i < args.length; i++) {
//         const argument = args[i];
        
//         if( isNaN(Number(argument)) ){
//             throw new Error('Provided values were not numbers!');
//         }
//         exerciseRoutine.push(Number(argument));
//     }

//     if (targetANumber) {
//         return {
//             target: Number(args[2]),
//             exerciseRoutine
//         };
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// };

// try {
//     const { target, exerciseRoutine } = parseExerciseArguments(process.argv);
//     console.log(calculateExercises(exerciseRoutine, target));
// } catch (e) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     console.log('Error, something bad happened, message: ', e.message);
// }