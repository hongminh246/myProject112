prediction1 = "";
prediction2 = "";
Webcam.set({
    width: 410,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
cameraContainer = document.getElementById("cameraContainer");
Webcam.attach('#cameraContainer');

function captureImage() {
    Webcam.snap(function(data_uri) {
        document.getElementById("imageContainer").innerHTML = '<img id="capturedImage" src="' + data_uri + '">';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JVT6NktHG/model.json', modelLoaded);

function modelLoaded() {
    console.log('modelLoaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "First Prediction is " + prediction1;
    speakData2 = "Second Prediction is " + prediction2;
    var speakThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(speakThis);
}

function check() {
    image = document.getElementById('capturedImage');
    classifier.classify(image, predictEmotion);
}

function predictEmotion(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("emotionResult1").innerHTML = results[0].label;
        document.getElementById("emotionResult2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "Thumbs-Up") {
            document.getElementById("emojiResult1").innerHTML = "&#128077;";
        }
        if (results[0].label == "Ok") {
            document.getElementById("emojiResult1").innerHTML = "&#128076;";
        }

        if (results[0].label == "Peace") {
            document.getElementById("emojiResult1").innerHTML = "&#9996;";
        }
        if (results[1].label == "Thumbs Up") {
            document.getElementById("emojiResult2").innerHTML = "&#128077;";
        }
        if (results[1].label == "Ok") {
            document.getElementById("emojiResult2").innerHTML = "&#128076;";
        }

        if (results[1].label == "Peace") {
            document.getElementById("emojiResult2").innerHTML = "&#9996;";
        }
    }
}