// const elem = document.getElementbyId('hero')
// elem.innerHTML = `<img src="img/213-deadpool.jpg" alt="deadpool">`

const myImage = document.getElementbyId('hero');

fetch('img/213-deadpool.jpg')
.then(function(response) {
  return response.blob();
})
.then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});