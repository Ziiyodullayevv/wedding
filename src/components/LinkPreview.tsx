interface LinkPreviewProps {
  url: string;
  title: string;
  description: string;
  image: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({
  url,
  title,
  description,
  image,
}) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '300px',
      }}
    >
      <img src={image} alt={title} style={{ width: '100%' }} />
      <div style={{ padding: '10px' }}>
        <a
          href={url}
          style={{ textDecoration: 'none', color: '#007bff' }}
          target='_blank'
          rel='noopener noreferrer'
        >
          <h3>{title}</h3>
        </a>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default LinkPreview;
