const wrapper = document.querySelector(".wrapper"),
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll("img"),
  buttons = document.querySelectorAll(".button");

let imageIndex = 0,
  intervalId;


const autoSlide = () => {

  intervalId = setInterval(() => slideImage(++imageIndex), 2000);
};

autoSlide();


const slideImage = () => {
  if(imageIndex===images.length){
    imageIndex=0;
  }
  if(imageIndex<0)
    {
      imageIndex-1
    }
    else
    {
      imageIndex;
    }

  // imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;

  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};


const updateClick = (e) => {

  clearInterval(intervalId);
 if(e.target.id==="next"){
 imageIndex+=1;
 }
 else{
  imageIndex+=-1;
 }
  // imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
 
  autoSlide();
};

// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));

wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
wrapper.addEventListener("mouseleave", autoSlide);