const ground = "#382d1e";
const walnut = "#2b2216";
const tan = "#bda38b";
const tanDeep = "#9c8066";
const bone = "#e4e2da";
const ink = "#1c150d";

type DrawingProps = { title?: string };

function Frame({ title, viewBox, children }: { title?: string; viewBox: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {children}
    </svg>
  );
}

export function WardrobeDrawing({ title }: DrawingProps) {
  return (
    <Frame title={title} viewBox="0 0 420 480">
      <rect x="30" y="20" width="360" height="420" fill={tan} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={36 + i * 118} y="26" width="112" height="384" fill={bone} />
          <rect x={i === 0 ? 128 : 52 + i * 118} y="190" width="6" height="64" fill={tanDeep} />
          {[60, 120, 200, 260, 330].map((y) => (
            <path key={y} d={`M${46 + i * 118} ${y} q 46 ${i % 2 ? 10 : -8} 92 0`} stroke={tan} strokeWidth="2" fill="none" opacity="0.5" />
          ))}
        </g>
      ))}
      <rect x="36" y="414" width="348" height="20" fill={walnut} />
      <rect x="0" y="440" width="420" height="6" fill={tanDeep} />
    </Frame>
  );
}

export function ChatDrawing({ title }: DrawingProps) {
  return (
    <Frame title={title} viewBox="0 0 400 500">
      <rect width="400" height="500" fill={ground} />
      <rect x="104" y="58" width="192" height="392" rx="30" fill={tan} />
      <rect x="118" y="88" width="164" height="332" rx="12" fill={bone} />
      <rect x="132" y="108" width="104" height="40" rx="20" fill={tan} />
      <rect x="164" y="162" width="104" height="40" rx="20" fill={walnut} />
      <rect x="132" y="216" width="120" height="96" rx="12" fill={tan} />
      <rect x="146" y="230" width="92" height="68" fill={bone} />
      <rect x="152" y="240" width="24" height="52" fill={tanDeep} />
      <rect x="180" y="240" width="24" height="52" fill={tanDeep} />
      <rect x="208" y="240" width="24" height="52" fill={tanDeep} />
      <rect x="148" y="326" width="120" height="40" rx="20" fill={walnut} />
      <circle cx="176" cy="346" r="5" fill={bone} />
      <circle cx="194" cy="346" r="5" fill={bone} />
      <circle cx="212" cy="346" r="5" fill={bone} />
      <rect x="176" y="70" width="48" height="8" rx="4" fill={walnut} />
    </Frame>
  );
}

export function TapeDrawing({ title }: DrawingProps) {
  const ticks = Array.from({ length: 15 }, (_, i) => i);
  return (
    <Frame title={title} viewBox="0 0 400 500">
      <rect width="400" height="500" fill={ground} />
      <rect x="40" y="300" width="320" height="160" fill={bone} />
      <path d="M70 420 V340 H330 V420" stroke={ink} strokeWidth="4" fill="none" />
      <path d="M70 326 H330 M70 318 V334 M330 318 V334" stroke={tanDeep} strokeWidth="3" fill="none" />
      <text x="200" y="316" textAnchor="middle" fontSize="22" fill={ink} fontFamily="var(--serif)" fontStyle="italic">
        2 400
      </text>
      <rect x="168" y="214" width="196" height="40" fill="#efd27a" />
      {ticks.map((i) => (
        <rect key={i} x={180 + i * 12} y="214" width="3" height={i % 5 === 0 ? 22 : 12} fill={ink} />
      ))}
      <circle cx="150" cy="190" r="104" fill={tan} />
      <circle cx="150" cy="190" r="62" fill={walnut} />
      <circle cx="150" cy="190" r="22" fill={tanDeep} />
      <rect x="356" y="206" width="14" height="56" fill={tanDeep} />
    </Frame>
  );
}

export function ContractDrawing({ title }: DrawingProps) {
  return (
    <Frame title={title} viewBox="0 0 400 500">
      <rect width="400" height="500" fill={ground} />
      <g transform="rotate(-4 200 250)">
        <rect x="70" y="60" width="260" height="360" fill={bone} />
        <rect x="100" y="96" width="140" height="14" fill={ink} />
        {[140, 166, 192, 218, 244, 270, 296].map((y, i) => (
          <rect key={y} x="100" y={y} width={i % 3 === 2 ? 150 : 200} height="8" fill={tanDeep} />
        ))}
        <path d="M110 372 c 20 -30 30 10 46 -6 s 18 -24 30 2 s 26 8 40 -10" stroke={ink} strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="100" y="388" width="140" height="4" fill={tanDeep} />
      </g>
      <g transform="rotate(32 290 380)">
        <rect x="250" y="300" width="22" height="170" fill={tan} />
        <path d="M250 470 L261 500 L272 470 Z" fill={walnut} />
        <rect x="250" y="300" width="22" height="26" fill={tanDeep} />
      </g>
    </Frame>
  );
}

export function AssemblyDrawing({ title }: DrawingProps) {
  return (
    <Frame title={title} viewBox="0 0 400 500">
      <rect width="400" height="500" fill={ground} />
      <rect x="60" y="110" width="280" height="330" fill={tan} />
      <rect x="68" y="118" width="128" height="300" fill={bone} />
      <rect x="204" y="118" width="128" height="300" fill={bone} />
      <rect x="182" y="240" width="6" height="56" fill={tanDeep} />
      <rect x="212" y="240" width="6" height="56" fill={tanDeep} />
      <rect x="68" y="424" width="264" height="14" fill={walnut} />
      <rect x="0" y="440" width="400" height="60" fill={walnut} />
      <rect x="96" y="66" width="208" height="30" fill="#efd27a" />
      <rect x="170" y="72" width="60" height="18" rx="9" fill={bone} />
      <circle cx="200" cy="81" r="6" fill="#8fb27a" />
      <rect x="194" y="72" width="2" height="18" fill={ink} />
      <rect x="204" y="72" width="2" height="18" fill={ink} />
    </Frame>
  );
}

export function HardwareDrawing({ title }: DrawingProps) {
  return (
    <Frame title={title} viewBox="0 0 500 500">
      <rect width="500" height="500" fill={ground} />
      <rect x="40" y="70" width="190" height="300" fill={bone} />
      <circle cx="120" cy="180" r="52" fill={tan} />
      <circle cx="120" cy="180" r="36" fill={tanDeep} />
      <rect x="150" y="160" width="200" height="40" rx="8" fill={tan} />
      <rect x="290" y="144" width="140" height="72" rx="10" fill={tanDeep} />
      <circle cx="320" cy="180" r="9" fill={walnut} />
      <circle cx="400" cy="180" r="9" fill={walnut} />
      <circle cx="96" cy="230" r="8" fill={walnut} />
      <circle cx="144" cy="230" r="8" fill={walnut} />
      <rect x="40" y="410" width="420" height="26" fill={tan} />
      <rect x="40" y="420" width="420" height="6" fill={tanDeep} />
      {[70, 130, 190, 250, 310, 370, 430].map((x) => (
        <circle key={x} cx={x} cy="423" r="7" fill={bone} />
      ))}
    </Frame>
  );
}
