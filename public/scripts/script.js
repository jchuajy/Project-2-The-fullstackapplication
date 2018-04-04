var tmax_optionsGlobal = {
      repeat: -1,
      repeatDelay: 5,
      yoyo: true
};

CSSPlugin.useSVGTransformAttr = true;

var tl = new TimelineMax(tmax_optionsGlobal),
      path = 'svg *',
      stagger_val = 0.0125,
      duration = 3;

$.each($(path), function (i, el) {
      tl.set($(this), {
            x: '+=' + getRandom(-500, 500),
            y: '+=' + getRandom(-500, 500),
            rotation: '+=' + getRandom(-720, 720),
            scale: 0,
            opacity: 0
      });
});

var stagger_opts_to = {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      ease: Power4.easeInOut
};

tl.staggerTo(path, duration, stagger_opts_to, stagger_val);


function getRandom(min, max) {
      return Math.random() * (max - min) + min;
};

$(".rj_animation").click(function () {
      window.location.href = "/";
})

window.onload = function () {
      //checks cookies to know if user is logged in
      if (Cookies.get("loggedIn") === "true") {
            //display logout link and change href
            $("#loginLogout").attr("href", "/users/logout");
            $("#loginLogout").text("Logout");

      };

      //make a new request
      var request = new XMLHttpRequest();
      
      //add listener to cartbutton
      $(".cartButton").click( function() {
            $.post("/orders/addToCart/" + $(this).attr("id"));
      });

};