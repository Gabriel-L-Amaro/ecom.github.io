  
  function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);

    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Prevent the magnifier glass from being positioned outside the image: */
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /* Set the position of the magnifier glass: */
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }

  const output = document.querySelector('.output');
  console.log(output);
  const url = 'inventory.json';
  let myList = [];
  let localData = localStorage.getItem('myList');
  console.log(localData);

  myList = JSON.parse(localStorage.getItem('myList'));
  console.log(myList);
  jsloader();

  function jsloader(){
      fetch(url).then(rep => rep.json())
          .then((data) => {
              myList = data;
              maker();
              savetoStorage();
              dynamic(); 
          });
  }

  function maker(){
      if(document.body.contains(output)){
          output.innerHTML = " ";
          myList.forEach((el, index) => {
              makeList(el, index);
          });
      }
      else {
          dynamic();
      }
  }

  function makeList(item, index){ 
      const box = document.createElement('div');
      box.className = "box";
      const div = document.createElement('div');
      div.className = "text";
      const img = document.createElement("img");
      img.src = `${item.image}`;
      img.style.width = "300px";
      img.className = "image";
      const h2 = document.createElement('h2');
      h2.innerHTML = item.name;
      const p = document.createElement('p');
      p.innerHTML = "Price: " + item.price;
      output.append(box);
      box.append(img);
      box.append(div);
      div.append(h2);
      div.append(p);
  }

  function savetoStorage() {
      console.log(myList);
      localStorage.setItem("myList", JSON.stringify(myList));
  }

  function dynamic() {
      var images = document.getElementsByClassName("image");
      for (let i = 0; i < images.length; i++){
          console.log(images);
          images[i].addEventListener("click", function(){
              if (images[i] === images[i]){
                  openInNewTab('product.html');
                  localStorage.setItem("Product", i);
              }
          });
          
      }
  }

  function openInNewTab(url){
      const open = window.open(url, '_blank');
      open.focus();
  }