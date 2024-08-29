document.addEventListener("DOMContentLoaded", function() {
  var to = nameGirl;
  var gift_url = giftUrl;
  var gift_image_url = giftImage || giftImageBase64;

  var nametag = document.getElementById("nametag");
  var present = document.getElementById("present");
  var presentImage = document.getElementById("present-image");

  if (!nametag || !present || !presentImage) {
    console.error("Required elements are missing from the DOM");
    return;
  }

  function init() {
    var graphElem = document.querySelector('.present-box > .side.top .to');
    if (graphElem) {
      graphElem.setAttribute('data-before', eventName);
    }

    var titleElem = document.querySelector('#card .title-card');
    var contentElem = document.querySelector('#card .content-card');
    var honeyElem = document.querySelector('#card .honey');

    if (titleElem) titleElem.innerHTML = `💘${titleCard}💘`;
    if (contentElem) contentElem.innerHTML = `${contentCard}`;
    if (honeyElem) honeyElem.setAttribute('src', `${giftImage}`);

    var _giftLink, _giftImg;

    if (gift_url) {
      _giftLink = document.createElement("a");
      _giftLink.href = gift_url;
      _giftLink.target = "_blank";
      presentImage.appendChild(_giftLink);
    }

    if (gift_image_url) {
      _giftImg = document.createElement("img");
      _giftImg.src = gift_image_url;
      if (_giftLink) {
        _giftLink.appendChild(_giftImg);
      } else {
        presentImage.appendChild(_giftImg);
      }
    }

    present.addEventListener("click", function() {
      present.classList.toggle("open");
      document.querySelector('#card').classList.add('card-show');

            // Display the bunny on the canvas when the present is clicked
      var bunnyElem = document.getElementById('bunny');
      if (!bunnyElem) {
        // Create the bunny element if it doesn't exist
        bunnyElem = document.createElement('div');
        bunnyElem.id = 'bunny';
        bunnyElem.classList.add('bunny');
        document.body.appendChild(bunnyElem);

        // Create the bunny parts using bunny.css
        var head = document.createElement('div');
        head.classList.add('head');
        bunnyElem.appendChild(head);

        var leftEar = document.createElement('div');
        leftEar.classList.add('ear');
        head.appendChild(leftEar);

        var rightEar = document.createElement('div');
        rightEar.classList.add('ear', 'right');
        head.appendChild(rightEar);

        var leftEye = document.createElement('div');
        leftEye.classList.add('eye');
        head.appendChild(leftEye);

        var rightEye = document.createElement('div');
        rightEye.classList.add('eye', 'right');
        head.appendChild(rightEye);

        var mouth = document.createElement('div');
        mouth.classList.add('mouth');
        head.appendChild(mouth);
      }
      
      // Show the bunny with transition effect
      setTimeout(function() {
        bunnyElem.classList.add('bunny-show');
      }, 0); // Execute after element is added to DOM
    

    
    });
    nametag.innerText = to;
  }

  init();
});
