class Food{
    constructor(){
        this.milk=loadImage("Milk.png");
        this.foodStock=0
        this.feedPet=createButton("Feed the dog");
        this.addFood=createButton("add Food");
    }
  
    display(){
      var x=80;
      var y=100;
      imageMode(CENTER);
      image(this.milk, 620, 300, 70, 70);

      this.feedPet.position(200, 125);
      if(this.feedPet.mousePressed(function(){
        foodS=foodS-1;
        gameState=1;
        database.ref('/').update({'gameState':gameState})
      }));

      this.addFood.position(300, 125);
      if(this.addFood.mousePressed(function(){
        foodS=foodS+1;
        gameState=2;
        database.ref('/').update({'gameState':gameState})
      }));
  
      if(foodStock!==0){
         for(var a=0; a<this.foodStock; a++){
           if(a%10==0){
             x=80;
             y+=50;
           }
           image(this.milk, x, y, 50, 50);
           x=x+30;
         }
      }
    }
  }