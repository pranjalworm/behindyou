import React from "react"
import FireFly from "./firefly"
import Header from "./header"
import InputForm from "./input-form"

export default function Home() {

  return (
    <div className="flex flex-col h-screen w-screen bg-auto bg-no-repeat">

      <FireFly />
      <Header />
      <InputForm />

    </div>
  )
}
