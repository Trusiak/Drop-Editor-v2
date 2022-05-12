import gsap from 'gsap'

export function createListAnimation(list: any){
    const tl = gsap.timeline();
    tl.to(list, {scale: 1, duration: .25, ease: 'power4.easeIn'})
        .set(list, {zIndex: 0})
} 

export function createElementAnimation(element: any){
    const tl = gsap.timeline();
    tl.to(element, {scale: 1, y:0, autoAlpha: 1, duration: .7, ease: 'Expo.easeOut'})
        .set(element, {zIndex: 0})
} 

export function createListElementAnimation(element: any){
    let randomShowTime = Math.floor(Math.random() * (300 - 100)) + 100;
    setTimeout(()=>{
        const tl = gsap.timeline();
        tl.to(element, {autoAlpha:1, scale: 1, duration: .3, ease: 'power4.easeOut'})
    }, randomShowTime)
} 

export function showMenu(menu: any){
    const tl = gsap.timeline();
    tl.to(menu, {x:0, duration: .35, ease: 'power4.easeOut'})
}

export function hideMenu(menu: any){
    const tl = gsap.timeline();
    tl.to(menu, {x:-700, duration: .35, ease: 'power4.easeIn'})
}

export function moveListAnimation(list: any){
    const listHeight = parseInt(window.getComputedStyle(list).getPropertyValue('height'));
    const tl = gsap.timeline();
    tl.set(list, {y:listHeight})
        .to(list, {y:0, duration: .55, ease: 'power1.easeOut'})
} 

export function removeListAnimation(list: any, handleDelete?: any){
    const tl = gsap.timeline();
    tl.to(list, {onComplete: handleDelete, scale: 0.5, autoAlpha:0,  duration: .25, ease: 'power4.easeIn'})
}

export function removeElementAnimation(element: any, handleDelete: any){
    const tl = gsap.timeline();
    tl.to(element, {onComplete: handleDelete, scaleY: 0, autoAlpha:0, duration: .25, ease: 'power4.easeIn'})
}

export function shakeElement(element: any){
    const tl_Shaking = gsap.timeline({repeat: 0, yoyo: true});
    tl_Shaking
            .to(element, {rotation: 2, duration: .1})
            .to(element, {rotation: -2, duration: .1})
            .to(element, {rotation: 2, duration: .1})
            .to(element, {rotation: 0, duration: .1})
} 



