class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }

  changeHP = (num) => {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  elHp = () => {
    return document.querySelector(`.player${this.player} .life`);
  };

  renderHP = () => {
    return (this.elHp().style.width = `${this.hp}%`);
  };
}

export const player1 = new Player({
  player: 1,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["steel fans", "flying blade"],
});

export const player2 = new Player({
  player: 2,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["kunai", "hatchet"],
});
