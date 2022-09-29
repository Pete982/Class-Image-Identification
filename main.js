function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide(); //We hide the components of the camera so we can draw the web cam over the canvas with the help of the neat image function.//
  classifier = ml5.imageClassifier('MobileNet', modelloaded);  //imageClassifier is a nice function that helps us to load the model. MobileNet is defined with single quotes in parameters. //
}

function draw(){
  image(video, 0, 0, 300, 300);  //0, 0 is the x and y coordinate and 300 300 is the width and height in that order!//
  classifier.classify(video, gotResult);  //.classify compares the video and shows the objects and things infront of it.//
}

function modelloaded(){
  console.log("Your Model is Loaded.");
}

var previous_result = '';//Shows the second result right after the first one.//

function gotResult(error, results){
  if(error){
    console.error(error);
  }

  else{
    if((results[0].confidence>0.5)&&(previous_result != results[0].label)){  //!= means something is not equal to when comparing in an if or else function or anywhere for that matter.//
      console.log(results);

      previous_result = results[0].label; //results[0].label is name of the object shown in front of the camera. So like, a cross for example.//
       var synth = window.speechSynthesis;  //Helps our computer to speak the results. SpeechSynthesis is an API (application program interface) that connects our website to another to help our robot speak.//

       speak_data = 'The object detected is -' + results[0].label;
       
       var utter_this = new SpeechSynthesisUtterance(speak_data); 

       synth.speak(utter_this);

       document.getElementById("result_object_name").innerHTML = results[0].label;
       
       document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3); //toFixed makes the long decimal number only its first couple of numnbers. And three sets the confidence to only its first three digits.//

    } 
  }
}