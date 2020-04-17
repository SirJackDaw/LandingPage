let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
let img = new Image();
img.setAttribute('crossorigin', 'anonymous')
img.src = "https://source.unsplash.com/random";
img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  let url =
    "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  sendRequest(url)
    .then((response) => response.json())
    .then((data) => {
	console.log(data.quoteText);
    let text = data.quoteText;
    let fontSize = 30;
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
  let words = text.split(" ");
  let countWords = words.length;
  let line = "";
  for (let n = 0; n < countWords; n++) {
    let testLine = line + words[n] + " ";
    let testWidth = context.measureText(testLine).width;
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
