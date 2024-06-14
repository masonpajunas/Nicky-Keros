// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

$(".nav-link").each(function (index) {
  let tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0,
      ease: "power2.inOut",
    },
  });
  tl.set($(this).closest(".nav_link_wrapper").find(".project-link"), {
    opacity: 0,
  });
  tl.set($(this).closest(".nav_link_wrapper").find(".projects_list"), {
    display: "block",
  });
  tl.to($(this).closest(".nav_link_wrapper").find(".project-link"), {
    opacity: 1,
    stagger: {
      each: 0.02,
      from: "start",
    },
  }).to($(this).closest(".nav_link_wrapper").find(".view-all"), {
    display: "block",
  });
  if (window.innerWidth >= 479) {
    $(this).on("mouseenter", function () {
      tl.timeScale(1);
      tl.restart();
    });
    $(this)
      .closest(".nav_link_wrapper")
      .on("mouseleave", function () {
        tl.timeScale(2);
        tl.reverse();
      });
    $(this).on("click", function () {
      tl.timeScale(2);
      tl.reverse();
    });
    $(this)
      .closest(".nav_link_wrapper")
      .find(".project-link")
      .on("click", function () {
        tl.timeScale(2);
        tl.reverse();
      });
  } else {
    tl.pause();
  }
});

//Logo Track//
let object = {
  value: 1,
};

let tl = gsap.timeline({ repeat: -1 });
tl.fromTo(
  ".marquee_track",
  {
    xPercent: 0,
  },
  {
    xPercent: -50,
    duration: 25,
    ease: "none",
    overwrite: true,
  }
);

$(".marquee_track").on("mouseenter", function () {
  gsap.fromTo(
    object,
    {
      value: 1,
    },
    {
      value: 0,
      duration: 1.2,
      onUpdate: () => {
        tl.timeScale(object.value);
      },
    }
  );
});

$(".marquee_track").on("mouseleave", function () {
  gsap.fromTo(
    object,
    {
      value: 0,
    },
    {
      value: 1,
      duration: 1.2,
      onUpdate: () => {
        tl.timeScale(object.value);
      },
    }
  );
});

//Pause and Play Videos//
$(document).ready(function () {
  $(".project-link")
    .find("video")
    .each(function () {
      this.pause();
    });

  $(".project-link").on("mouseenter", function () {
    $(this).find("video").get(0).play();
  });

  $(".project-link").on("mouseleave", function () {
    $(this).find("video").get(0).pause();
    $(this).find("video").get(0).currentTime = 0;
  });
});

let heroPaused = false;

$(".hero_pause").on("click", function () {
  if (!heroPaused) {
    $(".hero_video").find("video").get(0).pause();
    $(".hero_pause_icon").css("display", "none");
    $(".hero_play_icon").css("display", "block");
    heroPaused = true;
  } else {
    $(".hero_video").find("video").get(0).play();
    $(".hero_play_icon").css("display", "none");
    $(".hero_pause_icon").css("display", "block");
    heroPaused = false;
  }
});

$(".hero_pause").on("keydown", function (e) {
  if (e.key === "Enter") {
    $(this).trigger("click");
  }
});
