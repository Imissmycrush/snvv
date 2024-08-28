(function () {

    function playMusic(){
        var myAudio = document.getElementById('playAudio');
        if (myAudio.duration > 0 && !myAudio.paused) {
            // It's playing...do your job
        } else {
            myAudio.play();
            // Not playing...maybe paused, stopped, or never played.
        }
    }

    // Fields
    var canvas = document.getElementById("canvas");
    var body = document.getElementsByTagName("body")[0];
    var ctx = canvas.getContext("2d");

    /* Initialize background color */
    body.addEventListener("click", function(ev) {
        setBackgroundColor();
        playMusic();
    });

    window.onload = setBackgroundColor;
    window.onresize = setBackgroundColor;

    /* Function to set background color */
    function setBackgroundColor() {
        scaleCanvas();
        // Clear the canvas and set a fixed background color
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "hsl(0, 0%, 0%)"; // Màu đen
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Vẽ màu nền cố định
    }

    /* Utility functions */
    function scaleCanvas(){
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight);
        console.log(`width:${w}, height:${h}`);
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        var scale = 1;
    
        canvas.width = Math.floor(w * scale);
        canvas.height = Math.floor(h * scale);
        ctx.scale(scale, scale);
    }

})();
