"use strict";
(function () {
  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    if (document.getElementsByClassName('main-content')[0]) {
      var mainpanel = document.querySelector('.main-content');
      var ps = new PerfectScrollbar(mainpanel);
    };

    if (document.getElementsByClassName('sidenav')[0]) {
      var sidebar = document.querySelector('.sidenav');
      var ps1 = new PerfectScrollbar(sidebar);
    };

    if (document.getElementsByClassName('navbar-collapse')[0]) {
      var fixedplugin = document.querySelector('.navbar:not(.navbar-expand-lg) .navbar-collapse');
      var ps2 = new PerfectScrollbar(fixedplugin);
    };

    if (document.getElementsByClassName('fixed-plugin')[0]) {
      var fixedplugin = document.querySelector('.fixed-plugin');
      var ps3 = new PerfectScrollbar(fixedplugin);
    };
  };
})();

// Verify navbar blur on scroll
navbarBlurOnScroll('navbarBlur');


// initialization of Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Fixed Plugin

if (document.querySelector('.fixed-plugin')) {
  var fixedPlugin = document.querySelector('.fixed-plugin');
  var fixedPluginButton = document.querySelector('.fixed-plugin-button');
  var fixedPluginButtonNav = document.querySelector('.fixed-plugin-button-nav');
  var fixedPluginCard = document.querySelector('.fixed-plugin .card');
  var fixedPluginCloseButton = document.querySelectorAll('.fixed-plugin-close-button');
  var navbar = document.getElementById('navbarBlur');
  var buttonNavbarFixed = document.getElementById('navbarFixed');

  if (fixedPluginButton) {
    fixedPluginButton.onclick = function () {
      if (!fixedPlugin.classList.contains('show')) {
        fixedPlugin.classList.add('show');
      } else {
        fixedPlugin.classList.remove('show');
      }
    }
  }

  if (fixedPluginButtonNav) {
    fixedPluginButtonNav.onclick = function () {
      if (!fixedPlugin.classList.contains('show')) {
        fixedPlugin.classList.add('show');
      } else {
        fixedPlugin.classList.remove('show');
      }
    }
  }

  fixedPluginCloseButton.forEach(function (el) {
    el.onclick = function () {
      fixedPlugin.classList.remove('show');
    }
  })

  document.querySelector('body').onclick = function (e) {
    if (e.target != fixedPluginButton && e.target != fixedPluginButtonNav && e.target.closest('.fixed-plugin .card') != fixedPluginCard) {
      fixedPlugin.classList.remove('show');
    }
  }

  if (navbar) {
    if (navbar.getAttribute('navbar-scroll') == 'true') {
      buttonNavbarFixed.setAttribute("checked", "true");
    }
  }

}

// Tabs navigation

var total = document.querySelectorAll('.nav-pills');

total.forEach(function (item, i) {
  var moving_div = document.createElement('div');
  var first_li = item.querySelector('li:first-child .nav-link');
  var tab = first_li.cloneNode();
  tab.innerHTML = "-";

  moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
  moving_div.appendChild(tab);
  item.appendChild(moving_div);

  var list_length = item.getElementsByTagName("li").length;

  moving_div.style.padding = '0px';
  moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
  moving_div.style.transform = 'translate3d(0px, 0px, 0px)';
  moving_div.style.transition = '.5s ease';

  item.onmouseover = function (event) {
    let target = getEventTarget(event);
    let li = target.closest('li'); // get reference
    if (li) {
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li) + 1;
      item.querySelector('li:nth-child(' + index + ') .nav-link').onclick = function () {
        moving_div = item.querySelector('.moving-tab');
        let sum = 0;
        if (item.classList.contains('flex-column')) {
          for (var j = 1; j <= nodes.indexOf(li); j++) {
            sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
          }
          moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
          moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        } else {
          for (var j = 1; j <= nodes.indexOf(li); j++) {
            sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
          }
          moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
          moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
        }
      }
    }
  }
});


// Tabs navigation resize

window.addEventListener('resize', function (event) {
  total.forEach(function (item, i) {
    item.querySelector('.moving-tab').remove();
    var moving_div = document.createElement('div');
    var tab = item.querySelector(".nav-link.active").cloneNode();
    tab.innerHTML = "-";

    moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
    moving_div.appendChild(tab);

    item.appendChild(moving_div);

    moving_div.style.padding = '0px';
    moving_div.style.transition = '.5s ease';

    let li = item.querySelector(".nav-link.active").parentElement;

    if (li) {
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li) + 1;

      let sum = 0;
      if (item.classList.contains('flex-column')) {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        }
        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
        moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
      } else {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
        }
        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';

      }
    }
  });

  if (window.innerWidth < 991) {
    total.forEach(function (item, i) {
      if (!item.classList.contains('flex-column')) {
        item.classList.add('flex-column', 'on-resize');
      }
    });
  } else {
    total.forEach(function (item, i) {
      if (item.classList.contains('on-resize')) {
        item.classList.remove('flex-column', 'on-resize');
      }
    })
  }
});


function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

// End tabs navigation


//Set Sidebar Color
function sidebarColor(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-color");

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');
  sidebar.setAttribute("data-color", color);

  if (document.querySelector('#sidenavCard')) {
    var sidenavCard = document.querySelector('#sidenavCard');
    let sidenavCardClasses = ['card', 'card-background', 'shadow-none', 'card-background-mask-' + color];
    sidenavCard.className = '';
    sidenavCard.classList.add(...sidenavCardClasses);

    var sidenavCardIcon = document.querySelector('#sidenavCardIcon');
    let sidenavCardIconClasses = ['ni', 'ni-diamond', 'text-gradient', 'text-lg', 'top-0', 'text-' + color];
    sidenavCardIcon.className = '';
    sidenavCardIcon.classList.add(...sidenavCardIconClasses);
  }

}

// Set Navbar Fixed
function navbarFixed(el) {
  let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
  const navbar = document.getElementById('navbarBlur');

  if (!el.getAttribute("checked")) {
    navbar.classList.add(...classes);
    navbar.setAttribute('navbar-scroll', 'true');
    navbarBlurOnScroll('navbarBlur');
    el.setAttribute("checked", "true");
  } else {
    navbar.classList.remove(...classes);
    navbar.setAttribute('navbar-scroll', 'false');
    navbarBlurOnScroll('navbarBlur');
    el.removeAttribute("checked");
  }
};

// Navbar blur on scroll

function navbarBlurOnScroll(id) {
  const navbar = document.getElementById(id);
  let navbarScrollActive = navbar ? navbar.getAttribute("navbar-scroll") : false;
  let scrollDistance = 5;
  let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
  let toggleClasses = ['shadow-none'];

  if (navbarScrollActive == 'true') {
    window.onscroll = debounce(function () {
      if (window.scrollY > scrollDistance) {
        blurNavbar();
      } else {
        transparentNavbar();
      }
    }, 10);
  } else {
    window.onscroll = debounce(function () {
      transparentNavbar();
    }, 10);
  }

  function blurNavbar() {
    navbar.classList.add(...classes)
    navbar.classList.remove(...toggleClasses)

    toggleNavLinksColor('blur');
  }

  function transparentNavbar() {
    if (navbar) {
      navbar.classList.remove(...classes)
      navbar.classList.add(...toggleClasses)

      toggleNavLinksColor('transparent');
    }
  }

  function toggleNavLinksColor(type) {
    let navLinks = document.querySelectorAll('.navbar-main .nav-link')
    let navLinksToggler = document.querySelectorAll('.navbar-main .sidenav-toggler-line')

    if (type === "blur") {
      navLinks.forEach(element => {
        element.classList.remove('text-body')
      });

      navLinksToggler.forEach(element => {
        element.classList.add('bg-dark')
      });
    } else if (type === "transparent") {
      navLinks.forEach(element => {
        element.classList.add('text-body')
      });

      navLinksToggler.forEach(element => {
        element.classList.remove('bg-dark')
      });
    }
  }
}


// Debounce Function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

//Set Sidebar Type
function sidebarType(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-class");

  var colors = [];

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
    colors.push(parent[i].getAttribute('data-class'));
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');

  for (var i = 0; i < colors.length; i++) {
    sidebar.classList.remove(colors[i]);
  }

  sidebar.classList.add(color);
}


// Toggle Sidenav
const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
const iconSidenav = document.getElementById('iconSidenav');
const sidenav = document.getElementById('sidenav-main');
let body = document.getElementsByTagName('body')[0];
let className = 'g-sidenav-pinned';

if (iconNavbarSidenav) {
  iconNavbarSidenav.addEventListener("click", toggleSidenav);
}

if (iconSidenav) {
  iconSidenav.addEventListener("click", toggleSidenav);
}

function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
    setTimeout(function () {
      sidenav.classList.remove('bg-white');
    }, 100);
    sidenav.classList.remove('bg-transparent');

  } else {
    body.classList.add(className);
    sidenav.classList.add('bg-white');
    sidenav.classList.remove('bg-transparent');
    iconSidenav.classList.remove('d-none');
  }
}

function darkMode(e) {
  const darkLighToggleDriv = document.getElementById("dark-light-toggle");
  const t = document.getElementsByTagName("body")[0],
    a = document.querySelectorAll("div:not(.sidenav) > hr"),
    n = document.querySelector(".sidenav"),
    i = document.querySelectorAll(".sidenav.bg-white"),
    l = document.querySelectorAll("div:not(.bg-gradient-dark) hr"),
    s = document.querySelectorAll("button:not(.btn) > .text-dark"),
    r = document.querySelectorAll("span.text-dark, .breadcrumb .text-dark"),
    o = document.querySelectorAll("span.text-white, .breadcrumb .text-white"),
    c = document.querySelectorAll("strong.text-dark"),
    d = document.querySelectorAll("strong.text-white"),
    u = document.querySelectorAll("a.nav-link.text-dark"),
    g = document.querySelectorAll(".text-secondary"),
    m = document.querySelectorAll(".text-white"),
    v = document.querySelectorAll(".bg-gray-100"),
    f = document.querySelectorAll(".bg-gray-600"),
    h = document.querySelectorAll(".btn.btn-link.text-dark, .btn .ni.text-dark"),
    b = document.querySelectorAll(".btn.btn-link.text-white, .btn .ni.text-white"),
    y = document.querySelectorAll(".card.border"),
    p = document.querySelectorAll(".card.border.border-dark"),
    x = document.querySelectorAll(".navbar g"),
    w = document.querySelector(".navbar-brand-img"),
    L = w.src,
    S = document.querySelectorAll(".navbar-main .nav-link, .navbar-main .breadcrumb-item, .navbar-main .breadcrumb-item a"),
    k = document.querySelectorAll(".card .nav .nav-link i"),
    q = document.querySelectorAll(".card .nav .nav-link span"),
    A = document.querySelectorAll(".fixed-plugin > .card"),
    C = document.querySelectorAll(".main-content .container-fluid .card");
  // if (e.getAttribute("checked")) {
  if (darkLighToggleDriv.classList.contains("light-mode")) {
    // t.classList.remove("dark-version"), n.classList.add("bg-white"), L.includes("logo-ct.png") && ((B = L.replace("logo-ct", "logo-ct-dark")), (w.src = B));
    t.classList.remove("dark-version"), n.classList.add("bg-white");
    for (E = 0; E < S.length; E++) S[E].classList.contains("text-dark") && (S[E].classList.add("text-white"), S[E].classList.remove("text-dark"));
    for (E = 0; E < k.length; E++) k[E].classList.contains("text-white") && (k[E].classList.remove("text-white"), k[E].classList.add("text-dark"));
    for (E = 0; E < q.length; E++) q[E].classList.contains("text-white") && q[E].classList.remove("text-white");
    for (E = 0; E < C.length; E++) C[E].classList.add("blur", "shadow-blur");
    for (E = 0; E < A.length; E++) A[E].classList.add("blur");
    for (E = 0; E < a.length; E++) a[E].classList.contains("light") && (a[E].classList.add("dark"), a[E].classList.remove("light"));
    for (E = 0; E < l.length; E++) l[E].classList.contains("light") && (l[E].classList.add("dark"), l[E].classList.remove("light"));
    for (E = 0; E < s.length; E++) s[E].classList.contains("text-white") && (s[E].classList.remove("text-white"), s[E].classList.add("text-dark"));
    for (E = 0; E < o.length; E++) !o[E].classList.contains("text-white") || o[E].closest(".sidenav") || o[E].closest(".card.bg-gradient-dark") || (o[E].classList.remove("text-white"), o[E].classList.add("text-dark"));
    for (E = 0; E < d.length; E++) d[E].classList.contains("text-white") && (d[E].classList.remove("text-white"), d[E].classList.add("text-dark"));
    for (E = 0; E < m.length; E++) m[E].classList.contains("text-white") && (m[E].classList.remove("text-white"), m[E].classList.remove("opacity-8"), m[E].classList.add("text-secondary"));
    for (E = 0; E < f.length; E++) f[E].classList.contains("bg-gray-600") && (f[E].classList.remove("bg-gray-600"), f[E].classList.add("bg-gray-100"));
    for (E = 0; E < x.length; E++) x[E].hasAttribute("fill") && x[E].setAttribute("fill", "#6c757d");
    for (E = 0; E < b.length; E++) b[E].closest(".card.bg-gradient-dark") || (b[E].classList.remove("text-white"), b[E].classList.add("text-dark"));
    for (E = 0; E < p.length; E++) p[E].classList.remove("border-dark");
    //e.removeAttribute("checked");
    // e.target.removeAttribute("checked");
    darkLighToggleDriv.classList.remove("light-mode");
    darkLighToggleDriv.classList.add("dark-mode");
  } else {
    var B;
    t.classList.add("dark-version");
    for (var E = 0; E < C.length; E++) C[E].classList.contains("blur") && C[E].classList.remove("blur", "shadow-blur");
    for (var E = 0; E < S.length; E++) S[E].classList.contains("text-white") && S[E].classList.remove("text-white");
    for (var E = 0; E < A.length; E++) A[E].classList.contains("blur") && A[E].classList.remove("blur");
    for (var E = 0; E < k.length; E++) k[E].classList.contains("text-dark") && (k[E].classList.remove("text-dark"), k[E].classList.add("text-white"));
    for (var E = 0; E < q.length; E++) q[E].classList.contains("text-sm") && q[E].classList.add("text-white");
    for (var E = 0; E < a.length; E++) a[E].classList.contains("dark") && (a[E].classList.remove("dark"), a[E].classList.add("light"));
    for (var E = 0; E < l.length; E++) l[E].classList.contains("dark") && (l[E].classList.remove("dark"), l[E].classList.add("light"));
    for (var E = 0; E < s.length; E++) s[E].classList.contains("text-dark") && (s[E].classList.remove("text-dark"), s[E].classList.add("text-white"));
    for (var E = 0; E < r.length; E++) r[E].classList.contains("text-dark") && (r[E].classList.remove("text-dark"), r[E].classList.add("text-white"));
    for (var E = 0; E < c.length; E++) c[E].classList.contains("text-dark") && (c[E].classList.remove("text-dark"), c[E].classList.add("text-white"));
    for (var E = 0; E < u.length; E++) u[E].classList.contains("text-dark") && (u[E].classList.remove("text-dark"), u[E].classList.add("text-white"));
    for (var E = 0; E < g.length; E++) g[E].classList.contains("text-secondary") && (g[E].classList.remove("text-secondary"), g[E].classList.add("text-white"), g[E].classList.add("opacity-8"));
    for (var E = 0; E < v.length; E++) v[E].classList.contains("bg-gray-100") && (v[E].classList.remove("bg-gray-100"), v[E].classList.add("bg-gray-600"));
    for (var E = 0; E < h.length; E++) h[E].classList.remove("text-dark"), h[E].classList.add("text-white");
    for (var E = 0; E < i.length; E++) i[E].classList.remove("bg-white");
    for (var E = 0; E < x.length; E++) x[E].hasAttribute("fill") && x[E].setAttribute("fill", "#fff");
    for (E = 0; E < y.length; E++) y[E].classList.add("border-dark");
    // e.target.setAttribute("checked", "true");
    darkLighToggleDriv.classList.remove("dark-mode");
    darkLighToggleDriv.classList.add("light-mode");
  }
}





// Resize navbar color depends on configurator active type of sidenav

// let referenceButtons = document.querySelector('[data-class]');
// console.log("referenceButtons",referenceButtons)

// window.addEventListener("resize", navbarColorOnResize);

// function navbarColorOnResize() {
//   if (window.innerWidth > 1200) {
//     if (referenceButtons.classList.contains('active') && referenceButtons.getAttribute('data-class') === 'bg-transparent') {
//       sidenav.classList.remove('bg-white');
//     } else {
//       sidenav.classList.add('bg-white');
//     }
//   } else {
//     sidenav.classList.add('bg-white');
//     sidenav.classList.remove('bg-transparent');
//   }
// }

// Deactivate sidenav type buttons on resize and small screens
// window.addEventListener("resize", sidenavTypeOnResize);
// window.addEventListener("load", sidenavTypeOnResize);

// function sidenavTypeOnResize() {
//   let elements = document.querySelectorAll('[onclick="sidebarType(this)"]');
//   if (window.innerWidth < 1200) {
//     elements.forEach(function(el) {
//       el.classList.add('disabled');
//     });
//   } else {
//     elements.forEach(function(el) {
//       el.classList.remove('disabled');
//     });
//   }
// }