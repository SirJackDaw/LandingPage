var canvas = document.getElementById("canvas"),
			    ctx = canvas.getContext('2d');
var img = new Image();
img.src = 'assets/images/image.jpg';
img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    var url = 'http://api.forismatic.com/api/1.0/';
}