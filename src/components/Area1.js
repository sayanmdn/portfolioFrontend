import React, {useState} from 'react'
import { Typewriter } from 'react-typewriting-effect'
import 'react-typewriting-effect/dist/index.css'

export function Area1(props) {
    const [isHidden, setisHidden] = useState(true);
    const onFirstlineComplete = () =>{
        setisHidden(false)
    }
    
    return (
        <div className="Area1">
            <div>
            <Typewriter
                string='Hi, I am Sayantan Mishra'
                delay={80}
                stopBlinkinOnComplete
                onComplete={onFirstlineComplete}
                className="typeWritter"
            />
            </div>
            {isHidden ?
                null :
                <Writer2 />
            }
           
            
        </div>
    )
}

export function Writer2(props) {
    

    return (
        <div>
            <Typewriter
                string='Trainee Software Developer @Mantra Labs'
                delay={30}
                stopBlinkinOnComplete
            />
        </div>
    )
}
