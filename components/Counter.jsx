
import { useCounter } from "@chakra-ui/counter"
import { db } from "@/lib/firebase";
import updateCount from "@/api/updateCount";
import useAuth from "@/hooks/useAuth";


export default function Counter() {
    const counter = useCounter({
        max: 1000,
        min: 0,
        step: 1,
    });
    let currentCount = counter.value;
    console.log(currentCount);
    updateCount(currentCount);
    return (
       <div className="d-flex flex-column align-items-center mt-2">
           <div className="h2">A Pointless Counter</div>
           <div className="w-25 d-flex justify-content-around align-content-center display-4">
            <button onClick={() => counter.increment()}>+</button>
            <p>{counter.value}</p>
            <button onClick={() => counter.decrement()}>-</button>
           </div>
       </div>
    )

}