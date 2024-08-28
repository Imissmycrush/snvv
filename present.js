var to = nameGirl;
var gift_url = giftUrl;
var gift_image_url = giftImage || giftImageBase64;

var nametag = document.getElementById("nametag");
var present = document.getElementById("present");
var presentImage = document.getElementById("present-image");

function init() {
  var graphElem = document.querySelector('.present-box > .side.top .to');
  graphElem.setAttribute('data-before', eventName);
  document.querySelector('#card .title-card').innerHTML = `💘${titleCard}💘`;
  document.querySelector('#card .content-card').innerHTML = `${contentCard}`;
  document.querySelector('#card .honey').setAttribute('src', `${giftImage}`);

  var _giftLink, 
      _giftImg;
  
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
   
  present.addEventListener("click", function(e) {
  // Toggle lớp 'open' cho phần tử present
  present.classList.toggle("open");

  // Thêm lớp 'card-show' vào phần tử card
  document.getElementById('card').classList.add('card-show');
  
  // Thay đổi thuộc tính hoặc thêm lớp cho phần tử bunny
  var bunny = document.getElementById('bunny');
  if (bunny) {
    // Thêm lớp 'bunny-show' cho phần tử bunny
    bunny.classList.add("bunny-show");
    
  }, false);
  
  nametag.innerText = to;
}

init();
