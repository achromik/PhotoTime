$(document).on('click','.navbar-collapse.in',function(event) {
    if( $(event.target).is('a') ) {
        $(this).collapse('hide');
    }
});

$(function () {
    
    var CONST = Object.freeze({
        CAROUSEL_INTERVAL: 0,
        CAROUSEL_MOVE_TIME: 700,
        CAROUSEL_IMAGE_WIDTH: 261,
        CAROUSEL_FORWARD : 1, 
    });
  
    //initialize carousel 
    var sliderInterval,
        $carouselList = $('#js-carousel ul'),
        //default rotation forward
        carouselDirection = CONST.CAROUSEL_FORWARD,
        //get first and last image 
        $firstItem = $carouselList.find('li:first'),
        $lastItem = $carouselList.find('li:last');
    

    //add to each list item attrbute 'item' whit index of position in list (first is 0)
    $carouselList.children('li').each(function(index,elements) {
        $(this).attr('item', index);
    });

    //set last image before first and set left margin to value of image width
    $firstItem.before($lastItem);
    $carouselList.css({marginLeft: -CONST.CAROUSEL_IMAGE_WIDTH});


    //previous slide 
    $('#js-left').on('click', function() {  
        rotateCarousel(!CONST.CAROUSEL_FORWARD);
    });

    //next slide
    $('#js-right').on('click', function() {  
        rotateCarousel(CONST.CAROUSEL_FORWARD);
    });


    function rotateCarousel(dir, time) { 
        var direction,
            moveTime;
        if (dir !== undefined ) {
            direction = dir;
        } else {
            direction = carouselDirection;
        }
        /*jshint -W030 */
        time !== undefined  ? moveTime = time : moveTime = CONST.CAROUSEL_MOVE_TIME;

        if (direction ) { 
            $carouselList.animate({'marginLeft': -2*CONST.CAROUSEL_IMAGE_WIDTH}, moveTime, moveForwardSlide);
        } else {
            $carouselList.animate({'marginLeft': 0 }, moveTime, moveBackwardSlide);
        }

    }


    function moveForwardSlide() {
        var $firstItem = $carouselList.find('li:first'),
            $lastItem = $carouselList.find('li:last'),

            //get current image index wich is second in table of list item (because last id is before first - it's prepare to backward rotation )
            $currentItem = $carouselList.find('li:nth-child(2)').attr('item'); 
    
        //set first item after last    
        $lastItem.after($firstItem);

        //get id of current displayed item
        $currentItem = $carouselList.find('li:nth-child(2)').attr('item');

        //update Counter of items
        updateCounter($currentItem);

        $carouselList.css({marginLeft:-CONST.CAROUSEL_IMAGE_WIDTH});
    }


    function moveBackwardSlide() {
        var $firstItem = $carouselList.find('li:first'),
            $lastItem = $carouselList.find('li:last'),
            $currentItem = $carouselList.find('li:nth-child(2)').attr('item');
        
        $firstItem.before($lastItem);
        
        $currentItem = $carouselList.find('li:nth-child(2)').attr('item');
        
        updateCounter($currentItem);
    
        $carouselList.css({marginLeft:-CONST.CAROUSEL_IMAGE_WIDTH});
    }

    function updateCounter(item) {
    var $counter = $('#js-counter');
        $carouselListItems = $('#js-carousel > ul > li');
        
    item++;
    $counter.text('0' + item + '/0' + $carouselListItems.length ); 

    }
  
}); 