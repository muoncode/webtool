import { useState } from "react";

import "./UsdToVND.css"

export default function UsdToVND() {

    const [usdTOvnd, setUsdTOvnd] = useState('25240');
    const [usd, setUSD] = useState('');
    const [transferMoney, setTransferMoney] = useState('');

    return (
        <div className="container_transfer_money_menu">
            <div className="container_transfer_money">
                <div class="form-group">
                    <label >Transfer Money   = </label>
                    <input type="text" value={transferMoney}  onChange={(e) => setTransferMoney(e.target.value)} />
                    <label>VNĐ</label>
                </div>

                <div class="form-group">
                    <label >USD  </label>
                    <input type="text" value={usd} placeholder="Enter your USD" onChange={(e) => setUSD(e.target.value)} />
                </div>

                <div class="form-group">
                    <label >1 USD   = </label>
                    <input type="text" value={usdTOvnd} placeholder="Enter your current USD" onChange={(e) => setUsdTOvnd(e.target.value)} />
                </div>

            </div>
        </div>
    );
};

