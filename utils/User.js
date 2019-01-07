class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  methode1() {
    return console.log('user methode 1')
  }

  methode2() {
    return console.log('user methode 2')
  }
}

module.exports = User