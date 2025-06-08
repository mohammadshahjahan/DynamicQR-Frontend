import React from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { QR_BASE_URL } from '../constants/api';
import { toPng } from 'html-to-image'; // For SVG-to-PNG conversion

interface DownloadableQRProps {
    qrID: string | number;
}

const DownloadableQR: React.FC<DownloadableQRProps> = ({ qrID }) => {
    const qrValue = qrID.toString();
    const qrRef = React.useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!qrRef.current) return;

        try {
            // Convert the SVG to PNG
            const dataUrl = await toPng(qrRef.current);
            
            // Trigger download
            const link = document.createElement('a');
            link.download = `qr_${qrID}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error downloading QR code:', error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div ref={qrRef}>
                <QRCode
                    value={`${QR_BASE_URL}/${qrID}`}
                    size={150}
                    level="H"
                />
            </div>
            <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
            >
                Download QR
            </Button>
        </div>
    );
};

export default DownloadableQR;