function c() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

$(window).on("load", function() {

  // NAVBAR PADDING
  // https://stackoverflow.com/questions/4086107/fixed-page-header-overlaps-in-page-anchors
  $("html").css("padding-top", $("#navbar").outerHeight(true) + 8)
  $("html").css("scroll-padding-top", $("#navbar").outerHeight(true) + 8)
 
  // TOP BUTTON APPEARANCE
  let topButton = $("#topButton");

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      $(topButton).addClass("active");
    } else {
      $(topButton).removeClass("active");
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    window.scroll({
      behavior: 'smooth'
    });
  }

  $(window).on({
    scroll: function() {
      scrollFunction();
    }
  })

  $(topButton).on({
    click: topFunction
  });

  // stop the call to action from doing anything for now
  $("#banner .cta-button").on({
    click: function(event) {
      event.preventDefault();
      event.stopPropagation();      
    }
  })

  // var forms = document.getElementsByClassName('needs-validation');
  // // Loop over them and prevent submission
  
  // var validation = Array.prototype.filter.call(forms, function(form) {
  //   form.addEventListener('submit', function(event) {
  //     if (form.checkValidity() === false) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //     }
  //     form.classList.add('was-validated');
  //   }, false);
  // });

  // VIDEO MODAL CONTENT
  let rectangleModal = $(".rectangle-modal");
  let modal = $("#project-modal .modal-content")
  $(".rectangle").on({
    click: function() {
      $(modal).empty();
      $(modal).prepend($(rectangleModal));
      $(rectangleModal).show();
    }
  })

  // PROJECTS MODAL
  $(".projects__link").on({
    click: function() {
      // let modal = $("#project-modal .modal-content")
      $(modal).empty();
      $(modal).prepend(`<img src="${$(this).find(".projects__image").attr("src")}" alt="project image">` );
    }
  })

  // CUSTOM SOLUTION
  let customItem = $(".custom__item");
  let customTabText = $(".custom__tab-text");
  let customWindowText = $(".custom__window-text");
  
  // ACTIVATE CUSTOM TAB
  $(customItem).on({
    click: function() {
      let active = $(".custom__item--active");
      $(active).removeClass("custom__item--active");
      // $(active).removeClass("font-weight-bold");
      $(active).find(".number").removeClass("text-success");
      $(active).find(".description").removeClass("text-dark");
      $(this).addClass("custom__item--active")
      activateCustomItem(this);
    }
  })

  // CUSTOM ACTIVATE CALLBACK FUNCTION
  function activateCustomItem(active) {
    // $(active).addClass("font-weight-bold");
    $(active).find(".number").addClass("text-success");
    let description = $(active).find(".description");
    $(description).addClass("text-dark");
    $(customTabText).html($(description).html());
    $(customWindowText).html($(active).find(".text").html());
  }

  // ACTIVATE ITEM WHEN LOADING WINDOW
  activateCustomItem($(".custom__item--active"));

  // BOOTSTRAP MESSAGE MODAL ACTIVATION
  $('#messageModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  });


  // GSAP ANIMATION
  let screenWidth = $(window).width();
  let screenHeight = $(window).height();
  let homeController = new ScrollMagic.Controller();

  let shapesTL = gsap.timeline();
  shapesTL
  .fromTo(
    "#banner",0.5,
    {
      opacity: 0
    },
    {
      opacity: 1
    }, "=0"
  )
  .fromTo(
    "#shapes .shape",0.55,
    {
      x: screenWidth
    },
    {
      x:0,
      stagger: .5
    }, "-=.5"
  )


  let platformsTL = gsap.timeline();  
  platformsTL
    .fromTo(
      "#platforms", 1,
      {
        x: -screenWidth
      },
      {
        x:0,
      }, "-=0"
    )

  let projectsTL = gsap.timeline();
  projectsTL
    .fromTo(
      "#projects .projects .projects__link", .7,
      {
        x: screenWidth
      },
      {
        x:0,
        stagger: -.4
      }, "=0"
    )
    .fromTo(
      "#projects .view-buttons", 1,
      {
        opacity: 0
      },
      {
        opacity: 1
      }, "=-0"
    );


  let teamLeftTL = gsap.timeline();
  teamLeftTL
    .fromTo(
      "#team .team.team--left", 1.5,
      {
        opacity: 0,
        x: -screenWidth
      },
      {
        opacity: 1,
        x:0,
        stagger: .5
      }, "=0"
    )

  let teamRightTL = gsap.timeline();
  teamRightTL
    .fromTo(
      "#team .team.team--right", 1.5,
      {
        opacity: 0,
        x: screenWidth
      },
      {
        opacity: 1,
        x:0,
        stagger: .5
      }, "=0"
    )
    
  let teamTopTL = gsap.timeline();
  teamTopTL
    .fromTo(
      "#team .team.team--top", 1.5,
      {
        y: -screenHeight*.5,
        opacity: 0
      },
      {
        opacity: 1,
        y:0,
        stagger: .5
      }, "=0"
    )

  let teamBottomTL = gsap.timeline();
  teamBottomTL
    .fromTo(
      "#team .team--bottom", 2,
      {
        y: screenHeight*2,
        opacity: 0
      },
      {
        y:0,
        opacity: 1,
        stagger: .5
      }, "=0"
    )

  let customTL = gsap.timeline();
  customTL
    .fromTo(
      "#custom .custom__list", 1,
      {
        opacity: 0,
        x: -screenWidth
      },
      {
        x: 0,
        opacity: 1
      }, "=0"
    )
    .fromTo(
      "#custom .custom__window", 1,
      {
        y: screenHeight*.75
        // x: screenWidth
      },
      {
        y: 0
        // x: 0
      }, "-=.75"
    )

  let footerTL = gsap.timeline();
  footerTL
    .fromTo(
      "#footer .footer__cta", 1.5,
      {
        opacity: 0,
      },
      {
        opacity: 1
      }, "=0"
    )

  new ScrollMagic.Scene({
    triggerElement: "#shapes",
    triggerHook: 1,
    reverse: false,
    offset: 100,
    duration: 0,
  })
    .setTween(shapesTL)
    // .addIndicators()
    .addTo(homeController);
  
  new ScrollMagic.Scene({
    triggerElement: "#platforms",
    triggerHook: 1,
    reverse: false,
    offset: 100,
    duration: 0,
  })
    .setTween(platformsTL)
    // .addIndicators()
    .addTo(homeController);

  new ScrollMagic.Scene({
    triggerElement: "#projects",
    triggerHook: .9,
    reverse: false,
    offset: 100,
    duration: 0,
  })
    .setTween(projectsTL)
    // .addIndicators()
    .addTo(homeController);

  new ScrollMagic.Scene({
    triggerElement: "#team",
    triggerHook: 1,
    reverse: false,
    offset: 100,
    duration: 0,
  })
  .setTween([teamLeftTL, teamRightTL, teamTopTL, teamBottomTL])
  // .addIndicators()
  .addTo(homeController);

    new ScrollMagic.Scene({
      triggerElement: "#custom",
      triggerHook: 1,
      reverse: false,
      offset: 100,
      duration: 0,
    })
      .setTween(customTL)
      // .addIndicators()
      .addTo(homeController);

  new ScrollMagic.Scene({
    triggerElement: "#footer",
    triggerHook: .9,
    reverse: false,
    offset: 100,
    duration: 0,
  })
    .setTween(footerTL)
    // .addIndicators()
    .addTo(homeController);

});