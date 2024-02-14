"use strict";
/////////////////////////////////////////////////////
// DOM
const lazyImages = document.querySelectorAll('img[data-lazy="true"]');

/////////////////////////////////////////////////////
// Setup
const slowInternetSeconds = 0.3;

/////////////////////////////////////////////////////
// Functionality

const loadLazyImage = function (entries, observer) {
  // 1) Get entry from position 0, entries[0] = entry we are looking for
  const [entry] = entries;

  // 2) If entry is not in viewport (!isIntersecting) stop function.
  if (!entry?.isIntersecting) return;

  // It is...

  // 3) Get target (img)
  const img = entry.target;

  // 4) Get dataset from img
  const { dataset } = img;

  // 5) Check if the image has its original src
  if (!dataset.originalSrc) {
    // Unobserve this image and stop function.
    observer.unobserve(img);
    return;
  }

  // Has original src...

  // 6) Replace compressed image with original image
  img.src = dataset.originalSrc;

  let slowInternetTimeout = setTimeout(() => {
    // If more than "slowInternetSeconds" have passed and img.onload hasn't been triggered, it means the user has a very slow internet connection and a loader should be displayed to them.
    manageImgLoader(img, "add");
  }, slowInternetSeconds * 1000);

  // 7) After image is loaded, remove filter blur and unobserve this image
  img.onload = () => {
    img.style.filter = "none";
    observer.unobserve(img);

    // Clear timeout (loader)
    clearTimeout(slowInternetTimeout);
    manageImgLoader(img, "remove");
  };
};

const lazyImagesObserverOpt = {
  root: null,
  threshold: 0,
  rootMargin: "-100px",
};

const lazyImagesObserver = new IntersectionObserver(
  loadLazyImage,
  lazyImagesObserverOpt
);

// Loop over the images and set observer to each one.
lazyImages.forEach((lazyImg) => lazyImagesObserver.observe(lazyImg));

function manageImgLoader(img, type) {
  if (!img) return;

  const imgContainer = img.parentElement;

  const imgContainerChildren = Array.from(imgContainer.children);

  const loaderDiv = imgContainerChildren[1] || createLoader();

  if (type === "add") {
    imgContainer.append(loaderDiv); // add loader after img, this div will be at position imgContainerChildren[1] at the moment it gets removed (type="remove").
  } else {
    // Loader div already exists from imgContainer.children, so it can be removed.
    loaderDiv.remove();
  }
}

function createLoader() {
  const loaderDiv = document.createElement("div");
  loaderDiv.classList.add("loader");
  loaderDiv.textContent = "Loading image...";

  return loaderDiv;
}
