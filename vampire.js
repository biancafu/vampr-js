class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numOfVampires += 1;
    }
    return numOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    for (const offspring of this.offspring) {
      if (offspring.name === vampire.name) return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (vampire === this) return vampire;
    let vampire1 = this;
    let vampire2 = vampire;
    const vampireMap = function(vampire) {
      let result = [];
      while (vampire) {
        result.push(vampire);
        vampire = vampire.creator;
      }
      return result;
    };
    const vampire1map = vampireMap(vampire1).reverse();
    const vampire2map = vampireMap(vampire2).reverse();
    let i = 0;
    for (; i < vampire1map.length && i < vampire2map.length; i++) {
      if (vampire1map[i] !== vampire2map[i]) {
        return i === 0 ? vampire1map[0] : vampire1map[i-1];
      }
    }
    return vampire1map[i-1];
  }
}

let rootVampire;

rootVampire = new Vampire("root");


let offspring1, offspring2, offspring3, offspring4, offspring5, offspring6, offspring7, offspring8;

offspring1 = new Vampire("a");
offspring2 = new Vampire("b");
offspring3 = new Vampire("c");
offspring4 = new Vampire("d");
offspring5 = new Vampire("e");

offspring6 = new Vampire("f");
offspring7 = new Vampire("g");
offspring8 = new Vampire("h");

rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);

//    root
//  a,  b,  c
//      h  d, e
//            f
//            g 

const result1 = (offspring6.closestCommonAncestor(offspring7).name);
const result2 = (offspring7.closestCommonAncestor(offspring6).name);

console.log(result1);
console.log(result2);



module.exports = Vampire;

