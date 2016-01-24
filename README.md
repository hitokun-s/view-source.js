# view-source.js

view-source.js can add  "view source" button automatically to your website, showing highlighted source of html,js,css  

##Installation

    bower install view-source

##Requires    
   
JQuery    
    
##Usage

**Just add one line** to head section in html,  
to load view-source.js from your bower modules, like this:  
(! You must load JQuery ahead !)

    <script type="text/javascript" src="../bower_component/sview-source/view-source.js"></script>
    
and add 'vs' class to the source code you want to show, like this:  

####html

    <div class="vs">
        <p class="target">This is html source to show.</p>
    </div>
    
####css

    <style class="vs">
        .target{
            color:red;
        }
    </style>
    
####javascript

    <script class="vs">
        console.log("This is js source to show.");
    </script>

##Example

Please git clone this repository, and open /text/index.html by browser.
    
![Capture](img/view-source.png "Capture")    

