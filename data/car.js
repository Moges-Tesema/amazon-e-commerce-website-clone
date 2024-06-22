class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }
  displayInfo() {
    console.log(`${this.#brand} ${this.#model} speed: ${this.speed}km/h trunk status: ${this.isTrunkOpen?'open':'closed'}`);
  }

  go() {
    if (this.isTrunkOpen) {
      if (this.speed <= 200) {
        this.speed += 5;
      }
      else {
        console.log('the car can\'t speed up more!');
      }
    }
  }
  brake() {
    if (this.speed >= 5) {
      this.speed -= 5;
    }
    else {
      console.log('the car is just at rest');
    }

  }
  openTrunk() {
    if (this.speed > 0) {
      this.isTrunkOpen = false;
      console.log("can't open trunk since the car is moving.");
    }
    else{
      this.isTrunkOpen=true;
    }
      
  }
}

class RaceCar extends Car {
  accelaration;
  constructor(brand,model,accelaration){
    super(brand,model);
    this.accelaration=accelaration;

  }
  go(){
    speed+=300;
  }
  openTrunk(){
    super.isTrunkOpen=undefined;
  }
  closeTrunk
}
let car1 = new Car('Toyota', 'corolla');
let car2 = new Car('Tesla', 'model 3');
console.log(car1);
console.log(car2);
car1.displayInfo();
car2.displayInfo();
car1.go();
car1.go();
car2.brake();
car1.displayInfo();
car2.openTrunk();
car2.displayInfo();
