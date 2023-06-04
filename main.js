function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('MobileNet',modelLoaded);
  }

  function modelLoaded() {
    console.log('Model Loaded!');
  }

  function draw() {
    image(video, 0, 0, 300, 300);
    classifier.classify(video, gotResult);
}
var previous_result = '';

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
            console.log(result);
            previous_result = results[0].label;
            var synth = window.speechSynthesis;
            speak_data = 'Object deetected os - '+results[0].label;
            var utterThis = new SpeechSynthesisutterance(speak_data);
            synth.speak(utterThis);

            document.getElementById("result_object-name").innerHTML = results[0].label;
            document.getElementById("result-object_accuract").innerHTMl = results[0].confidence.toFixed(3)
        }
    }
}