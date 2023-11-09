// combine and shuffle two arrays

export default function shuffle() {
  const assets = [
    { image: 'assets/astro.png' },
    { image: 'assets/boy.png' },
    { image: 'assets/joystick.png' },
    { image: 'assets/kid.png' },
    { image: 'assets/monkey.png' },
    { image: 'assets/panda.png' },
    { image: 'assets/peanut.png' },
    { image: 'assets/pizza.png' },
  ];
  //

  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random(), matched: false }));
}
