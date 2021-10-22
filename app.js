
    var tween;
    const container = document.querySelector('.container');
    const arrow = document.querySelector('.arrow');
    const arrowInfo = document.querySelector('.arrow-info');
    const height = window.innerHeight;

    //Make sure to go the top  after each reload and disable scrolling until arrow animation completes
    window.onbeforeunload = function () { window.scrollTo(0, 0) };
    document.body.style.overflow = "hidden";

    //ARROW ANIMATIONS
    //Set the poisiton of the arrow in HTML
    const setPosition = (rot, posy) => {
        arrow.style.transform = `rotate(${rot}deg)`;
        arrow.style.top = `${posy}px`;
        document.body.style.overflow = "visible";
        gsap.to(arrowInfo, {
            x: 175,
            duration: 1.5,
            onComplete: () => setTimeout(function () { arrowInfo.style.visibility = 'hidden' }, 3000)
        });
    }


    //Make arrow repeatedly scale
    let tweenArrow = gsap.to(arrow, {
        scaleX: 1.2,
        duration: 2,
        repeat: -1,
        delay: 3,
        ease: "elastic",
        paused: true
    });

    //Arrow animation when page loads
    gsap.to(arrow, {
        scrollTrigger: {
            trigger: '#main',
            onEnterBack: () => {
                tweenArrow.pause();
                arrow.classList.remove("down");
                gsap.to(arrow, {
                    duration: 2,
                    rotation: 270,
                    y: 0
                });
                gsap.to(window, {
                    duration: 2,
                    scrollTo: 0
                });
            }
        },
        duration: 2,
        rotation: 270,
        y: 650,
        ease: 'bounce',
        onComplete: setPosition,
        onCompleteParams: [270, 650]
    })


    //Arrow animation when scrolled down
    gsap.to(arrow, {
        scrollTrigger: {
            trigger: '#projects',
            toggleActions: 'restart none reverse none',
        },
        y: 750,
        rotation: 90,
        duration: 2,
        ease: 'bounce',
        onComplete: () => tweenArrow.play()
    });

    //SCROLL ANIMATIONS
    //Scroll to the projects
    gsap.to(window, {
        scrollTrigger: {
            trigger: '#projects',
            toggleActions: "restart none none none"
        },
        duration: 2,
        onComplete: () => arrow.classList.toggle("down"),
        scrollTo: height
    });


    //Scroll between projects and first page
    const scrollBetween = () => {
        if (!arrow.classList.contains('down')) {
            gsap.to(window, {
                duration: 2,
                scrollTo: height
            });
        } else {
            gsap.to(window, {
                duration: 2,
                scrollTo: 0
            });
            arrow.classList.toggle("down");
        }
    }

    //MAIN PAGE ANIMATIONS
    //Toggle between plus and minus icons
    const toggleIcon = (e) => {
        document.querySelectorAll('.skills').forEach(el => el !== e ? el.lastChild.className = 'fas fa-plus mt-2' : null);
        e.lastChild.classList.contains('fa-plus') ? e.lastChild.className = 'fas fa-minus mt-2' : e.lastChild.className = 'fas fa-plus mt-2'
    }


    //Floating words
    const randomX = random(1, 10);
    const randomY = random(1, 10);
    const randomTime = random(3, 5);
    const randomTime2 = random(5, 10);
    const randomAngle = random(-10, 10);

    const words = gsap.utils.toArray('.word');
    words.forEach(word => {
        gsap.set(word, {
            x: randomX(-1),
            y: randomX(1),
            rotation: randomAngle(-1)
        });

        moveX(word, 1);
        moveY(word, -1);
        rotate(word, 1);
    });

    function rotate(target, direction) {
  
        gsap.to(target, randomTime2(), {
            rotation: randomAngle(direction),
            ease: Sine.easeInOut,
            onComplete: rotate,
            onCompleteParams: [target, direction * -1]
        });
    }

    function moveX(target, direction) {
  
        gsap.to(target, randomTime(), {
            x: randomX(direction),
            ease: Sine.easeInOut,
            onComplete: moveX,
            onCompleteParams: [target, direction * -1]
        });
    }

    function moveY(target, direction) {
  
        gsap.to(target, randomTime(), {
            y: randomY(direction),
            ease: Sine.easeInOut,
            onComplete: moveY,
            onCompleteParams: [target, direction * -1]
        });
    }

    function random(min, max) {
        const delta = max - min;
        return (direction = 1) => (min + delta * Math.random()) * direction;
    }



    //PROJECTS PAGE ANIMATIONS
    // Projects slides
    gsap.set('#projects', { perspective: 700 });
    var slides = document.querySelectorAll('.slide');
    tl = gsap.timeline({
        paused: true
    });

    for (var i = 0; i < slides.length; i++) {
        //Create the dots
        var dots = document.createElement('div');
        dots.className = 'dot';
        dots.id = 'dot' + i;
        dots.addEventListener('click', function () { tl.seek(this.id).pause() });
        document.getElementById('dots').appendChild(dots);
        tl.addPause('dot' + i)
  
        if (i != slides.length - 1) {
            tl.to(slides[i], 0.5, { scale: .8, ease: Back.easeOut })
                .to(slides[i], 0.7, { xPercent: -100, rotationY: 80 }, 'L' + i)
                .from(slides[i + 1], 0.7, { xPercent: 100, rotationY: -80 }, 'L' + i)
                .from(slides[i + 1], 0.5, { scale: .8, ease: Back.easeIn })
        }
    };


    //Dot colors and animations 
    document.getElementById('dot0').style.backgroundColor = 'rgba(255,255,255,1)';
    for (var i = 0; i < slides.length - 1; i++) {
        tl.to('#dot' + (i + 1), 0.7, { backgroundColor: 'rgba(255,255,255,1)' }, 'L' + i)
        tl.to('#dot' + (i), 0.7, { backgroundColor: 'rgba(255,255,255,0.2)' }, 'L' + i)
    }

    //Navigate between the slides
    function GO(e) {
        console.log(tl.totalProgress())
        if (tl.totalProgress() == 1 && e != -1)
            tl.progress(0).pause();
        else if (tl.totalProgress() == 0) {
            if (e > 0)
                tl.play()
        } else {
            if (e > 0)
                tl.play()
            else
                tl.reverse()
        }
    };

    //Show  and hide info when mouse hovers or outs on a project
    const showInfo = (e) => {
        let info = e.parentElement.lastElementChild
        info.style.visibility = 'visible'
        if (e.classList.contains('left'))
            gsap.set(info, { x: '-100%' });
        else
            gsap.set(info, { x: '100%' });
           
    
    }

    const hideInfo = (e) => {
        let info = e.parentElement.lastElementChild
        info.style.visibility = 'hidden'
        gsap.set(info, {
            x: '0%',
        })
    }

    document.getElementById('nextBtn').addEventListener("click", function () { GO(1) });
    document.getElementById('prevtBtn').addEventListener("click", function () { GO(-1) });
    

















