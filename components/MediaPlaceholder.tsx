interface MediaPlaceholderProps {
  type: 'image' | 'video'
  width: number
  height: number
  className?: string
}

const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({ type, width, height, className }) => {
  return (
    <div 
      className={`bg-blue-100 flex items-center justify-center rounded-lg shadow-md ${className || ''}`}
      style={{ width, height }}
    >
      <span className="text-blue-600">{type === 'image' ? 'صورة' : 'فيديو'} {width}x{height}</span>
    </div>
  )
}

export default MediaPlaceholder
