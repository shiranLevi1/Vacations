import axios from 'axios';
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function Chart() {
    useEffect(() => {
        modal();
    }, []);

    const [chartData, setChartData] = useState({});

    const modal = async () => {
        axios
            .get("http://localhost:3001/vacations/followedVacations")
                .then((response) => {
                    let followedVacations = response.data;

                    let vacationsLocation = [];
                    let amountOfFollowers = [];
                        
                    for(let index = 0; index < followedVacations.length; index++){
                        vacationsLocation[index] = followedVacations[index].location;
                        amountOfFollowers[index] = followedVacations[index].amountOfFollowers;
                    }

                    setChartData({
                        labels: vacationsLocation,
                        datasets: [
                            {
                                label: "Number of followers",
                                data: amountOfFollowers.map((data) => data),
                                backgroundColor: [
                                    'rgba(255, 99, 132)',
                                    'rgba(255, 159, 64)',
                                    'rgba(255, 205, 86)',
                                    'rgba(75, 192, 192)',
                                    'rgba(54, 162, 235)',
                                    'rgba(153, 102, 255)',
                                    'rgba(201, 203, 207)'
                                  ],
                                borderWith: 4,
                            },
                        ],
                    });
                })
                .catch((e) => {
                    console.error(e);
                    alert(e);
                });
    };

    return (
        <>
            <div className="chartContainer" style={{ height: "600px" }}>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        layout: {
                            padding: {
                                top: 100,
                                left: 100,
                                right: 100,
                                bottom: 0,
                            },
                        },
                    }}
                />
            </div>
        </>
    );
}