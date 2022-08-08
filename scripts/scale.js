// Scale design according to screen size
function scalar() {
    const designWidth = 550;
    const designHeight = 779;
    const ratio = designWidth / designHeight;

    const container = document.querySelector(".container");
    const input = document.querySelector("input");

    // Make the height equal to the screen height or the width
    // equal to the width. Whatever can be done without changing
    // the ratio of the original design.
    // console.log(window.innerHeight, window.innerWidth * ratio);
    if (window.innerWidth / window.innerHeight < ratio) {
        const scalar = window.innerWidth / designWidth;
        container.style.transform = `scale(${scalar})`;

        // Fix zoom behavior in iOS Safari
        // input.style.fontSize = "16px";
    } else {
        // For bigger screens it's best to leave some room on the sides
        // const ratioHeight =
        //     (window.innerHeight / designHeight) * bufferConstant;
        // const ratioWidth = (window.innerWidth / designWidth) * bufferConstant;
        // const ratio = Math.min(ratioHeight, ratioWidth);
        // container.style.transform = `scale(${ratio})`;
        // body.style.height = `${ratio * designHeight}px`;
        const scalar = window.innerHeight / designHeight;
        container.style.transform = `scale(${scalar})`;
    }
}

window.addEventListener("resize", scalar);
scalar();

// Fix zoom behavior in Safari
// const input = document.querySelector("input");
// input.addEventListener("focus", () => {
//     document
//         .querySelector("meta[name=viewport]")
//         .setAttribute(
//             "content",
//             "width=device-width, initial-scale=1.0, maximum-scale=10.0"
//         );
// });

// input.addEventListener("blur", () => {
//     document
//         .querySelector("meta[name=viewport]")
//         .setAttribute(
//             "content",
//             "width=device-width, initial-scale=1.0, maximum-scale=1.0"
//         );
// });
