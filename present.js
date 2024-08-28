var to = nameGirl;
var gift_url = giftUrl;
var gift_image_url = giftImage || giftImageBase64;

var nametag = document.getElementById("nametag");
var present = document.getElementById("present");
var presentImage = document.getElementById("present-image");

function init() {
  var graphElem = document.querySelector('.present-box > .side.top .to');
  if (graphElem) {
    graphElem.setAttribute('data-before', eventName);
  }
  
  var cardTitle = document.querySelector('#card .title-card');
  if (cardTitle) {
    cardTitle.innerHTML = `💘${titleCard}💘`;
  }

  var cardContent = document.querySelector('#card .content-card');
  if (cardContent) {
    cardContent.innerHTML = contentCard;
  }
  
  var honeyImage = document.querySelector('#card .honey');
  if (honeyImage) {
    honeyImage.setAttribute('src', giftImage);
  }

  var _giftLink, _giftImg;
  
  if (gift_url) {
    _giftLink = document.createElement("a");
    _giftLink.href = gift_url;
    _giftLink.target = "_blank";
    if (presentImage) {
      presentImage.appendChild(_giftLink);
    }
  }
  
  if (gift_image_url) {
    _giftImg = document.createElement("img");
    _giftImg.src = gift_image_url;
    if (_giftLink) {
      _giftLink.appendChild(_giftImg);
    } else if (presentImage) {
      presentImage.appendChild(_giftImg);
    }
  }
    
  if (present) {
    present.addEventListener("click", function(e){
      present.classList.toggle("open");
      var card = document.getElementById('card');
      if (card) {
        card.classList.add('card-show');
      }
    }, false);
  }
  
  if (nametag) {
    nametag.innerText = to;
  }
}

init();

