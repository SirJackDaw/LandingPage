var canvas = document.getElementById("canvas"),
			    ctx = canvas.getContext('2d');
var img = new Image();
img.src = 'assets/images/image.jpg';
img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    var url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    sendRequest(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}
function sendRequest(url)
{
    return fetch(url, { mode: "cors" });
}