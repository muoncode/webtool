import { useState } from "react";

import "./UsdToVND.css"

export default function UsdToVND() {

    const [usdTOvnd, setUsdTOvnd] = useState('');

    return (
        <div className="container_transfer_money">
            <div class="form-group">
                <label >1 USD = </label>
                <input type="text" value={usdTOvnd} placeholder="Enter your current USD" onChange={(e) => setUsdTOvnd(e.target.value)} />
            </div>

        </div>
    );
};

