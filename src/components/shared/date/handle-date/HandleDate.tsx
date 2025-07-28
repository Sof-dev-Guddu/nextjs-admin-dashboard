type HandleDateProps = {
  date: Date | string;
};

const HandleDate: React.FC<HandleDateProps> = ({ date }) => {
  if (!date) return <div className="text-gray-400 italic">N/A</div>;

  const parsedDate =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

  const isValid = parsedDate instanceof Date && !isNaN(parsedDate.getTime());

  if (!isValid) return <div className="text-red-500 italic">Invalid date</div>;

  const formatted = parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <span>{formatted}</span>;
};

export default HandleDate