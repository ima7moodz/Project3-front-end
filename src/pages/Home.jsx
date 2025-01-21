import React from "react"

const Home = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="display-3 text-primary mb-4">Welcome to the GYM</h1>
      <h2 className="text-secondary">We train the comprehensive Martial Art</h2>
      <h2 className="text-secondary">Your Chance to be a real Fighter</h2>
      <img
        src="https://www.shutterstock.com/image-photo/match-between-two-boxers-ring-600nw-2489186295.jpg"
        alt="Boxing Match"
        style={{
          maxWidth: "100%",
          height: "auto",
          border: "5px solid #f1f1f1",
          borderRadius: "15px",
        }}
      />
    </div>
  )
}

export default Home
