var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
var img = new Image();
img.setAttribute('crossorigin', 'anonymous')
img.src = "https://source.unsplash.com/random";
img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  var url =
    "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  var resp = sendRequest(url)
    .then((response) => response.json())
    .then((data) => {
	console.log(data.quoteText);
    var text = data.quoteText;
    var fontSize = canvas.width / 20;
    ctx.font = `${fontSize}px 'Lobster', cursive`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
     wrapText(
    	ctx,
        text,
        canvas.width / 2,
        canvas.height / 3,
        canvas.width / 2,
        fontSize
      );
    });
};

const sendRequest = url => {
  return fetch(url, { mode: "cors" });
}

const wrapText = (context, text, marginLeft, marginTop, maxWidth, lineHeight) => {
  var words = text.split(" ");
  var countWords = words.length;
  var line = "";
  for (var n = 0; n < countWords; n++) {
    var testLine = line + words[n] + " ";
    var testWidth = context.measureText(testLine).width;
    if (testWidth > maxWidth) {
      context.fillText(line, marginLeft, marginTop);
      line = words[n] + " ";
      marginTop += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, marginLeft, marginTop);
}

function download_img(){
  let download = document.getElementById("download");
	let image = document.getElementById("canvas").toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
}
