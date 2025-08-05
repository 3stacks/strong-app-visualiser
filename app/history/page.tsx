export default async function History() {
const getWorkoutCount = async () => {
    'use server';
    
    const response = await fetch('http://localhost:3000/api/stats/workout-count');
    const data = await response.json();
    return data.workoutCount;
}

const workoutCount = await getWorkoutCount();

const getWorkoutDuration = async () => {
    'use server';
    
    const response = await fetch('http://localhost:3000/api/stats/total-duration');
    const data = await response.json();
    return data.workoutDuration;
}

const workoutDuration = await getWorkoutDuration();

const getFavouriteExercises = async () => {
    'use server';

    const response = await fetch('http://localhost:3000/api/stats/favourite-exercises');
    const data = await response.json();
    return data.orderedExercises;
}

const favouriteExercises = await getFavouriteExercises();

const getRecentWorkouts = async () => {
    'use server';

    const response = await fetch('http://localhost:3000/api/workouts/recent');
    const data = await response.json();
    return data;
}

const recentWorkouts = await getRecentWorkouts();

  return (
   <div className="w-full">
    <div className="flex space-x-4 items-start w-full mb-4">
      <div className="bg-white flex-1 rounded-lg p-4 shadow">
        <h1 className="text-2xl font-bold">Workout History</h1>
        <p className="text-sm text-gray-700">Total Workouts: {workoutCount}</p>
        <p className="text-sm text-gray-700">Total Workout Duration: {(Math.round(workoutDuration / 1000 / 60 / 60)).toLocaleString()} hours</p>
      </div>
      <div className="bg-white flex-1 rounded-lg p-4 shadow">
        <h1 className="text-2xl font-bold">Favourite Movements</h1>
        <ul className="list-disc pl-5">
          {favouriteExercises.map(exercise => (
            <li key={exercise[0]} className="text-sm text-gray-700">
              {exercise[0]}: {exercise[1]} sets
            </li>
          ))}
        </ul>
      </div>
    </div>
    <h2 className="text-2xl font-bold mb-4">Recent Workouts</h2>
      <div className="space-y-4">
        {recentWorkouts.map(workout => (
          <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">{workout.name}</h3>
        <p className="text-sm text-gray-700">{new Date(workout.date).toLocaleDateString()}</p>
        </div>
        <p className="text-sm text-gray-700 mb-2">Duration: {Math.round(workout.duration / 1000 / 60)} minutes</p>
        <h3 className="text-xl font-bold">Sets</h3>
        <ul className="list-disc pl-5">
          {workout.sets.map(set => (
            <li key={set.name} className="text-sm text-gray-700">
              {set.name} ({set.weight}kg): {set.reps} reps
            </li>
          ))}
        </ul>
      </div>
        ))}
      </div>
   </div>
  );
}