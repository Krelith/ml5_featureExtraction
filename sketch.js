console.log('ml5 version:', ml5.version);

var featureExtractor;
var classifier;
var elt;
var video;

function setup() {
  // createCanvas(400, 400);
  noCanvas();
  
  video = createCapture(VIDEO);
//   video.hide();
  
  featureExtractor = ml5.featureExtractor('MobileNet', video, modelReady);
  elt = createP('Loading...');
  classifier = featureExtractor.classification(video);
  //classifier.classify(img, gotResult);
  let glassesOn = createButton('Glasses off');
  glassesOn.mousePressed(() => {
    classifier.addImage('glasses_off', () => {
        console.log(`Registered 'Glasses off'`);
    });
  });
  let glassesOff = createButton('Glasses on');
  glassesOff.mousePressed(() => {
    classifier.addImage('glasses_on', () => {
        console.log(`Registered 'Glasses on'`);
    });
  })
  let trainBtn = createButton('Train');
  trainBtn.mousePressed(() => {
      console.log(`Training...`);
      classifier.train(whileTraining);
  })
}

function modelReady() {
//   classifier.predict(gotResult);
}

function whileTraining(loss){
    console.log(loss);
}

function gotResult(err, results) {
  // console.log(results);
  
  elt.html(results[0].label);
  
  classifier.predict(gotResult);
}

function draw() {
  // background(0);
  // image(img, 0, 0);
}