// React import removed - not needed with new JSX transform
import { useSelector, useDispatch } from "react-redux";
import { buyCake } from "../redux/actions";
import { useNavigate } from "react-router-dom";


export function Cake() {
    const numOfCakes = useSelector(state => state.cake.numOfCakes)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    return (
        <div>
            <h2>Num of cakes - {numOfCakes}</h2>
            <button onClick={() => dispatch(buyCake())}>Buy cake</button>
            <button onClick={() => navigate("/signup")}>Link to signup</button>
        </div>
    )
}
