import React from 'react'
import { useEffect, useState } from 'react'
import RepresentativesBarChart from './Barchart'
import Dailychart from './daylucharts'

const Dashbord = () => {
    const [businessNumber, setBusinessNumber] = useState(0);
    const [businessRepresentativesNumber, setBusinessRepresentativesNumber] = useState(0);
    const [representativesPerBusiness, setRepresentativesPerBusiness] = useState([]);
    const [presentativesToday, setPresentativesToday] = useState(0);
    const [businessToday, setBusinessToday] = useState(0);
    const [dailySignups, setDailySignups] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response1 = await fetch("/api/stats/BusinessNumbers");
                const response2 = await fetch("/api/stats/BusinessRepresentativesNumbers");
                const response3 = await fetch("/api/stats/RepresentativesPerBusiness");
                const response4 = await fetch("/api/stats/RepresentativesToday");
                const response5 = await fetch("/api/stats/BusinessToday");
                const response6 = await fetch("/api/stats/daily-signups");
                const data1 = await response1.json();
                const data2 = await response2.json();
                const data3 = await response3.json();
                const data4 = await response4.json();
                const data5 = await response5.json();
                const data6 = await response6.json();
                setBusinessNumber(data1);
                setBusinessRepresentativesNumber(data2);
                setRepresentativesPerBusiness(data3);
                setPresentativesToday(data4);
                setBusinessToday(data5);
                setDailySignups(data6);
            } catch (error) {
                console.log(error);
                
            }
        };
        fetchData();
    }, []);

    
    const test = [
        { business_name: 'Alpha Solutions', Représentant: 10 },
        { business_name: 'Beta Enterprises', Représentant: 15 },
        { business_name: 'Gamma Industries', Représentant: 7 },
        { business_name: 'Delta Corp', Représentant: 20 },
        { business_name: 'Epsilon LLC', Représentant: 12 },
        { business_name: 'Zeta Technologies', Représentant: 9 },
        { business_name: 'Eta Innovations', Représentant: 14 },
        { business_name: 'Theta Services', Représentant: 11 },
        { business_name: 'Iota Systems', Représentant: 8 },
        { business_name: 'Kappa Enterprises', Représentant: 25 },
        { business_name: 'Lambda Solutions', Représentant: 18 },
        { business_name: 'Mu Technologies', Représentant: 16 },
        { business_name: 'Nu Industries', Représentant: 5 },
        { business_name: 'Xi Innovations', Représentant: 22 },
        { business_name: 'Omicron LLC', Représentant: 13 },
        { business_name: 'Pi Corp', Représentant: 7 },
        { business_name: 'Rho Enterprises', Représentant: 19 },
        { business_name: 'Sigma Solutions', Représentant: 21 },
        { business_name: 'Tau Technologies', Représentant: 10 },
        { business_name: 'Upsilon Services', Représentant: 14 },
        { business_name: 'Phi Systems', Représentant: 6 },
        { business_name: 'Chi Innovations', Représentant: 17 },
        { business_name: 'Psi Industries', Représentant: 8 },
        { business_name: 'Omega Corp', Représentant: 23 },
        { business_name: 'Ares Enterprises', Représentant: 12 },
        { business_name: 'Hermes Solutions', Représentant: 15 },
        { business_name: 'Zeus Technologies', Représentant: 9 },
        { business_name: 'Apollo LLC', Représentant: 11 },
        { business_name: 'Athena Services', Représentant: 20 },
        { business_name: 'Hera Systems', Représentant: 13 },
        { business_name: 'Poseidon Industries', Représentant: 5 },
        { business_name: 'Demeter Innovations', Représentant: 18 },
        { business_name: 'Artemis Solutions', Représentant: 22 },
        { business_name: 'Hephaestus Technologies', Représentant: 14 },
        { business_name: 'Hestia Corp', Représentant: 7 },
        { business_name: 'Dionysus Enterprises', Représentant: 19 },
        { business_name: 'Persephone Innovations', Représentant: 10 },
        { business_name: 'Hades Services', Représentant: 25 },
        { business_name: 'Hera Industries', Représentant: 9 },
        { business_name: 'Hermes Corp', Représentant: 21 },
        { business_name: 'Zephyrus LLC', Représentant: 8 },
        { business_name: 'Eurus Enterprises', Représentant: 23 },
        { business_name: 'Notus Solutions', Représentant: 16 },
        { business_name: 'Boreas Technologies', Représentant: 11 },
        { business_name: 'Aeolus Services', Représentant: 6 },
        { business_name: 'Prometheus Systems', Représentant: 17 },
        { business_name: 'Atlas Innovations', Représentant: 20 },
        { business_name: 'Titan Enterprises', Représentant: 12 },
        { business_name: 'Cronus Solutions', Représentant: 15 },
        { business_name: 'Rhea Technologies', Représentant: 7 },
        { business_name: 'Hyperion LLC', Représentant: 24 },
        { business_name: 'Themis Services', Représentant: 13 },
        { business_name: 'Mnemosyne Industries', Représentant: 18 },
        { business_name: 'Oceanus Innovations', Représentant: 5 },
        { business_name: 'Tethys Corp', Représentant: 14 },
        { business_name: 'Coeus Enterprises', Représentant: 10 },
        { business_name: 'Crius Solutions', Représentant: 22 },
        { business_name: 'Iapetus Technologies', Représentant: 9 },
        { business_name: 'Theia Services', Représentant: 11 },
        { business_name: 'Phoebe Systems', Représentant: 20 },
        { business_name: 'New Business', Représentant: 30 }
      ];

      const test2 = [
        { "date": "2024-07-30T23:00:00.000Z", "count": 2 },
        { "date": "2024-07-31T23:00:00.000Z", "count": 5 },
        { "date": "2024-08-01T23:00:00.000Z", "count": 3 },
        { "date": "2024-08-02T23:00:00.000Z", "count": 7 },
        { "date": "2024-08-03T23:00:00.000Z", "count": 6 },
        { "date": "2024-08-04T23:00:00.000Z", "count": 4 },
        { "date": "2024-08-05T23:00:00.000Z", "count": 8 },
        { "date": "2024-08-06T23:00:00.000Z", "count": 10 },
        { "date": "2024-08-07T23:00:00.000Z", "count": 1 },
        { "date": "2024-08-08T23:00:00.000Z", "count": 9 }
      ];
      


  return (
    <div className='bg-[#201E43] min-w-fit w-full pl-72 p-24 flex flex-col overflow-x-hidden overflow-y-auto'>
        <div >
            <div className="stats shadow stats-horizontal mx-auto">
                <div className="stat">
                    <div className="stat-title ">Représentants Inscrit Aujourd'hui</div>
                    <div className="stat-value">{presentativesToday}</div>
                    
                </div>
                <div className="stat">
                    <div className="stat-title">Business Inscrit Aujourd'hui</div>
                    <div className="stat-value">{businessToday}</div>
                    
                </div>
            
           
                <div className="stat">
                    <div className="stat-title">Total business Inscrits</div>
                    <div className="stat-value">{businessNumber}</div>
                    
                </div>
            
            
                <div className="stat">
                    <div className="stat-title">Total des représentants inscrits</div>
                    <div className="stat-value">{businessRepresentativesNumber}</div>
                    
                </div>
            </div>
        </div>
        <div>
            <div className="text-white text-3xl font-bold py-10">Nombre de représentants par business</div>
        </div>
        <div>
            <RepresentativesBarChart data={test}/>{/*representativesPerBusiness*/}
        </div>
        <div>
            <div className="text-white text-3xl font-bold py-10">Inscriptions journalières</div>
            <Dailychart data={test2}/> {/*dailySignups*/}
        </div>
    </div>
    
  )
}

export default Dashbord