import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFileSync } from 'fs';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const alt = 'Sask Garage Glow-Up';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const logoData = readFileSync(join(process.cwd(), 'public/logo.png'), 'base64');
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#2E7D32',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <img
          src={logoSrc}
          alt="Sask Garage Glow-Up Logo"
          style={{ width: 250, height: 250, objectFit: 'contain', marginBottom: 40 }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
            textAlign: 'center',
            fontFamily: 'sans-serif'
          }}
        >
          Sask Garage Glow-Up
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.85)',
            textAlign: 'center',
            fontFamily: 'sans-serif'
          }}
        >
          Garage Cleanout & Organization in Regina
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
