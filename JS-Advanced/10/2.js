function solve(obj) {
  const result = JSON.parse(JSON.stringify(obj));
  if (result.handsShaking === false) {
    return result;
  }
  
  const alcoholToAdd = 0.1 * result.weight * result.experience;
  result.bloodAlcoholLevel += alcoholToAdd;
  result.handsShaking = false;

  return result;
}

console.log(
  solve(
    {
      weight: 120,
      experience: 20,
      bloodAlcoholLevel: 200,
      handsShaking: true
    }

  )
);