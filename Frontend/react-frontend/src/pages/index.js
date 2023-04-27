import background from "../img/bg2.jpg";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
    >
      <h1>
        <center>Welcome to the NEO DAPP playground</center>
      </h1>
    </div>
  );
};

export default Home;
