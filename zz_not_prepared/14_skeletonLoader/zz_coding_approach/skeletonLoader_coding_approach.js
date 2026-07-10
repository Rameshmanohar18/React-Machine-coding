// THIS IS 98% UI //

// Entire code is written in App.jsx

// Step 1: Inside App.jsx, I simple maintain the main div className as card

// Step 2: For showing purpose I'm using div h3 and 2 <p> tags

// Ex:

<div className='card'>
  <div className='img skeleton-loader'></div>
  <h3 className='heading skeleton-loader'></h3>
  <p className='content1 skeleton-loader'></p>
  <p className='content2 skeleton-loader'></p>
</div>;

// Step 2: Our main div className "card" must have border, padding, Using margin: 0 auto as it centers the content

// Step 3: Common class "skeleton-loader", background should be a lightGray color and margin-bottom between all these elements

// Step 4: For visual appealing, our first div height: 250px;

// Step 5: CORE Logic of the Skeleton Loader is using

// - background: linear-gradient
// - transform: translateX(-100%);
// - animation: animation-name timeDuration infinite;

// @keyframes animation-name --> At 100% transform: translateX(100%);

// i) For our constant className: skeleton-loader we are appending ::before (pseudo class)

// content is empty string, display: anything, height: 100%,
// background: linear-gradient()
// 1st property: to right
// 2nd property: transparent color
// 3rd property: white would be better color
// 4th property: transparent color

// transform: translateX(-100%) // if it is positive then it starts from right (Now it is left) ---> -100% is a good idea !!

// animation: animation-name 1s infinite

// @keyframes animation-name{

/*

100%{
transform: translateX(100%)
}

*/

// Note: PROVIDE THE animation property in pseudo class and use that animation class beside to keyframes
