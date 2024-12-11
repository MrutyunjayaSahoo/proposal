const getGrid = (selector) => {
    let elements = gsap.utils.toArray(selector),
        bounds,
        getSubset = (axis, dimension, alternating, merge) => {
            let a = [],
                subsets = {},
                onlyEven = alternating === "even",
                p;
            bounds.forEach((b, i) => {
                let position = Math.round(b[axis] + b[dimension] / 2),
                    subset = subsets[position];
                subset || (subsets[position] = subset = []);
                subset.push(elements[i]);
            });
            for (p in subsets) {
                a.push(subsets[p]);
            }
            if (onlyEven || alternating === "odd") {
                a = a.filter((el, i) => !(i % 2) === onlyEven);
            }
            if (merge) {
                let a2 = [];
                a.forEach((subset) => a2.push(...subset));
                return a2;
            }
            return a;
        };
    elements.refresh = () =>
        (bounds = elements.map((el) => el.getBoundingClientRect()));
    elements.columns = (alternating, merge) =>
        getSubset("left", "width", alternating, merge);
    elements.rows = (alternating, merge) =>
        getSubset("top", "height", alternating, merge);
    elements.refresh();

    return elements;
};

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
    // Instantiate the Lenis object with specified properties
    lenis = new Lenis({
        lerp: 0.1, // Lower values create a smoother scroll effect
        smoothWheel: true // Enables smooth scrolling for mouse wheel events
    });

    // Update ScrollTrigger each time the user scrolls
    lenis.on("scroll", () => ScrollTrigger.update());

    // Define a function to run at each animation frame
    const scrollFn = (time) => {
        lenis.raf(time); // Run Lenis' requestAnimationFrame method
        requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
    };
    // Start the animation frame loop
    requestAnimationFrame(scrollFn);
};

// Get the element with the class 'uzih3'
const element = document.querySelector(".uzih3");

// Check if the element is found ..
if (element) {
    // Remove existing innerHTML
    element.innerHTML = "";

    // Add new innerHTML using the class 'uzi3'
    element.classList.add("uzi3");
    element.innerHTML = "In Your Delulu World";
}

// All elements with class .grid
const grids = document.querySelectorAll(".grid");

// Function to apply scroll-triggered animations to a given gallery
const applyAnimation = (grid, animationType) => {
    // Child elements of grid
    const gridWrap = grid.querySelector(".grid-wrap");
    const gridItems = grid.querySelectorAll(".grid__item");
    const gridItemsInner = [...gridItems].map((item) =>
        item.querySelector(".grid__item-inner")
    );

    // Define GSAP timeline with ScrollTrigger
    const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: gridWrap,
            start: "top bottom+=5%",
            end: "bottom top-=5%",
            scrub: true
        }
    });

    // Apply different animations based on type
    switch (animationType) {
        case "type1":
            // Set some CSS related style values
            grid.style.setProperty("--perspective", "1000px");
            grid.style.setProperty("--grid-inner-scale", "0.5");

            timeline
                .set(gridWrap, {
                    rotationY: 25
                })
                .set(gridItems, {
                    z: () => gsap.utils.random(-1600, 200)
                })
                .fromTo(
                    gridItems,
                    {
                        xPercent: () => gsap.utils.random(-1000, -500)
                    },
                    {
                        xPercent: () => gsap.utils.random(500, 1000)
                    },
                    0
                )
                .fromTo(
                    gridItemsInner,
                    {
                        scale: 2
                    },
                    {
                        scale: 0.5
                    },
                    0
                );

            break;

        case "type2":
            // Set some CSS related style values
            grid.style.setProperty("--grid-width", "160%");
            grid.style.setProperty("--perspective", "2000px");
            grid.style.setProperty("--grid-inner-scale", "0.5");
            grid.style.setProperty("--grid-item-ratio", "0.8");
            grid.style.setProperty("--grid-columns", "6");
            grid.style.setProperty("--grid-gap", "14vw");

            timeline
                .set(gridWrap, {
                    rotationX: 20
                })
                .set(gridItems, {
                    z: () => gsap.utils.random(-3000, -1000)
                })
                .fromTo(
                    gridItems,
                    {
                        yPercent: () => gsap.utils.random(100, 1000),
                        rotationY: -45,
                        filter: "brightness(200%)"
                    },
                    {
                        ease: "power2",
                        yPercent: () => gsap.utils.random(-1000, -100),
                        rotationY: 45,
                        filter: "brightness(0%)"
                    },
                    0
                )
                .fromTo(
                    gridWrap,
                    {
                        rotationZ: -5
                    },
                    {
                        rotationX: -20,
                        rotationZ: 10,
                        scale: 1.2
                    },
                    0
                )
                .fromTo(
                    gridItemsInner,
                    {
                        scale: 2
                    },
                    {
                        scale: 0.5
                    },
                    0
                );

            break;

        case "type3":
            // Set some CSS related style values
            grid.style.setProperty("--grid-width", "105%");
            grid.style.setProperty("--grid-columns", "8");
            grid.style.setProperty("--perspective", "1500px");
            grid.style.setProperty("--grid-inner-scale", "0.5");

            timeline
                .set(gridItems, {
                    transformOrigin: "50% 0%",
                    z: () => gsap.utils.random(-5000, -2000),
                    rotationX: () => gsap.utils.random(-65, -25),
                    filter: "brightness(0%)"
                })
                .to(
                    gridItems,
                    {
                        xPercent: () => gsap.utils.random(-150, 150),
                        yPercent: () => gsap.utils.random(-300, 300),
                        rotationX: 0,
                        filter: "brightness(200%)"
                    },
                    0
                )
                .to(
                    gridWrap,
                    {
                        z: 6500
                    },
                    0
                )
                .fromTo(
                    gridItemsInner,
                    {
                        scale: 2
                    },
                    {
                        scale: 0.5
                    },
                    0
                );

            break;

        case "type4":
            // Set some CSS related style values
            grid.style.setProperty("--grid-width", "50%");
            grid.style.setProperty("--perspective", "3000px");
            grid.style.setProperty("--grid-item-ratio", "0.8");
            grid.style.setProperty("--grid-columns", "3");
            grid.style.setProperty("--grid-gap", "1vw");

            timeline
                .set(gridWrap, {
                    transformOrigin: "0% 50%",
                    rotationY: 30,
                    xPercent: -75
                })
                .set(gridItems, {
                    transformOrigin: "50% 0%"
                })
                .to(
                    gridItems,
                    {
                        duration: 0.5,
                        ease: "power2",
                        z: 500,
                        stagger: 0.04
                    },
                    0
                )
                .to(
                    gridItems,
                    {
                        duration: 0.5,
                        ease: "power2.in",
                        z: 0,
                        stagger: 0.04
                    },
                    0.5
                )
                .fromTo(
                    gridItems,
                    {
                        rotationX: -70,
                        filter: "brightness(120%)"
                    },
                    {
                        duration: 1,
                        rotationX: 70,
                        filter: "brightness(0%)",
                        stagger: 0.04
                    },
                    0
                );

            break;

        case "type5":
            // Set some CSS related style values
            grid.style.setProperty("--grid-width", "120%");
            grid.style.setProperty("--grid-columns", "8");
            grid.style.setProperty("--grid-gap", "0");

            const gridObj = getGrid(gridItems);

            timeline
                .set(gridWrap, {
                    rotationX: 50
                })
                .to(gridWrap, {
                    rotationX: 30
                })
                .fromTo(
                    gridItems,
                    {
                        filter: "brightness(0%)"
                    },
                    {
                        filter: "brightness(100%)"
                    },
                    0
                )
                .to(
                    gridObj.rows("even"),
                    {
                        xPercent: -100,
                        ease: "power1"
                    },
                    0
                )
                .to(
                    gridObj.rows("odd"),
                    {
                        xPercent: 100,
                        ease: "power1"
                    },
                    0
                )
                .addLabel("rowsEnd", ">-=0.15")
                .to(
                    gridItems,
                    {
                        ease: "power1",
                        yPercent: () => gsap.utils.random(-100, 200)
                    },
                    "rowsEnd"
                );
            break;

        case "type6":
            // Set some CSS related style values
            grid.style.setProperty("--perspective", "2500px");
            grid.style.setProperty("--grid-width", "100%");
            grid.style.setProperty("--grid-gap", "6");
            grid.style.setProperty("--grid-columns", "3");
            grid.style.setProperty("--grid-item-ratio", "1");

            timeline.fromTo(
                gridItems,
                {
                    transformOrigin: "50% 200%",
                    rotationX: 0,
                    yPercent: 400
                },
                {
                    yPercent: 0,
                    rotationY: 360,
                    opacity: 0.2,
                    scale: 0.8,
                    stagger: 0.03
                }
            );

            break;

        default:
            console.error("Unknown animation type.");
            break;
    }
};

// Apply animations to each grid---

// you can tweek to use the switch case you want😂😂

const scroll = () => {
    grids.forEach((grid, i) => {
        // Determine animation type
        let animationType;
        switch (i % 2) {
            case 0:
                animationType = "type3";
                break;
            case 1:
                animationType = "type5";
                break;

        }
        applyAnimation(grid, animationType);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    scroll();
    document.body.classList.remove("loading");
});


//Tanya

document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.text');
    const ripples = document.querySelector('.ripples');
    const chars = text.textContent.split('');

    text.innerHTML = chars.map(char =>
        `<span class="char">${char}</span>`
    ).join('');

    const spans = document.querySelectorAll('.char');
    let isAnimating = false;

    gsap.to(spans, {
        y: -20,
        stagger: {
            each: 0.1,
            repeat: -1,
            yoyo: true
        },
        ease: "sine.inOut",
        duration: 1.5
    });

    gsap.to(['.text::before', '.text::after'], {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        duration: 2.5,
        ease: "expo.out",
        stagger: 0.1
    });

    gsap.to('.text::after', {
        filter: 'blur(20px) brightness(1.5)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) * 0.1;
        const moveY = (clientY - window.innerHeight / 2) * 0.05;

        gsap.to(text, {
            rotateY: moveX * 0.1,
            rotateX: -moveY * 0.1,
            duration: 1,
            ease: "power2.out"
        });

        spans.forEach((span, i) => {
            const rect = span.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const maxDistance = 200;

            if (distance < maxDistance) {
                const effect = (maxDistance - distance) / maxDistance;
                const moveX = (distanceX / distance) * effect * 30;
                const moveY = (distanceY / distance) * effect * 30;

                gsap.to(span, {
                    x: -moveX,
                    y: -moveY,
                    scale: 1 + effect * 0.3,
                    duration: 0.6,
                    ease: "power2.out"
                });

                span.classList.add('active');
            } else {
                gsap.to(span, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });

                span.classList.remove('active');
            }
        });
    });

    text.addEventListener('click', (e) => {
        if (isAnimating) return;
        isAnimating = true;

        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripples.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);

        gsap.timeline({
            onComplete: () => isAnimating = false
        })
            .to(spans, {
                scale: 0.8,
                duration: 0.15,
                ease: "power2.in",
                stagger: {
                    amount: 0.2,
                    from: "center"
                }
            })
            .to(spans, {
                scale: 1,
                duration: 0.4,
                ease: "elastic.out(1, 0.3)",
                stagger: {
                    amount: 0.2,
                    from: "center"
                }
            })
            .to('.text::before', {
                filter: 'blur(10px) brightness(2)',
                duration: 0.2,
                yoyo: true,
                repeat: 1
            }, 0)
            .to('.text::after', {
                filter: 'blur(25px) brightness(2)',
                duration: 0.2,
                yoyo: true,
                repeat: 1
            }, 0);
    });

    document.addEventListener('mouseleave', () => {
        gsap.to(text, {
            rotateY: 0,
            rotateX: 0,
            duration: 1,
            ease: "power2.out"
        });

        gsap.to(spans, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });
});


//

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');

    // Retrieve playback time from localStorage
    const savedTime = localStorage.getItem('musicPlaybackTime');
    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    // Check if the user has already interacted with the page
    let userInteracted = false;

    const startMusic = () => {
        if (!userInteracted) {
            userInteracted = true;
            music.play()
                .then(() => {
                    console.log("Music started playing!");
                })
                .catch((error) => {
                    console.warn("Autoplay was prevented:", error);
                });
        }
    };

    // Listen for any user interaction
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('keydown', startMusic, { once: true });

    // Save playback time before the page unloads
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicPlaybackTime', music.currentTime);
    });
});



