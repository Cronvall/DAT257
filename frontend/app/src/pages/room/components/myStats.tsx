import { getCurrentUser } from "@/services/auth.service";
import React, { useState } from "react";


const MyStats = () => {

    const [currentUser, setCurrentUser] = useState<any>(getCurrentUser());

    return (
        <>
            <div>
                <h3>net returns %</h3>
                <p>5.23%</p>
                <h3>Favorite stock</h3>
                <p>AMZN</p>
                <h3>Best performing stock</h3>
                <p>META</p>
                <h3>Worst performing stock</h3>
                <p>APPL</p>
            </div>
        </>
    );
        
}


export default MyStats;