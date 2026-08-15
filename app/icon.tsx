import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'linear-gradient(135deg, #120e0b 0%, #080605 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f59e0b',
          borderRadius: '50%',
          border: '2px solid #d97706',
          boxShadow: '0 0 10px rgba(217, 119, 6, 0.5)',
          fontFamily: 'serif',
          fontWeight: 'bold',
        }}
      >
        WE
      </div>
    ),
    {
      ...size,
    }
  );
}
