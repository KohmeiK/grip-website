Just call:
```jsx static
 <Tagline />
```
Although keep in mind this creates an event listener to get the correct view height (vh) on IOS devices.

``` jsx static
// We listen to the resize event for IOS Vh update //this doesnt feel correct
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
```
