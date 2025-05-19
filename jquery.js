var playing = false;
var score;
var trialsLeft;
var step;
var action;//used to set interval
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon']
$(function(){
    //click on start reset button
    
    $("#startreset").click(function(){
        
        // check if we are playing
       if(playing == true){
           
          //if yes reload page
           location.reload();
          }else{
              
            //if not playing
              playing = true; //game initiated
              
              //set score to 0
              score = 0; //set score to 0
              $("#scorevalue").html(score);
              
              //show trials left
              $("#trialsLeft").show();
              trialsLeft = 3;
              addHearts();
              
              //hide gameover box
              $("#gameOver").hide();
              
             //change button text to reset game
              $("#startreset").html("Reset Game");
              
              //start sending fruits
              startAction();
          } 
    });

//slice a fruit
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);//update score
    
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//play sound
    
    //stop fruit
   clearInterval(action);
    
    //hide fruits
    $("#fruit1").hide("explode", 300);//slice fruit
    
    
    //send a new fruit
    setTimeout(startAction, 800);
});




//functions

function addHearts(){
    
        $("#trialsLeft").empty();
        for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits

function startAction(){
    
    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    
    //random position
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
    
    //generate a random step
    step = 1+ Math.round(5*Math.random());
//change step

//Move fruit down by one step every 1oms
        action = setInterval (function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);//move fruit by one step  
    
      //check if fruits is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            //check if we have trails left
            if(trialsLeft > 1){
                 //generate a new fruit
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit

                //random position
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});

                //generate a random step
                step = 1+ Math.round(5*Math.random());
            
                //reduce trials by one
                trialsLeft --;
            
                //populate trialsLeft box
                addHearts();
        }else{// gameover  
             playing = false;//we are not playing anymore
            
             //Change button to Start Game
             $("#startreset").html("Start Game");
             $("#gameOver").show();
             $("#gameOver").html('<p>Game Over</p><p>Your score is '+ score + '</p>');
             $("#trialsLeft").hide();
             stopAction();
           }
        }
    }, 10);
}
                

//generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(8*Math.random())] + '.png');
}

//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});