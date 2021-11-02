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

export default Player;
