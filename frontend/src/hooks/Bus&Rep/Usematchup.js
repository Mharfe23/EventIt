import { useState } from "react";
import toast from "react-hot-toast";

export const useMatchup = () => {
    const [loading, setLoading] = useState(false);

    const matchup = async ({ user_id, business_id, info }) => {
        setLoading(true);

        try {
            const res = await fetch('/api/users/matchup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "user_id":user_id, "business_id":business_id,"info":info})
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success('Matchup successful');
            return data;

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return [loading, matchup];
}

export const useMatchupAdvice = () => {
    const [loading, setLoading] = useState(false);

    const matchupAdvice = async ({ match_id, user_fullname, user_info, match_name }) => {
        setLoading(true);

        try {
            const res = await fetch('/api/users/matchupAdvice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "match_id": match_id, "user_fullname": user_fullname, "user_info": user_info, "match_name": match_name })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success('Matchup advice fetched');
            return data;

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return [loading, matchupAdvice];
}