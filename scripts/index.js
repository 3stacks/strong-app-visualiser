import csvToJson from 'csvtojson';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const parseDuration = (duration) => {
if( !duration || duration === '0') {
    return 0;
}

    const parts = duration.match(/\d+(hr?\s?|m?)/gim);

    if (!parts) {
        return 0;
    }

   return parts.reduce((acc, part) => {
    if (!part) {
        return acc;
    }
if (part.includes('h')) {
     // Convert hours to milliseconds
            return acc + parseInt(part) * 3600000;
        }

        if (part.includes('m')) {
            // Convert minutes to milliseconds
            return acc + parseInt(part) * 60000; 
        }

        return acc;
   }, 0)
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

csvToJson().fromFile(`${__dirname}/workouts.csv`)
  .then((jsonObj) => {
    const result = jsonObj.reduce((acc, item) => {
        if (acc[item.Date]) {
            return {
                ...acc,
                [item.Date]: {
                    ...acc[item.Date],
                    sets: [
                        ...acc[item.Date].sets,
                        {
                        name: item['Exercise Name'],
                        set: item['Set Order'],
                        reps: item.Reps,
                        weight: item.Weight,
                        distance: item.Distance,
                        seconds: item.Seconds,
                        notes: item.Notes,
                        RPE: item.RPE,
                    }
                    ]
                }
            }
        }

        const parsedDuration = parseDuration(item.Duration)

        return {
            ...acc,
            [item.Date]: {
                date: item.Date,
                name: item['Workout Name'],
                duration: parsedDuration,
                sets: [
                    {
                        name: item['Exercise Name'],
                        set: item['Set Order'],
                        reps: item.Reps,
                        weight: item.Weight,
                        distance: item.Distance,
                        seconds: item.Seconds,
                        notes: item.Notes,
                        RPE: item.RPE,
                    }
                ]
            }
        }
    }, {})

    const destination = `${__dirname}/../app/api/db`;

    writeFileSync(`${destination}/workouts.json`, JSON.stringify(result, null, 2), 'utf8');

    const exercises = Object.values(result).reduce((acc, item) => {
        item.sets.forEach(set => {
            const exercise = acc.find(ex => ex.name === set.name);

            if (!exercise) {
                acc.push({
                    name: set.name,
                    workouts: [{
                        date: item.date,
                        name: item.name,
                        duration: item.duration,
                        sets: [set]
                    }]
                })
            } else {
                
            }
        })

        return acc;
    }, [])

    writeFileSync(`${destination}/exercises.json`, JSON.stringify(exercises, null, 2), 'utf8');
  })