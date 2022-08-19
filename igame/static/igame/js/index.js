var igamebotton = document.getElementById("igamebotton");
igamebotton.onclick = function() {
	
	 window.location.href = "igame/igame";
	 
}


var jellyfish_Center = document.getElementById("jellyfish_Center");

jellyfish_Center.onclick=function(){
	

     if(document.getElementById("console").style.display == "block")
     {
     	document.getElementById("console").style.display = "none";
     	
     }else{
     	
     	document.getElementById("console").style.display = "block";
     	
     }
   
  
		
}


/* 		var canvas = document.getElementById('canvas');
        var mycanvas = canvas.getContext('2d');
        
        CanvasRenderingContext2D.translate(0.5,0.5);
        mycanvas.drawPokerCard(700, 500, 100, 'hearts', 'joker');
  

*/

/*var CanvasAutoResize = {

  draw: function() {

   // var ctx = document.getElementById('canvas').getContext('2d');
    
/*    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
*/
    /*var canvasContainer = document.getElementById('canvas-container');

    ctx.canvas.width  = canvasContainer.offsetWidth-2;

    ctx.canvas.height = canvasContainer.offsetHeight-2;*/
	
	//ctx.strokeRect(1rem,1rem,1rem,1rem);
	
/*	var canvas = document.getElementById("canvas");
	var mycanvas = canvas.getContext('2d');
	mycanvas.drawPokerCard(700,400,50,'hearts','a');
	mycanvas.strokeRect(100,10,10,10);
		
  },

 

  initialize: function(){

    var self = CanvasAutoResize;

    self.draw();

    $(window).on('resize', function(event){

      self.draw();

    });

  }

}*/




/* 		var CanvasAutoResize = {  
 			draw: function() {    
 				var ctx = document.getElementById('canvas').getContext('2d');   
 				var canvasContainer = document.getElementById('canvas-container');    
 				ctx.canvas.width  = canvasContainer.offsetWidth-2;    
 				ctx.canvas.height = canvasContainer.offsetHeight-2;  
 				ctx.drawPokerCard(300, 180, 10, 'hearts', 'joker');
 				var canvas = document.getElementById('canvas');
 				var mycanvas = canvas.getContext("2d");
 				var canvasContainer = document.getElementById('canvas-container');    
 				canvas.width  = canvasContainer.offsetWidth-2;    
 				canvas.height = canvasContainer.offsetHeight-2;  
 				
 				//mycanvas(0, 0, 10, 'hearts', 'joker');
 				
 			},
 			
 			
 				
 			initialize: function(){
 				var self = CanvasAutoResize;   
 				self.draw();    
 				$(window).on('resize', function(event){      
 						self.draw();    
 					});  
 				}
 				}
 		
 		
 			$(function(argument) {  
 				CanvasAutoResize.initialize();
 			});
*/
 /*	    var pokers = document.getElementById('drawpokers')
        var poker = pokers.getContext('2d');
        
        pokers.width = window.innerWidth;
        pokers.height = window.innerHeight;
        canvas.drawPokerCard(700, 250, 100, 'hearts', 'joker');
        */
        
        
        
        
 	
 	

//      var container = document.getElementById('container');
//      var domCanvas = document.createElement('canvas');
//      var canvas = domCanvas.getContext('2d');
//      
//      container.appendChild(domCanvas)
//      
//      canvas.width = window.innerWidth;
//      canvas.height = window.innerHeight;
//		canvas.drawPokerCard(620, 480, 300, 'hearts', 'joker');
     /*   var min_w = 0;
        var max_w = 1000;
        var min_h = 0;
        var max_h = 400;
        var min_size = 50;
        var max_size = 200;

        domCanvas.height = max_h + 200;
        domCanvas.width = max_w + 200;

        function getRandom(left, right) {
            return Math.floor(Math.random() * (right - left) + left);
        }
        
        var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
        var points = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
        
        //随机生成52张牌
        for (var i in suits) {
            for (var j in points) {
                var w = getRandom(min_w, max_w);
                var h = getRandom(min_h, max_h);
                var size = getRandom(min_size, max_size);
                canvas.drawPokerCard(w, h, size, suits[i], points[j]);
            }
        }

        //小王
        var w1 = getRandom(min_w, max_w);
        var h1 = getRandom(min_h, max_h);
        var size1 = getRandom(min_size, max_size);
        canvas.drawPokerCard(w1, h1, size1, 'spades', 'joker');

        //大王
        var w2 = getRandom(min_w, max_w);
        var h2 = getRandom(min_h, max_h);
        var size2 = getRandom(min_size, max_size);
        canvas.drawPokerCard(w2, h2, size2, 'hearts', 'joker');*/
