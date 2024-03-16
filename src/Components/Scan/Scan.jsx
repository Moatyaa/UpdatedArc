import React, { useEffect, useState } from 'react';

const ScanComponent = () => {
    // Dependency array includes ws to ensure this effect runs when ws changes

    return (
        <div>
            <button >Scan</button>
            <div className="modal fade dalert" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            فشل gfالاتصال
                        </div>
                        <div className="modal-body">
                            لم يتم العثور على تطبيق Scan app في جهازك ، يرجى تنزيله وتثبيته وفتحه أولاً ثم اعاده تحميل المتصفح.
                            <a href="/Scan_App_SetUp.msi" download>تحميل Scan app</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScanComponent;
