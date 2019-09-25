(function() {
  let width = 320;
  let height = 0;

  let streaming = false;

  let video = null;
  let canvas = null;
  let photo = null;
  let startButton = null;

  function startUp() {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startButton = document.getElementById("startButton");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false
      })
      .then(stream => {
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        document.write("An error occured: " + err);
      });

    video.addEventListener(
      "canplay",
      e => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          console.log("not streaming")

        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
        }
      },
      false
    );

    startButton.addEventListener("click", e => {
      takePicture();
      e.preventDefault();
    });

    clearPhoto();
  }

  startUp();

  function clearPhoto(){
    let context = canvas.getContext('2d');
    context.fillStyle="#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takePicture(){
    let context = canvas.getContext("2d");
    if(width && height){
      canvas.width = width;
      canvas.height=height;

      context.drawImage(video, 0, 0, width, height);

      let data = canvas.toDataURL("image/png")
      photo.setAttribute("src", data);

    }
    else{
      console.log("clear was called")
      clearPhoto();
    }
  }
})();
