
const webcamElement = document.getElementById('webcam');
let net;

async function setupWebcam() {
  return new Promise((resolve, reject) => {
    const navigatorAny = navigator;
    navigator.getUserMedia = navigator.getUserMedia ||
        navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
        navigatorAny.msGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true},
        stream => {
          webcamElement.srcObject = stream;
          webcamElement.addEventListener('loadeddata',  () => resolve(), false);
        },
        error => reject());
    } else {
      reject();
    }
  });
}

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');

  await setupWebcam();
  $('.preloader').hide();
  $('.caminfo').show();
  while (true) {
    const result = await net.classify(webcamElement);


    if(result[0].probability > 0.3){
      document.getElementById('probability').innerText = `( ${Math.round(result[0].probability * 100)+' % )'}`;
      document.getElementById('object').innerText = `${result[0].className}`;
      $('#console').addClass('detected');
      if(result[0].probability > 0.6){
        $('#console').addClass('green');
      }
      else
      {
        $('#console').removeClass('green');
      }
    }
    else{
      document.getElementById('probability').innerText = '';
      document.getElementById('object').innerText = 'no object detected';
      $('#console').removeClass('detected green');
    }


    await sleep(500)
    await tf.nextFrame();
  }
}

function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
}

app();