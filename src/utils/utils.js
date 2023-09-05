

export default function utils() {


  const config = "http://image.tmdb.org/t/p/";

  function Badge({ children }) {
    return (
      <span id="cbadge-container">
        <span className="cbadge">{children}</span>
      </span>
    );
  }


  return { config, Badge };
}
