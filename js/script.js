searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
} 

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');

    if(window.scrollY > 80){
        document.querySelector('.header .header-2').classList.add('active');
    }else{
        document.querySelector('.header .header-2').classList.remove('active'); 
    }
}
window.onload = () =>{
    if(window.scrollY > 80){
        document.querySelector('.header .header-2').classList.add('active');
    }else{
        document.querySelector('.header .header-2').classList.remove('active');
    }
}

var swiper = new Swiper(".books-slider", {
    loop:true,
    centeredSlides: true,
    autoplay:{
        delay: 9500,
        disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
});

  var swiper = new Swiper(".featured-slider", {
    spaceBetween: 10,
    loop:true,
    centeredSlides: true,
    autoplay:{
        delay: 9500,
        disableOnInteraction: false,
    },
    navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay:{
      delay: 9500,
      disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});



var query = ''
var URL = ''
document.getElementById('enter').onclick = function(){
    //get the info for the query out of the search bar and turn it
    //into the URL to feed to the AJAX call
    query = document.getElementById('searchbar').value
    document.getElementById('searchbar').value = ''
    URL = 'https://www.googleapis.com/books/v1/volumes?q='+query

    clearPrevious();
    $.ajax({
      url: URL.toString(),
      dataType: 'json',
      success: function(data){
      console.log(data);

        for(i=0; i<10; i++){

            var booki = 'book'+(i+1)

            //create rows
            //images row
            var imgRow = document.createElement('div')
            imgRow.className = "row imgRow"
            document.getElementById(booki).appendChild(imgRow)

            //title and price row
            var titlePriceRow = document.createElement('div')
            titlePriceRow.className = "row titlePriceRow"
                //title column
                var titleDiv = document.createElement('div')
                titleDiv.className = "col-md-8 title"
                titlePriceRow.appendChild(titleDiv)

                document.getElementById(booki).appendChild(titlePriceRow)

            //author row
            var authorRow = document.createElement('div')
            authorRow.className = "row authorRow"
               //author column
                var authorDiv = document.createElement('div')
                authorDiv.className = "col-md-12 author"
                authorRow.appendChild(authorDiv)

                document.getElementById(booki).appendChild(authorRow)

            //description row
            var descriptionRow = document.createElement('div')
            descriptionRow.className = "row descriptionRow"
               //description column
                var descriptionDiv = document.createElement('div')
                descriptionDiv.className = "col-md-12 description"
                descriptionRow.appendChild(descriptionDiv)

                document.getElementById(booki).appendChild(descriptionRow)

            //populate the rows with the data
            //image data
            var img = document.createElement('img')
            img.src = data.items[i].volumeInfo.imageLinks.smallThumbnail
            document.getElementsByClassName('imgRow')[i].appendChild(img)

            //title data
            var title = document.createElement('h1')
            title.innerHTML =  data.items[i].volumeInfo.title
            document.getElementsByClassName('title')[i].appendChild(title)


            //author data
            var author = document.createElement('p')
            author.innerHTML = 'By: ' +  data.items[i].volumeInfo.authors[0]
            document.getElementsByClassName('author')[i].appendChild(author)


        }//end for loop
      }//end ajax success function
    })//end ajax call
}//end click function

function clearPrevious(){
    for(i=0; i<10; i++){
        var booki = 'book'+(i+1)
        
        //delete rows
        //images row
        removeElementsByClass('imgRow')

        //title and price row
        removeElementsByClass('titlePriceRow')   

        //author row
        removeElementsByClass('authorRow')   

        //description row
        removeElementsByClass('descriptionRow')
  
    }//end for loop
}//end clearPrevious function

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    for(j=0; j<elements.length; j++){
        elements[0].parentNode.removeChild(elements[0]);
    }
}