import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import GoalForm from "../components/GoalForm";
import Loader from "../components/Loader";
import GoalItem from "../components/GoalItem";
import { getGoal, reset } from "../features/goals/goalSlice";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { goal, isLoading, isError, isSuccess, message } = useSelector((state) => state.goal);

    useEffect(() => {
        if(isError){
            console.log(message);
        }
        if(!user){
            navigate("/login");
        }

        dispatch(getGoal());
        return () => {
            dispatch(reset());
        }
    }, [user, navigate, isError, message, dispatch]);

    if(isLoading){
        return <Loader />
    }
    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
                <GoalForm />
            </section>

            <section className="content">
                {goal.length > 0 ? (
                    <div className="goals">
                        {goal.map((g) => (
                            <GoalItem key={g._id} goal={g}/>
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
        </>
    )
}

export default Dashboard;