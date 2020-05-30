import React, { useState, useEffect } from 'react'

const Card = ( props ) => {
    
    let classes = props.className;

    if(props.playable){
        classes += " playable"
    }
    else{
        classes += " unplayable"
    }

    const handleCardClick = (e, value, color, special, id) => {
        e.preventDefault()
        if(props.playable){
            if(!special){
                props.playCard(e, value, color, special, id)
            }
            else{
                props.playSpecialCard(e, value, color, special, id)
            }
            
        }
        else{
            console.log('card is unplayable')
        }
    }

    return(
        <div className={classes} id={props.id} style={props.style} onClick={(e) => handleCardClick(e, props.value, props.color, props.special, props.id)}>
            {props.children}
        </div>
    )
}

function useWindowSize() {
    const isClient = typeof window === 'object';
    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }
    const [windowSize, setWindowSize] = useState(getSize);
    useEffect(() => {
      if (!isClient) {
        return false;
      }
      function handleResize() {
        setWindowSize(getSize());
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
}

export default Card
//style={overlapLogic(props.passkey, true)}
/*useEffect(() => {
    if(list){
        for(let i = 0; i < list.length; i++){
            let cur = list[i]
            let prev = list[i - 1]
            let prevprev = list[i - 2]
            let wrapped = false
            cur.style.bottom = '0%'
            if(i > 1){
                if(cur.offsetTop < prev.offsetTop && cur.style.top === '0%'){
                    cur.style.top = '22.5%'
                    cur.classList += " wrap"
                }
                if(cur.offsetTop < prev.offsetTop && prev.style.top > 0 ){
                    cur.style.top = '45%'
                }
                
            }
            if(size.width > 1300){
                cur.style.top = '0%'
            }
        }
    }
    else{
        setList(document.getElementsByClassName('card'))
    }


    return () => {
        setList()
    }
}, [size.width, pOpen])
*/

// const overlapLogic = (i, isUser) => {

//     /*if(.your-cards width is #of cards * 105 or less)
//         we know the last card in list has wrapped
//         how many have wrapped
//             h = take initial width from the first line here,
//             c = current width of ele
//             h - c = say             
    
//     */        


//     // let retval
//     // if(isUser){
//     //     const num = props.user.hand.length
//     //     const isEven = num % 2 === 0
//     //     let firstHalf, secondHalf, half, px

//     //     if(isEven){
//     //         half = num / 2
//     //     }
//     //     else{
//     //         half = Math.round(num / 2)
//     //     }
//     //     if(i < half){
//     //         let diff = half - i
//     //         if(diff <= 1){
//     //             retval = {zIndex: i, left: '2.5%'}
//     //             return retval
//     //         }
//     //         let tmp = ( (diff - 1) * 3.75 ) + 2.5
//     //         retval = {zIndex: i, left: `${tmp}%`}
//     //     }
//     //     else{

//     //         let diff = i - half
//     //         if(diff < 1){
//     //             retval = {zIndex: i, right: '1.25%'}
//     //             return retval
//     //         }
//     //         let tmp = ( (diff * 3.75) + 1.25 )
//     //         retval = {zIndex: i, right: `${tmp}%`}
//     //     }
//     //     return retval
//     // }
// }