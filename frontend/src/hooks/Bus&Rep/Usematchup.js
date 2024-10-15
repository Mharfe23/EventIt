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