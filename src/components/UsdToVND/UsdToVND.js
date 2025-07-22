import { useState } from "react";

import "./UsdToVND.css"

export default function UsdToVND() {

    const [usdTOvnd, setUsdTOvnd] = useState('27100');
    
    const [transferMoney, setTransferMoney] = useState('');

    return (
        <div className="container_transfer_money_menu">
            <div className="container_transfer_money">

                <div class="form-group">
                    <label >Transfer Money   =  </label>
                    <input type="text" value={transferMoney}  disabled />
                </div>

                <div class="form-group">
                    <label >USD  </label>
                    <input type="text" value={usd} placeholder="Enter your USD" onChange={(e) => {

                        const result = Number(usdTOvnd) * Number(e.target.value);
                        setTransferMoney(`${result} VNĐ`);
                    }} />
                </div>

                <div class="form-group">
                    <label >1 USD   = VNĐ  </label>
                    <input type="text" value={usdTOvnd} placeholder="Enter your current" onChange={(e) => setUsdTOvnd(e.target.value)} />
                </div>

            </div>
        </div>
    );
};

