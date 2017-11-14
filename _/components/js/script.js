var pixGrid = function(){
    
    // Selecting our node
    var myNode = document.querySelector('.pixgrid');
    myNode.addEventListener("click", function(e){
        
        if(e.target.tagName == 'IMG'){
            var myOverlay = document.createElement('div');
            myOverlay.id = 'overlay';
            document.body.appendChild(myOverlay);
            
            // Setup overlay styles
            myOverlay.style.position = 'absolute';
            myOverlay.style.top = 0;
            myOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
            myOverlay.style.cursor = 'pointer';
            
            // Resize and reposition overlay
            myOverlay.style.width = window.innerWidth+ 'px';
            myOverlay.style.height = window.innerHeight+ 'px';
            myOverlay.style.top = window.pageYOffset+ 'px';
            myOverlay.style.left = window.pageXOffset+ 'px';
            
            // Add the image inside the overlay
            var imageSrc = e.target.src;
            var largeImage = document.createElement('img');
            largeImage.id = 'largeImage';
            largeImage.src = imageSrc.substr(0, imageSrc.length-7)+ 'png';
            largeImage.style.display = 'block';
            largeImage.style.position = 'absolute';
            
            // Wait until image has loaded
            largeImage.addEventListener("load", function(){
                
                // Resize if taller
                if (this.height > window.innerHeight){
                    this.ratio = window.innerHeight / this.height;
                    this.height = this.height * this.ratio;
                    this.width = this.width * this.ratio;
                } // if taller
                
                // Resize if wider
                if (this.width > window.innerWidth){
                    this.ratio = window.innerWidth / this.width;
                    this.height = this.height * this.ratio;
                    this.width = this.width * this.ratio;
                } // if wider
                
                centerImage(this);
                myOverlay.appendChild(largeImage);
            }); // Image has loaded
            
            // Listen for image click
            largeImage.addEventListener ("click", function(){
                if (myOverlay) {
                    myOverlay.parentNode.removeChild(myOverlay);
                    window.removeEventListener('resize', window, false);
                    window.removeEventListener('scroll', window, false);
                } // Overlay exists
            }, false); // Image clicked
            
            // Listen for window resize
            window.addEventListener("resize", function(){
                if (myOverlay) {
                    myOverlay.style.width = window.innerWidth+ 'px';
                    myOverlay.style.height = window.innerHeight+ 'px';
                    myOverlay.style.top = window.pageYOffset+ 'px';
                    myOverlay.style.left = window.pageXOffset+ 'px';
                    centerImage(largeImage);
                } // overlay exists
            }, false); // window resized
            
            // Listen for scroll
            window.addEventListener("scroll", function(){
                if (myOverlay) {
                    myOverlay.style.top = window.pageYOffset+ 'px';
                    myOverlay.style.left = window.pageXOffset+ 'px';
                } // Overlay exists
            }, false);
        } // target is an image
    }, false); // image is clicked
    
    // Center the image
    function centerImage(theImage) {
        
        // Center on the window
        var myDifX = (window.innerWidth - theImage.width) / 2;
        var myDifY = (window.innerHeight - theImage.height) / 2;
        
        theImage.style.top = myDifY + 'px';
        theImage.style.left = myDifX + 'px';
        
        return theImage;
    } // center the image
};