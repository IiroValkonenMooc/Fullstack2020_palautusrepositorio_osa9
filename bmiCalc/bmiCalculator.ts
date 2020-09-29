export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height/100)*(height/100));

    switch (true) {
        case (bmi < 15):
            return 'Very severely underweight';
        case (15 <= bmi && bmi < 16):
            return 'Severely underweight';
        case (16 <= bmi && bmi < 18.5):
                return 'Underweight';
        case (18.5 <= bmi && bmi < 25):
            return 'Normal (healthy weight)';
        case (25 <= bmi && bmi < 30):
            return 'Overweight';
        case (30 <= bmi && bmi < 35):
            return 'Obese Class I (Moderately obese)';
        case (35 <= bmi && bmi < 40):
            return 'Obese Class II (Severely obese)';
        case (40 <= bmi):
            return 'Obese Class III (Very severely obese)';
        default:
            return 'This should not be possible';
    }
};

// interface bmiCalculationValues {
//     height: number;
//     weight: number;
// }

// const parseBmiArguments = (args: Array<string>): bmiCalculationValues => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3])
//         }
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }

// try {
//     const { height, weight } = parseBmiArguments(process.argv)
//     console.log(calculateBmi(height, weight));
// } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);
// }
