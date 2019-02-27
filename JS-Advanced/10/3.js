function solve(obj) {
  const engines = [
    { power: 90, volume: 1800 },
    { power: 120, volume: 2400 },
    { power: 200, volume: 3500 },
  ];

  const model = obj.model;
  const engine = engines.find(v => v.power >= obj.power);
  const carriage = { type: obj.carriage, color: obj.color };
  let wheelSize = obj.wheelsize;
  if (wheelSize % 2 === 0) {
    wheelSize -= 1;
  }

  const wheels = [wheelSize, wheelSize, wheelSize, wheelSize];

  return {
    model,
    engine,
    carriage,
    wheels
  }
}

console.log(
  solve(
    {
      model: 'VW Golf II',
      power: 90,
      color: 'blue',
      carriage: 'hatchback',
      wheelsize: 14
    }
  )
);
