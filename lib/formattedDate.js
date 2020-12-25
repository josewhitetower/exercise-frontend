const formattedDate = (date) => {
    const pad = (n) => {
      return n < 10 ? '0' + n : n;
    };
    return (
      date.getUTCFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate())
    );
  };
  export default formattedDate