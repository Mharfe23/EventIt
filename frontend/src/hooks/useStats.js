import { useState } from "react";

export const useGetBusinesses = () => {
    const [loading, setLoading] = useState(false);

    const getBusinesses = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/users/getBusPerEvent');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getBusinesses];
}



export const useGetReperesent = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/users/getBusRepresent');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}

export const useGetReperesentByBusiness = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async (id) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/users/getBusRepresentByBusiness`);

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}

export const useGetReperesentByBusinessToday = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async (id) => {
        setLoading(true);

        try {
            const res = await fetch(`/api/users/getBusRepresentByBusinessToday`);

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}


//STATS
export const getBusinessNumber = ()=>{
    const [loading, setLoading] = useState(false);

    const getBusinessNumber = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/stats/BusinessNumbers');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getBusinessNumber];
}

export const GetReperesentNumber = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/stats/BusinessRepresentativesNumbers');

            const data = await res.json();
            if (!res.ok) {
                console.log(data.error);
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}

export const GetReperesentToday = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/stats/RepresentativesToday');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}

export const GetBusinessToday = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/stats/BusinessToday');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}

export const GetDailySignups = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/stats/daily-signups');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            const formattedData = data.map(item => {
                const dateObj = new Date(item.date);
                const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' }); // 'Mon', 'Tue', etc.
                
                return {
                    date: dayOfWeek,
                    count: item.count
                };
            });
           
            return formattedData;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}

export const GetDailyBusSignups = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/stats/daily-bus-signups');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            const formattedData = data.map(item => {
                const dateObj = new Date(item.date);
                const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' }); // 'Mon', 'Tue', etc.
                
                return {
                    date: dayOfWeek,
                    count: item.count
                };
            });
           
            return formattedData;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}

export const GetReperesentNumberPerBusiness = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/stats/RepresentativesPerBusiness');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}

export const getnotifnum = () => {
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/stats/notifnum');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}

export const getnotifnumtoday =() => {
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/stats/notifnumtoday');

            const data = await res.json();
            if (!res.ok) {
                return [];
            }
            return data;

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    return [loading, getUsers];
}



export  const UseGetCategory = () => {
        const [loading, setLoading] = useState(false);

        const getCategories = async () => {
            setLoading(true);

            try {
                const res = await fetch('/api/stats/Category');

                const data = await res.json();
                if (!res.ok) {
                    return [];
                }
                return data;

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        }
        return [loading, getCategories];
    }



