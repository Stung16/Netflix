export default function IcNextSlide({ className = '' }: { className?: string }) {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='1em'
      width='1em'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <polyline fill='none' strokeWidth='2' points='9 6 15 12 9 18'></polyline>
    </svg>
  )
}
